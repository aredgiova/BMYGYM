import assert from "node:assert/strict";
import test from "node:test";
import { readFileSync } from "node:fs";
import { isLocale, languageNames, locales, localePath, localeDirection } from "../src/i18n/config.ts";

function shape(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(shape);
  if (value && typeof value === "object") return Object.fromEntries(Object.entries(value).map(([key,item]) => [key,shape(item)]));
  assert.equal(typeof value,"string");
  assert.ok((value as string).trim(),"Translations must not contain empty text");
  return "string";
}

test("Arabic is the seventh language and preserves the existing language order", () => {
  assert.deepEqual(locales, ["en", "de", "es", "fr", "ru", "it", "ar"]);
  assert.equal(languageNames.ru, "Русский");
  assert.equal(languageNames.it, "Italiano");
  assert.ok(isLocale("ru"));
  assert.ok(isLocale("it"));
  assert.equal(isLocale("IT"), false);
  assert.equal(languageNames.ar, "العربية");
  assert.ok(isLocale("ar"));
  for (const locale of locales) assert.equal(localeDirection(locale), locale === "ar" ? "rtl" : "ltr");
});

for (const category of ["common","home","booking","retreats"]) {
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

test("Arabic mixed-script copy keeps directional isolates balanced without overrides", () => {
  function verify(value: unknown, path: string) {
    if (typeof value === "string") {
      assert.doesNotMatch(value, /[\u202a-\u202e]/u, path);
      let depth = 0;
      for (const character of value) {
        if (/[\u2066-\u2068]/u.test(character)) depth++;
        if (character === "\u2069") depth--;
        assert.ok(depth >= 0, `${path}: unmatched directional isolate`);
      }
      assert.equal(depth, 0, `${path}: unclosed directional isolate`);
      return;
    }
    for (const [key, item] of Object.entries(value as Record<string, unknown>)) verify(item, `${path}.${key}`);
  }
  for (const category of ["common", "home", "booking", "retreats"]) {
    verify(JSON.parse(readFileSync(new URL(`../src/i18n/ar-${category}.json`, import.meta.url), "utf8")), category);
  }
});
