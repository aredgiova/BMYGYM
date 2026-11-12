"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const measurementId = "G-5ZH4R52182";
type AnalyticsWindow = Window & {
  dataLayer?: unknown[];
  gtag?: (...args: unknown[]) => void;
  "ga-disable-G-5ZH4R52182"?: boolean;
};
let initialized = false;

function clearAnalyticsCookies() {
  const hostname = window.location.hostname;
  const parts = hostname.split(".");
  const domains = ["", ...parts.map((_, index) => parts.slice(index).join("."))];
  for (const cookie of document.cookie.split(";")) {
    const name = cookie.trim().split("=")[0];
    if (name !== "_ga" && !name.startsWith("_ga_")) continue;
    for (const domain of domains) {
      document.cookie = `${name}=; Max-Age=0; path=/; SameSite=Lax${domain ? `; domain=${domain}` : ""}`;
    }
  }
}

export function Analytics({ allowed, enabled }: { allowed: boolean; enabled: boolean }) {
  const pathname = usePathname();
  useEffect(() => {
    const target = window as AnalyticsWindow;
    const consent = allowed && enabled;
    target["ga-disable-G-5ZH4R52182"] = !consent;
    if (!consent) {
      if (initialized) target.gtag?.("consent", "update", { analytics_storage: "denied" });
      clearAnalyticsCookies();
      return;
    }

    target.dataLayer ??= [];
    target.gtag ??= function () {
      // eslint-disable-next-line prefer-rest-params -- Google consumes the native arguments object as a tag command.
      target.dataLayer?.push(arguments);
    };
    const gtag = target.gtag;
    const pageLocation = window.location.origin + window.location.pathname;
    if (!initialized) {
      gtag("consent", "default", {
        analytics_storage: "granted", ad_storage: "denied",
        ad_user_data: "denied", ad_personalization: "denied",
      });
      gtag("js", new Date());
      gtag("config", measurementId, {
        send_page_view: false, allow_google_signals: false,
        allow_ad_personalization_signals: false,
        page_location: pageLocation, page_referrer: "",
      });
      const script = document.createElement("script");
      script.id = "bmygym-analytics";
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
      document.head.appendChild(script);
      initialized = true;
    } else {
      gtag("consent", "update", { analytics_storage: "granted" });
    }
    gtag("event", "page_view", { page_location: pageLocation, page_referrer: "" });

    function track(name: string, parameters: Record<string, string> = {}) {
      if (target["ga-disable-G-5ZH4R52182"]) return;
      gtag("event", name, {
        ...parameters, page_location: pageLocation,
        language: document.documentElement.lang,
      });
    }
    function onClick(event: MouseEvent) {
      const link = event.target instanceof Element ? event.target.closest("a") : null;
      if (!link) return;
      const href = link.getAttribute("href") || "";
      if (href.includes("#enquiry")) {
        const section = link.closest("section[id], header, footer");
        track("private_commission_click", { placement: section?.id || section?.tagName.toLowerCase() || "navigation" });
      } else if (href === "mailto:hello@bmygym.com") {
        track("contact_email_click");
      } else if (href === "#retreat-reservation") {
        const section = link.closest("section[id]");
        track("retreat_reservation_click", { placement: section?.id || "retreats_hero" });
      } else if (/^\/(?:en\/|de\/|es\/|fr\/|ru\/|it\/)?retreats\/?$/.test(href)) {
        track("retreats_click");
      } else if (/^\/(?:en\/|de\/|es\/|fr\/|ru\/|it\/)?private-consultation\/?$/.test(href)) {
        track("private_consultation_click");
      }
    }
    function onSuccess(event: Event) {
      const intent: unknown = event instanceof CustomEvent ? event.detail?.intent : undefined;
      if (intent !== "private-commission" && intent !== "retreat" && intent !== "private-consultation") return;
      track("generate_lead", { form_name: intent.replaceAll("-", "_") });
    }
    document.addEventListener("click", onClick);
    window.addEventListener("bmygym:enquiry-success", onSuccess);
    return () => {
      document.removeEventListener("click", onClick);
      window.removeEventListener("bmygym:enquiry-success", onSuccess);
    };
  }, [allowed, enabled, pathname]);
  return null;
}
