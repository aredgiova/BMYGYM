import {
  readEnquiryMailConfig,
  sendEnquiry,
} from "../../../../services/enquiry.ts";
import {
  validateEnquiry,
  type EnquiryErrors,
} from "../../../../validations/enquiry.ts";
import { getCommonCopy } from "../../../../i18n/common.ts";
import { isLocale } from "../../../../i18n/config.ts";
import type { CommonCopy } from "../../../../i18n/types.ts";

export const runtime = "nodejs";

const MAX_BODY_BYTES = 32 * 1024;

function failure(
  status: number,
  code: string,
  message: string,
  fields?: EnquiryErrors,
): Response {
  return Response.json(
    {
      success: false,
      data: null,
      message,
      error: { code, ...(fields ? { fields } : {}) },
    },
    {
      status,
      headers: {
        "Cache-Control": "no-store",
        "X-Content-Type-Options": "nosniff",
      },
    },
  );
}

function trustedOrigins(request: Request): Set<string> {
  const origins = new Set<string>();
  const siteUrl = process.env.SITE_URL?.trim();
  try {
    if (siteUrl) {
      const site = new URL(siteUrl);
      if (
        ["https:", "http:"].includes(site.protocol) &&
        !site.username &&
        !site.password
      ) {
        origins.add(site.origin);
      }
    }
    // Local development works before .env.local exists.
    if (!siteUrl && process.env.NODE_ENV !== "production") {
      const target = new URL(request.url);
      if (["localhost", "127.0.0.1", "[::1]"].includes(target.hostname))
        origins.add(target.origin);
    }
  } catch {
    // An invalid canonical URL must never fall back to caller-controlled headers.
  }

  // Vercel supplies this exact deployment hostname on the server. Never allow
  // arbitrary *.vercel.app origins or infer a preview host from request headers.
  const previewHost = process.env.VERCEL_URL?.trim();
  if (
    process.env.VERCEL_ENV === "preview" &&
    previewHost &&
    /^[a-z0-9-]+\.vercel\.app$/i.test(previewHost)
  ) {
    origins.add(`https://${previewHost.toLowerCase()}`);
  }
  return origins;
}

async function readBoundedBody(
  request: Request,
  messages: CommonCopy["api"],
): Promise<string | Response> {
  const length = request.headers.get("content-length");
  if (
    length !== null &&
    (!/^\d+$/.test(length) || Number(length) > MAX_BODY_BYTES)
  ) {
    return failure(
      413,
      "PAYLOAD_TOO_LARGE",
      messages.tooLong,
    );
  }

  if (!request.body)
    return failure(400, "INVALID_JSON", messages.invalid);

  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let size = 0;

  try {
    while (true) {
      const chunk = await reader.read();
      if (chunk.done) break;
      size += chunk.value.byteLength;
      if (size > MAX_BODY_BYTES) {
        await reader.cancel();
        return failure(
          413,
          "PAYLOAD_TOO_LARGE",
          messages.tooLong,
        );
      }
      chunks.push(chunk.value);
    }

    const bytes = new Uint8Array(size);
    let offset = 0;
    for (const chunk of chunks) {
      bytes.set(chunk, offset);
      offset += chunk.byteLength;
    }
    return new TextDecoder("utf-8", { fatal: true }).decode(bytes);
  } catch {
    return failure(
      400,
      "INVALID_JSON",
      messages.invalid,
    );
  } finally {
    reader.releaseLock();
  }
}

export async function POST(request: Request): Promise<Response> {
  const requestedLocale = request.headers.get("x-bmygym-locale") || "en";
  let copy = getCommonCopy(isLocale(requestedLocale) ? requestedLocale : "en");
  const origins = trustedOrigins(request);
  if (!origins.size)
    return failure(503, "SERVICE_UNAVAILABLE", copy.api.unavailable);
  if (!origins.has(request.headers.get("origin") || "")) {
    return failure(
      403,
      "ORIGIN_NOT_ALLOWED",
      copy.api.origin,
    );
  }
  if (
    request.headers.get("content-type")?.split(";")[0].trim().toLowerCase() !==
    "application/json"
  ) {
    return failure(
      415,
      "UNSUPPORTED_MEDIA_TYPE",
      copy.api.origin,
    );
  }

  const body = await readBoundedBody(request, copy.api);
  if (body instanceof Response) return body;

  let input: unknown;
  try {
    input = JSON.parse(body);
  } catch {
    return failure(
      400,
      "INVALID_JSON",
      copy.api.invalid,
    );
  }

  if (
    typeof input === "object" && input !== null && !Array.isArray(input) &&
    "locale" in input && typeof input.locale === "string" && isLocale(input.locale)
  ) {
    copy = getCommonCopy(input.locale);
  }
  const validation = validateEnquiry(input, copy.validation);
  if (!validation.success) {
    return failure(
      400,
      "VALIDATION_ERROR",
      copy.api.validation,
      validation.errors,
    );
  }

  const config = readEnquiryMailConfig(process.env);
  if (!config) return failure(503, "SERVICE_UNAVAILABLE", copy.api.unavailable);

  const delivery = await sendEnquiry(validation.data, config);
  if (!delivery.success) {
    return failure(
      delivery.reason === "unavailable" ? 503 : 502,
      "DELIVERY_FAILED",
      copy.api.delivery,
    );
  }

  return Response.json(
    {
      success: true,
      data: { submitted: true },
      message: copy.api.success,
      error: null,
    },
    {
      headers: {
        "Cache-Control": "no-store",
        "X-Content-Type-Options": "nosniff",
      },
    },
  );
}
