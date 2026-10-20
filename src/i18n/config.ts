export const locales = ["en", "de", "fr", "es", "ru"] as const;
export type Locale = (typeof locales)[number];
export const languageNames: Record<Locale, string> = {
  en: "English", de: "Deutsch", fr: "Français", es: "Español", ru: "Русский",
};
export function isLocale(value: string): value is Locale {
  return locales.some((locale) => locale === value);
}
export function localePath(locale: Locale, path = ""): string {
  const suffix = path.startsWith("/") ? path : path ? `/${path}` : "";
  return `${locale === "en" ? "" : `/${locale}`}${suffix}` || "/";
}
