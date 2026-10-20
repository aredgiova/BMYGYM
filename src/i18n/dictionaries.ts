import type { Locale } from "./config";
import type { Dictionary } from "./types";

const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
  en: async () => ({common: (await import("./en-common.json")).default, home: (await import("./en-home.json")).default}),
  de: async () => ({common: (await import("./de-common.json")).default, home: (await import("./de-home.json")).default}),
  fr: async () => ({common: (await import("./fr-common.json")).default, home: (await import("./fr-home.json")).default}),
  es: async () => ({common: (await import("./es-common.json")).default, home: (await import("./es-home.json")).default}),
  ru: async () => ({common: (await import("./ru-common.json")).default, home: (await import("./ru-home.json")).default}),
};
export function getDictionary(locale: Locale): Promise<Dictionary> {
  return dictionaries[locale]();
}
