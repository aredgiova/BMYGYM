import en from "./en-common.json" with { type: "json" };
import de from "./de-common.json" with { type: "json" };
import fr from "./fr-common.json" with { type: "json" };
import es from "./es-common.json" with { type: "json" };
import ru from "./ru-common.json" with { type: "json" };
import type { Locale } from "./config.ts";
import type { CommonCopy } from "./types.ts";

const commonCopy: Record<Locale, CommonCopy> = { en, de, fr, es, ru };

export function getCommonCopy(locale: Locale): CommonCopy {
  return commonCopy[locale];
}
