import assert from "node:assert/strict";
import test from "node:test";
import { readFileSync } from "node:fs";
import { homeStructuredData, serializeStructuredData } from "../src/config/structured-data.ts";
import { locales, localePath } from "../src/i18n/config.ts";

const common = JSON.parse(readFileSync(new URL("../src/i18n/en-common.json", import.meta.url), "utf8"));
const options = {
  url: "https://www.bmygym.com",
  name: "BMYGYM",
  email: "hello@bmygym.com",
  description: common.meta.description as string,
};

test("all languages identify one business and website with the matching legal reference", () => {
  for (const locale of locales) {
    const graph = homeStructuredData({...options, locale})["@graph"];
    const organization = graph.find(item => item["@type"] === "Organization")!;
    const website = graph.find(item => item["@type"] === "WebSite")!;
    assert.equal(organization["@id"], "https://www.bmygym.com/#organization");
    assert.equal(website["@id"], "https://www.bmygym.com/#website");
    assert.equal(website.publisher?.["@id"], organization["@id"]);
    assert.deepEqual(website.inLanguage, locales);
    assert.equal(organization.subjectOf?.["@id"], options.url + localePath(locale, "legal"));

    const localized = JSON.parse(readFileSync(new URL(`../src/i18n/${locale}-common.json`, import.meta.url), "utf8"));
    const legalOperator = localized.legal.legal.sections[0].paragraphs.join("\n");
    assert.ok(legalOperator.includes(organization.founder!.name), locale);
    assert.ok(legalOperator.includes(organization.address!.streetAddress), locale);
    assert.ok(legalOperator.includes(organization.address!.postalCode), locale);
    assert.ok(legalOperator.includes(organization.email!), locale);
  }
});

test("structured data safely survives a description containing an HTML script terminator", () => {
  const graph = homeStructuredData({...options, locale: "en", description: '</script><script>alert("example")</script>'});
  const serialized = serializeStructuredData(graph);
  assert.equal(serialized.includes("<"), false);
  assert.deepEqual(JSON.parse(serialized), graph);
});
