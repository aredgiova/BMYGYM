import assert from "node:assert/strict";
import test from "node:test";
import { POST } from "../src/app/api/v1/contact/route.ts";
import { readEnquiryMailConfig, sendEnquiry } from "../src/services/enquiry.ts";
import { validateEnquiry } from "../src/validations/enquiry.ts";

const validInput = {
  fullName: "Jane Smith",
  email: "jane@example.com",
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
      (await POST(request({ ...validInput, message: "é".repeat(9000) })))
        .status,
      413,
    );
    assert.equal(
      (await POST(request(validInput, { "Content-Length": "17000" }))).status,
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
