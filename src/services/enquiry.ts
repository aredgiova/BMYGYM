import { isEmailAddress, type Enquiry } from "../validations/enquiry.ts";

type Environment = Record<string, string | undefined>;

export type EnquiryMailConfig = {
  apiKey: string;
  from: string;
  to: string;
};

export type EnquiryDelivery =
  | { success: true }
  | { success: false; reason: "unavailable" | "provider_error" };

export function readEnquiryMailConfig(
  environment: Environment,
): EnquiryMailConfig | null {
  const apiKey = environment.RESEND_API_KEY?.trim();
  const from = environment.ENQUIRY_FROM_EMAIL?.trim();
  const to = environment.ENQUIRY_TO_EMAIL?.trim() || "hello@bmygym.com";

  if (
    !apiKey ||
    /\s/.test(apiKey) ||
    !from ||
    !isEmailAddress(from) ||
    !isEmailAddress(to)
  ) {
    return null;
  }

  return { apiKey, from, to };
}

export function enquiryMailText(enquiry: Enquiry): string {
  return [
    "New BMYGYM private enquiry",
    "",
    `Name: ${enquiry.fullName}`,
    `Email: ${enquiry.email}`,
    `Project: ${enquiry.projectType}`,
    `Company: ${enquiry.company || "Not provided"}`,
    `Location: ${enquiry.location || "Not provided"}`,
    "Privacy notice accepted: Yes",
    "",
    "Project details:",
    enquiry.message,
  ].join("\n");
}

export async function sendEnquiry(
  enquiry: Enquiry,
  config: EnquiryMailConfig,
  fetcher: typeof fetch = fetch,
): Promise<EnquiryDelivery> {
  try {
    const response = await fetcher("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${config.apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: `BMYGYM <${config.from}>`,
        to: [config.to],
        reply_to: enquiry.email,
        subject: `BMYGYM private enquiry · ${enquiry.projectType}`,
        text: enquiryMailText(enquiry),
      }),
      signal: AbortSignal.timeout(8000),
      cache: "no-store",
    });

    if (!response.ok) {
      return {
        success: false,
        reason:
          response.status === 429 || response.status >= 500
            ? "unavailable"
            : "provider_error",
      };
    }

    const result: unknown = await response.json();
    if (
      typeof result !== "object" ||
      result === null ||
      !("id" in result) ||
      typeof result.id !== "string" ||
      !result.id
    ) {
      return { success: false, reason: "provider_error" };
    }

    return { success: true };
  } catch {
    // Do not log provider bodies, credentials or visitors' personal information.
    return { success: false, reason: "unavailable" };
  }
}
