import assert from "node:assert/strict";
import test from "node:test";
import { readFileSync } from "node:fs";
import { locales, localePath } from "../src/i18n/config.ts";

function shape(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(shape);
  if (value && typeof value === "object") return Object.fromEntries(Object.entries(value).map(([key,item]) => [key,shape(item)]));
  assert.equal(typeof value,"string");
  assert.ok((value as string).trim(),"Translations must not contain empty text");
  return "string";
}

for (const category of ["common","home"]) {
  test(`every ${category} translation covers the full English content`, () => {
    const english = JSON.parse(readFileSync(new URL(`../src/i18n/en-${category}.json`,import.meta.url),"utf8"));
    for (const locale of locales) {
      const translated = JSON.parse(readFileSync(new URL(`../src/i18n/${locale}-${category}.json`,import.meta.url),"utf8"));
      assert.deepEqual(shape(translated),shape(english),locale);
    }
  });
}

test("English remains primary and legal links retain the chosen locale", () => {
  assert.equal(localePath("en"),"/");
  assert.equal(localePath("en","privacy"),"/privacy");
  for (const locale of locales.filter(locale=>locale!=="en")) {
    assert.equal(localePath(locale),`/${locale}`);
    assert.equal(localePath(locale,"privacy"),`/${locale}/privacy`);
    assert.equal(localePath(locale,"/legal"),`/${locale}/legal`);
  }
});
