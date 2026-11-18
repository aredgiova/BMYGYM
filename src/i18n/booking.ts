import en from "./en-booking.json" with { type: "json" };
import de from "./de-booking.json" with { type: "json" };
import es from "./es-booking.json" with { type: "json" };
import fr from "./fr-booking.json" with { type: "json" };
import ru from "./ru-booking.json" with { type: "json" };
import it from "./it-booking.json" with { type: "json" };
import ar from "./ar-booking.json" with { type: "json" };
import type { Locale } from "./config.ts";

export type BookingCopy = typeof en;
export type BookingIntent = "retreat" | "private-consultation";

const bookingCopy: Record<Locale, BookingCopy> = { en, de, es, fr, ru, it, ar };

export function getBookingCopy(locale: Locale): BookingCopy {
  return bookingCopy[locale];
}
