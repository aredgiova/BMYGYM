import assert from "node:assert/strict";
import test from "node:test";
import { POST } from "../src/app/api/v1/contact/route.ts";
import { readEnquiryMailConfig, sendEnquiry } from "../src/services/enquiry.ts";
import { validateEnquiry } from "../src/validations/enquiry.ts";
import { getCommonCopy } from "../src/i18n/common.ts";
import { locales } from "../src/i18n/config.ts";

const validInput = {
  fullName: "Jane Smith",
  email: "jane@example.com",
  clientType: "Private Client",
  projectType: "Private Residence",
  message: "I would like to discuss a private wellness space.",
  privacy: true,
  company: "Example Studio",
  location: "London",
  website: "",
};

const mailConfig = {
  apiKey: "test_key_not_real",
  from: "website@bmygym.com",
  to: "hello@bmygym.com",
};

const environment = {
  SITE_URL: "https://bmygym.com",
  RESEND_API_KEY: "test_key_not_real",
  ENQUIRY_FROM_EMAIL: "website@bmygym.com",
  ENQUIRY_TO_EMAIL: undefined,
  VERCEL_ENV: undefined,
  VERCEL_URL: undefined,
};

async function withEnvironment(
  values: Record<string, string | undefined>,
  run: () => Promise<void>,
): Promise<void> {
  const previous = Object.fromEntries(
    Object.keys(values).map((key) => [key, process.env[key]]),
  );
  for (const [key, value] of Object.entries(values)) {
    if (value === undefined) delete process.env[key];
    else process.env[key] = value;
  }
  try {
    await run();
  } finally {
    for (const [key, value] of Object.entries(previous)) {
      if (value === undefined) delete process.env[key];
      else process.env[key] = value;
    }
  }
}

function request(
  body: unknown = validInput,
  headers: Record<string, string> = {},
): Request {
  return new Request("https://bmygym.com/api/v1/contact", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Origin: "https://bmygym.com",
      ...headers,
    },
    body: typeof body === "string" ? body : JSON.stringify(body),
  });
}

test("validates and trims a genuine enquiry while discarding unexpected fields", () => {
  const result = validateEnquiry({
    ...validInput,
    fullName: "  Jane Smith  ",
    company: "   ",
    to: "attacker@example.com",
  });
  assert.ok(result.success);
  assert.equal(result.data.fullName, "Jane Smith");
  assert.equal(result.data.company, undefined);
  assert.ok(!("to" in result.data));
  assert.ok(!("website" in result.data));
  assert.equal(result.data.locale, "en");
  assert.equal(result.data.clientType, "Private Client");
});

test("rejects primitive payloads and missing explicit consent", () => {
  for (const input of [null, [], "text", 4])
    assert.equal(validateEnquiry(input).success, false);
  for (const privacy of [undefined, false, "true", 1]) {
    const result = validateEnquiry({ ...validInput, privacy });
    assert.equal(result.success, false);
    if (!result.success) assert.ok(result.errors.privacy);
  }
});

test("rejects injected headers, invalid categories, excessive text and populated honeypots", () => {
  for (const [field, value] of [
    ["email", "person@example.com\r\nBcc: someone@example.com"],
    ["fullName", "Jane\nSmith"],
    ["projectType", "Unlisted Project"],
    ["clientType", "Unlisted Profile"],
    ["clientType", undefined],
    ["locale", "it"],
    ["locale", { language: "en" }],
    ["locale", null],
    ["message", "x".repeat(5001)],
    ["company", "x".repeat(161)],
    ["location", { city: "London" }],
    ["website", "https://spam.example"],
  ] as const) {
    const result = validateEnquiry({ ...validInput, [field]: value });
    assert.equal(result.success, false, `Expected ${field} to fail`);
  }
});

test("mail configuration is private and defaults to the business inbox", () => {
  assert.equal(readEnquiryMailConfig({}), null);
  assert.equal(
    readEnquiryMailConfig({ ...environment, ENQUIRY_FROM_EMAIL: "invalid" }),
    null,
  );
  assert.equal(
    readEnquiryMailConfig({ ...environment, RESEND_API_KEY: "key\ninjection" }),
    null,
  );
  assert.deepEqual(readEnquiryMailConfig(environment), mailConfig);
});

test("sends plain text to a fixed recipient with the visitor only in Reply-To", async () => {
  const validated = validateEnquiry({
    ...validInput,
    message: "A wellness space with <script>plain text</script>.",
  });
  assert.ok(validated.success);
  let calls = 0;
  const fetcher: typeof fetch = async (url, init) => {
    calls += 1;
    assert.equal(url, "https://api.resend.com/emails");
    assert.equal(init?.method, "POST");
    assert.ok(init?.signal instanceof AbortSignal);
    assert.equal(
      new Headers(init.headers).get("Authorization"),
      "Bearer test_key_not_real",
    );
    assert.equal(typeof init.body, "string");
    const body = JSON.parse(String(init.body)) as Record<string, unknown>;
    assert.deepEqual(body.to, ["hello@bmygym.com"]);
    assert.equal(body.from, "BMYGYM <website@bmygym.com>");
    assert.equal(body.reply_to, "jane@example.com");
    assert.ok(!("html" in body));
    assert.match(String(body.text), /<script>plain text<\/script>/);
    assert.match(String(body.text), /Client profile: Private Client/);
    assert.match(String(body.text), /Website language: en/);
    return Response.json({ id: "mock-message-id" });
  };
  assert.deepEqual(await sendEnquiry(validated.data, mailConfig, fetcher), {
    success: true,
  });
  assert.equal(calls, 1);
});

test("never claims success when the provider fails or returns an invalid confirmation", async () => {
  const validated = validateEnquiry(validInput);
  assert.ok(validated.success);
  for (const response of [
    Response.json({ message: "private provider error" }, { status: 401 }),
    Response.json({}, { status: 429 }),
    Response.json({}, { status: 500 }),
    Response.json({}),
  ]) {
    const result = await sendEnquiry(
      validated.data,
      mailConfig,
      async () => response,
    );
    assert.equal(result.success, false);
  }
  const timeout = await sendEnquiry(validated.data, mailConfig, async () => {
    throw new DOMException("Timed out", "TimeoutError");
  });
  assert.deepEqual(timeout, { success: false, reason: "unavailable" });
});

test("rejects cross-origin and missing-origin requests before reaching the provider", async () => {
  await withEnvironment(environment, async () => {
    const forged = request(validInput, {
      Origin: "https://attacker.example",
      Host: "attacker.example",
      "X-Forwarded-Host": "attacker.example",
    });
    assert.equal((await POST(forged)).status, 403);
    const noOrigin = request();
    noOrigin.headers.delete("Origin");
    assert.equal((await POST(noOrigin)).status, 403);
  });
});

test("requires a trusted configured origin in production", async () => {
  await withEnvironment(
    { ...environment, SITE_URL: undefined, NODE_ENV: "production" },
    async () => {
      assert.equal((await POST(request())).status, 503);
    },
  );
});

test("allows only the platform's exact preview origin alongside the canonical site", async (context) => {
  context.mock.method(globalThis, "fetch", async () =>
    Response.json({ id: "mock-message-id" }),
  );
  await withEnvironment(
    {
      ...environment,
      NODE_ENV: "production",
      VERCEL_ENV: "preview",
      VERCEL_URL: "bmygym-test-project.vercel.app",
    },
    async () => {
      assert.equal(
        (
          await POST(
            request(validInput, {
              Origin: "https://bmygym-test-project.vercel.app",
            }),
          )
        ).status,
        200,
      );
      assert.equal((await POST(request())).status, 200);
      assert.equal(
        (
          await POST(
            request(validInput, {
              Origin: "https://another-project.vercel.app",
            }),
          )
        ).status,
        403,
      );
    },
  );
});

test("production ignores a preview hostname and preview host configuration rejects URL tricks", async () => {
  await withEnvironment(
    {
      ...environment,
      VERCEL_ENV: "production",
      VERCEL_URL: "bmygym-test-project.vercel.app",
    },
    async () => {
      assert.equal(
        (
          await POST(
            request(validInput, {
              Origin: "https://bmygym-test-project.vercel.app",
            }),
          )
        ).status,
        403,
      );
    },
  );
  for (const host of [
    "bmygym.vercel.app.evil.example",
    "bmygym.vercel.app@evil.example",
    "https://bmygym.vercel.app",
  ]) {
    await withEnvironment(
      { ...environment, VERCEL_ENV: "preview", VERCEL_URL: host },
      async () => {
        assert.equal(
          (await POST(request(validInput, { Origin: `https://${host}` })))
            .status,
          403,
        );
      },
    );
  }
});

test("requires JSON, enforces byte limits without Content-Length, and rejects malformed JSON", async () => {
  await withEnvironment(environment, async () => {
    assert.equal(
      (await POST(request(validInput, { "Content-Type": "text/plain" })))
        .status,
      415,
    );
    assert.equal((await POST(request("{"))).status, 400);
    assert.equal(
      (await POST(request({ ...validInput, message: "é".repeat(17000) })))
        .status,
      413,
    );
    assert.equal(
      (await POST(request(validInput, { "Content-Length": "33000" }))).status,
      413,
    );
  });
});

test("returns field validation errors without sending mail", async () => {
  await withEnvironment(environment, async () => {
    const response = await POST(request({ ...validInput, privacy: false }));
    assert.equal(response.status, 400);
    const body = await response.json();
    assert.equal(body.success, false);
    assert.equal(body.error.code, "VALIDATION_ERROR");
    assert.ok(body.error.fields.privacy);
  });
});

test("missing credentials return an honest 503 with the contact fallback", async () => {
  await withEnvironment(
    { ...environment, RESEND_API_KEY: undefined },
    async () => {
      const response = await POST(request());
      assert.equal(response.status, 503);
      const body = await response.json();
      assert.equal(body.success, false);
      assert.equal(body.data, null);
      assert.match(body.message, /hello@bmygym.com/);
      assert.equal(response.headers.get("Cache-Control"), "no-store");
    },
  );
});

test("the route confirms only an accepted provider submission", async (context) => {
  let calls = 0;
  context.mock.method(globalThis, "fetch", async () => {
    calls += 1;
    return Response.json({ id: "mock-message-id" });
  });
  await withEnvironment(environment, async () => {
    const response = await POST(request());
    assert.equal(response.status, 200);
    const body = await response.json();
    assert.deepEqual(body.data, { submitted: true });
    assert.equal(body.success, true);
    assert.equal(body.error, null);
    assert.equal(calls, 1);
  });
});

test("the route hides provider errors and secrets", async (context) => {
  context.mock.method(globalThis, "fetch", async () =>
    Response.json(
      { message: "private provider detail test_key_not_real" },
      { status: 403 },
    ),
  );
  await withEnvironment(environment, async () => {
    const response = await POST(request());
    assert.equal(response.status, 502);
    const body = await response.text();
    assert.ok(!body.includes("private provider detail"));
    assert.ok(!body.includes("test_key_not_real"));
    assert.match(body, /DELIVERY_FAILED/);
  });
});

test("validates both client profiles and all five languages with localized field errors", () => {
  for (const locale of locales) {
    const copy = getCommonCopy(locale);
    for (const clientType of ["Private Client", "Professional Partner"]) {
      const result = validateEnquiry({ ...validInput, locale, clientType }, copy.validation);
      assert.ok(result.success);
      assert.equal(result.data.locale, locale);
      assert.equal(result.data.clientType, clientType);
    }
    const invalid = validateEnquiry({ ...validInput, fullName: "", email: "", clientType: "", projectType: "", message: "", privacy: false }, copy.validation);
    assert.equal(invalid.success, false);
    if (!invalid.success) {
      for (const field of ["fullName", "email", "clientType", "projectType", "message", "privacy"] as const) {
        assert.equal(invalid.errors[field], copy.validation[field]);
      }
    }
  }
});

test("API uses the selected language for validation, early failures, success and delivery errors", async (context) => {
  let providerFails = false;
  let calls = 0;
  context.mock.method(globalThis, "fetch", async (_url: unknown, init?: RequestInit) => {
    calls += 1;
    const mail = JSON.parse(String(init?.body));
    assert.match(mail.text, /Client profile: Professional Partner/);
    return providerFails
      ? Response.json({ message: "private provider error" }, { status: 403 })
      : Response.json({ id: "mock-localized-message" });
  });

  await withEnvironment(environment, async () => {
    for (const locale of locales) {
      const copy = getCommonCopy(locale);
      const headers = { "X-BMYGYM-Locale": locale };
      const localizedInput = { ...validInput, locale, clientType: "Professional Partner" };
      const callsBeforeValidation = calls;
      const invalid = await POST(request({ ...localizedInput, email: "invalid" }, headers));
      assert.equal(invalid.status, 400);
      const invalidBody = await invalid.json();
      assert.equal(invalidBody.message, copy.api.validation);
      assert.equal(invalidBody.error.fields.email, copy.validation.email);

      for (const [payload, extraHeaders, status, message] of [
        ["{", {}, 400, copy.api.invalid],
        [localizedInput, { Origin: "https://untrusted.example" }, 403, copy.api.origin],
        [localizedInput, { "Content-Type": "text/plain" }, 415, copy.api.origin],
        [localizedInput, { "Content-Length": "33000" }, 413, copy.api.tooLong],
      ] as const) {
        const result = await POST(request(payload, { ...headers, ...extraHeaders }));
        assert.equal(result.status, status);
        assert.equal((await result.json()).message, message);
      }
      assert.equal(calls, callsBeforeValidation);

      providerFails = false;
      const success = await POST(request(localizedInput, headers));
      assert.equal(success.status, 200);
      assert.equal((await success.json()).message, copy.api.success);

      providerFails = true;
      const deliveryError = await POST(request(localizedInput, headers));
      assert.equal(deliveryError.status, 502);
      assert.equal((await deliveryError.json()).message, copy.api.delivery);
    }
  });
  assert.equal(calls, locales.length * 2);
});

test("API rejects unsupported locale and client profile without accepting caller-supplied messages", async (context) => {
  context.mock.method(globalThis, "fetch", async () => {
    assert.fail("Invalid enquiries must not contact the mail provider");
  });
  await withEnvironment(environment, async () => {
    const response = await POST(request({
      ...validInput,
      clientType: "Administrator",
      locale: "../en",
      messages: { locale: "caller-controlled message" },
    }, { "X-BMYGYM-Locale": "es" }));
    assert.equal(response.status, 400);
    const result = await response.json();
    assert.equal(result.error.fields.locale, getCommonCopy("es").validation.locale);
    assert.equal(result.error.fields.clientType, getCommonCopy("es").validation.clientType);
    assert.ok(!JSON.stringify(result).includes("caller-controlled"));
  });
});

test("accepts a full-length Cyrillic message even when JSON encodes each character as a Unicode escape", async (context) => {
  context.mock.method(globalThis, "fetch", async (_url: unknown, init?: RequestInit) => {
    const mail = JSON.parse(String(init?.body));
    assert.match(mail.text, /Website language: ru/);
    assert.ok(mail.text.endsWith("Ж".repeat(5000)));
    return Response.json({ id: "mock-cyrillic-message" });
  });
  await withEnvironment(environment, async () => {
    const payload = JSON.stringify({ ...validInput, locale: "ru", message: "Ж".repeat(5000) })
      .replaceAll("Ж", "\\u0416");
    const response = await POST(request(payload, { "X-BMYGYM-Locale": "ru" }));
    assert.equal(response.status, 200);
    assert.equal((await response.json()).message, getCommonCopy("ru").api.success);
  });
});
