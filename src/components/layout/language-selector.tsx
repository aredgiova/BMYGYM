"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import { usePathname } from "next/navigation";
import { isLocale, languageNames, locales, localePath, type Locale } from "@/i18n/config";
import { PROFILE_SELECTION_EVENT } from "@/features/enquiry/profile-selection";

function subscribeLocation(callback: () => void) {
  window.addEventListener("hashchange", callback);
  window.addEventListener("popstate", callback);
  window.addEventListener(PROFILE_SELECTION_EVENT, callback);
  return () => {
    window.removeEventListener("hashchange", callback);
    window.removeEventListener("popstate", callback);
    window.removeEventListener(PROFILE_SELECTION_EVENT, callback);
  };
}
function locationSuffix() { return window.location.search + window.location.hash; }
function serverSuffix() { return ""; }

export function LanguageSelector({ locale, label }: { locale: Locale; label: string }) {
  const pathname = usePathname();
  const suffix = useSyncExternalStore(subscribeLocation, locationSuffix, serverSuffix);
  const disclosure = useRef<HTMLDetailsElement>(null);
  const segment = pathname.split("/")[1];
  const path = isLocale(segment) ? pathname.slice(segment.length + 1) : pathname;

  useEffect(() => {
    function close(event: PointerEvent | KeyboardEvent) {
      if (!disclosure.current?.open) return;
      if (event instanceof KeyboardEvent) {
        if (event.key !== "Escape") return;
        disclosure.current.open = false;
        disclosure.current.querySelector("summary")?.focus();
      } else if (event.target instanceof Node && !disclosure.current.contains(event.target)) {
        disclosure.current.open = false;
      }
    }
    document.addEventListener("pointerdown", close);
    document.addEventListener("keydown", close);
    return () => {
      document.removeEventListener("pointerdown", close);
      document.removeEventListener("keydown", close);
    };
  }, []);

  return (
    <details className="language-selector" ref={disclosure}>
      <summary aria-label={`${label}: ${languageNames[locale]}`}>
        {locale.toUpperCase()}
        <svg width="10" height="6" viewBox="0 0 10 6" fill="none" aria-hidden="true"><path d="m1 1 4 4 4-4" stroke="currentColor" /></svg>
      </summary>
      <nav aria-label={label}>
        {locales.map((language) => (
          <a key={language} href={localePath(language, path === "/" ? "" : path) + suffix}
            hrefLang={language} lang={language} aria-current={locale === language ? "true" : undefined}
            onClick={() => {
              if (disclosure.current) disclosure.current.open = false;
            }}>
            <span>{languageNames[language]}</span><span aria-hidden="true">{language.toUpperCase()}</span>
          </a>
        ))}
      </nav>
    </details>
  );
}
