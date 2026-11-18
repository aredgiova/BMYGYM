import en from "./en-common.json" with { type: "json" };
import de from "./de-common.json" with { type: "json" };
import fr from "./fr-common.json" with { type: "json" };
import es from "./es-common.json" with { type: "json" };
import ru from "./ru-common.json" with { type: "json" };
import it from "./it-common.json" with { type: "json" };
import ar from "./ar-common.json" with { type: "json" };
import type { Locale } from "./config.ts";
import type { CommonCopy } from "./types.ts";

const commonCopy: Record<Locale, CommonCopy> = { en, de, es, fr, ru, it, ar };

export function getCommonCopy(locale: Locale): CommonCopy {
  return commonCopy[locale];
}
