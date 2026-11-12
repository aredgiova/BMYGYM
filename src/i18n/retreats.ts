import en from "./en-retreats.json" with { type: "json" };
import de from "./de-retreats.json" with { type: "json" };
import es from "./es-retreats.json" with { type: "json" };
import fr from "./fr-retreats.json" with { type: "json" };
import ru from "./ru-retreats.json" with { type: "json" };
import it from "./it-retreats.json" with { type: "json" };
import type { Locale } from "./config.ts";

export type RetreatsCopy = typeof en;

const retreatsCopy: Record<Locale, RetreatsCopy> = { en, de, es, fr, ru, it };

export function getRetreatsCopy(locale: Locale): RetreatsCopy {
  return retreatsCopy[locale];
}
