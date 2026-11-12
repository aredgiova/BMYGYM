"use client";

import Link from "next/link";
import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import { localePath } from "@/i18n/config";
import { useLocale } from "@/i18n/provider";
import { Analytics } from "./analytics";

const preferenceKey = "bmygym.cookie-consent.v2";
const preferenceLifetime = 180 * 24 * 60 * 60 * 1000;
const preferenceEvent = "bmygym:cookie-notice";
let memoryPreference: string | null = null;

function isCurrentPreference(value: string | null, now = Date.now()) {
  if (!value) return false;
  try {
    const preference: unknown = JSON.parse(value);
    if (!preference || typeof preference !== "object") return false;
    const { version, dismissedAt, analytics } = preference as Record<string, unknown>;
    return version === 2 && typeof analytics === "boolean" && typeof dismissedAt === "number" &&
      Number.isFinite(dismissedAt) && dismissedAt <= now &&
      now - dismissedAt < preferenceLifetime;
  } catch {
    return false;
  }
}

function readPreference() {
  if (memoryPreference !== null) return memoryPreference;
  try {
    return window.localStorage.getItem(preferenceKey);
  } catch {
    return memoryPreference;
  }
}

function subscribe(listener: () => void) {
  function onStorage(event: StorageEvent) {
    if (event.key === preferenceKey || event.key === null) {
      memoryPreference = null;
      listener();
    }
  }
  window.addEventListener("storage", onStorage);
  window.addEventListener(preferenceEvent, listener);
  return () => {
    window.removeEventListener("storage", onStorage);
    window.removeEventListener(preferenceEvent, listener);
  };
}

const CookieNoticeContext = createContext<{
  openNotice: (trigger: HTMLButtonElement) => void;
  visible: boolean;
} | null>(null);

export function CookieNoticeProvider({ children, analyticsEnabled = false }: { children: React.ReactNode; analyticsEnabled?: boolean }) {
  const { locale, common } = useLocale();
  const preference = useSyncExternalStore(subscribe, readPreference, () => undefined);
  const [reopened, setReopened] = useState(false);
  const noticeRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const visible = reopened || (preference !== undefined && !isCurrentPreference(preference));
  const copy = common.cookieNotice;
  const analyticsAllowed = !!preference && isCurrentPreference(preference) && JSON.parse(preference).analytics === true;

  useEffect(() => {
    if (!preference || !isCurrentPreference(preference)) return;
    const remaining = JSON.parse(preference).dismissedAt + preferenceLifetime - Date.now();
    // Browsers cap a timer at about 24 days; recheck long-lived open tabs daily.
    const timer = setInterval(() => {
      if (!isCurrentPreference(preference)) {
        memoryPreference = null;
        try { window.localStorage.removeItem(preferenceKey); } catch { /* Storage may be blocked. */ }
        window.dispatchEvent(new Event(preferenceEvent));
      }
    }, Math.min(remaining + 1, 24 * 60 * 60 * 1000));
    return () => clearInterval(timer);
  }, [preference]);

  useEffect(() => {
    if (!visible || !noticeRef.current) return;
    const notice = noticeRef.current;
    const root = document.documentElement;
    function updateHeight() {
      root.style.setProperty("--cookie-notice-height", `${notice.getBoundingClientRect().height}px`);
    }
    updateHeight();
    const observer = new ResizeObserver(updateHeight);
    observer.observe(notice);
    return () => {
      observer.disconnect();
      root.style.removeProperty("--cookie-notice-height");
    };
  }, [visible]);

  useEffect(() => {
    if (reopened) headingRef.current?.focus({ preventScroll: true });
  }, [reopened]);

  useEffect(() => {
    if (!preference || isCurrentPreference(preference)) return;
    // Expired or invalid records are removed when the visitor returns.
    memoryPreference = null;
    try {
      window.localStorage.removeItem(preferenceKey);
    } catch {
      // The notice remains usable when browser storage is unavailable.
    }
    window.dispatchEvent(new Event(preferenceEvent));
  }, [preference]);

  function openNotice(trigger: HTMLButtonElement) {
    triggerRef.current = trigger;
    setReopened(true);
    headingRef.current?.focus({ preventScroll: true });
  }

  function dismissNotice(analytics = false) {
    memoryPreference = JSON.stringify({ version: 2, dismissedAt: Date.now(), analytics });
    try {
      window.localStorage.setItem(preferenceKey, memoryPreference);
    } catch {
      // Keep the dismissal in memory for this page when storage is blocked.
    }
    window.dispatchEvent(new Event(preferenceEvent));
    setReopened(false);
    const target = triggerRef.current?.isConnected
      ? triggerRef.current
      : document.getElementById("main-content");
    target?.focus({ preventScroll: true });
    triggerRef.current = null;
  }

  return (
    <CookieNoticeContext.Provider value={{ openNotice, visible }}>
      <Analytics allowed={analyticsAllowed} enabled={analyticsEnabled} />
      {children}
      {visible && (
        <section
          ref={noticeRef}
          id="cookie-notice"
          className="cookie-notice"
          aria-labelledby="cookie-notice-title"
          aria-describedby="cookie-notice-description"
          onKeyDown={(event) => {
            if (event.key === "Escape") {
              event.preventDefault();
              dismissNotice();
            }
          }}
        >
          <div className="cookie-notice-inner">
            <div className="cookie-notice-copy">
              <h2 id="cookie-notice-title" ref={headingRef} tabIndex={-1}>{copy.title}</h2>
              <p id="cookie-notice-description">{copy.body}</p>
            </div>
            <div className="cookie-notice-actions">
              <Link href={localePath(locale, "cookies")} className="cookie-notice-policy">{copy.policy}</Link>
              <button type="button" className="cookie-notice-dismiss" onClick={() => dismissNotice(false)}>{copy.dismiss}</button>
              <button type="button" className="cookie-notice-dismiss" onClick={() => dismissNotice(true)}>{copy.accept}</button>
            </div>
          </div>
        </section>
      )}
    </CookieNoticeContext.Provider>
  );
}

export function CookieSettingsButton({ children }: { children: React.ReactNode }) {
  const context = useContext(CookieNoticeContext);
  if (!context) throw new Error("CookieNoticeProvider is required");
  return (
    <button
      type="button"
      className="cookie-settings"
      aria-controls={context.visible ? "cookie-notice" : undefined}
      aria-expanded={context.visible}
      onClick={(event) => context.openNotice(event.currentTarget)}
    >
      {children}
    </button>
  );
}
