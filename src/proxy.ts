import { NextResponse, type NextRequest } from "next/server";
import { isLocale } from "./i18n/config";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const segment = pathname.split("/")[1];
  // English remains the primary, unprefixed URL. No automatic language switch.
  // /en is also the internal rewrite target; it must not redirect back to /.
  // Canonical and language links expose only the unprefixed English URL.
  if (isLocale(segment)) return NextResponse.next();
  const url = request.nextUrl.clone();
  url.pathname = `/en${pathname === "/" ? "" : pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: ["/((?!api(?:/|$)|_next(?:/|$)|images(?:/|$)|fonts(?:/|$)|.*\\.[^/]+$).*)"],
};
