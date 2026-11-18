"use client";

import { useEffect, useRef } from "react";
import { Arrow } from "@/components/ui/arrow";
import type { HomeCopy } from "@/i18n/types";

const preferenceKey = "bmygym.welcome.v1";
const preferenceLifetime = 180 * 24 * 60 * 60 * 1000;
let dismissedInMemory = false;

export function BrandWelcome({ copy }: { copy: HomeCopy["welcome"] }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const previousOverflowRef = useRef<string | null>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  function restoreScrolling() {
    if (previousOverflowRef.current !== null) {
      document.documentElement.style.overflow = previousOverflowRef.current;
      previousOverflowRef.current = null;
    }
  }

  useEffect(() => {
    const dialog = dialogRef.current;
    // Direct links to a project enquiry or another section retain their destination.
    if (!dialog || dismissedInMemory || (window.location.hash && window.location.hash !== "#home")) return;
    try {
      const dismissedAt = Number(window.localStorage.getItem(preferenceKey));
      if (dismissedAt > 0 && dismissedAt <= Date.now() && Date.now() - dismissedAt < preferenceLifetime) return;
      // Preserve dismissal from visits made before the persistent preference existed.
      if (window.sessionStorage.getItem(preferenceKey) === "dismissed") return;
    } catch {
      // A blocked storage API must never prevent entry to the site.
    }

    previousFocusRef.current = document.activeElement instanceof HTMLElement &&
      document.activeElement !== document.body ? document.activeElement : null;
    previousOverflowRef.current = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    dialog.showModal();
    titleRef.current?.focus({ preventScroll: true });

    return () => {
      if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
      dialog.close();
      delete dialog.dataset.closing;
      restoreScrolling();
    };
  }, []);

  function dismiss() {
    const dialog = dialogRef.current;
    if (!dialog?.open || dialog.dataset.closing) return;
    dismissedInMemory = true;
    try {
      window.localStorage.setItem(preferenceKey, String(Date.now()));
    } catch {
      // The in-memory fallback lasts for this page when storage is unavailable.
    }

    function finish() {
      dialog?.close();
      restoreScrolling();
      const target = previousFocusRef.current?.isConnected
        ? previousFocusRef.current
        : document.getElementById("main-content");
      target?.focus({ preventScroll: true });
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      finish();
    } else {
      dialog.dataset.closing = "true";
      closeTimerRef.current = setTimeout(finish, 280);
    }
  }

  return (
    <dialog
      ref={dialogRef}
      className="brand-welcome"
      aria-labelledby="brand-welcome-title"
      aria-describedby="brand-welcome-description"
      onCancel={(event) => {
        event.preventDefault();
        dismiss();
      }}
    >
      <button type="button" className="brand-welcome-close" onClick={dismiss} aria-label={copy.close}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="m6 6 12 12M18 6 6 18" stroke="currentColor" strokeWidth="1.2" />
        </svg>
      </button>
      <div className="brand-welcome-identity" lang={copy.identityLanguage} dir={copy.identityLanguage === "ar" ? "rtl" : "ltr"}>
        <p className="brand-welcome-wordmark" lang="en" dir="ltr">BMYGYM</p>
        <h2 id="brand-welcome-title" ref={titleRef} tabIndex={-1}>
          {copy.title} <em>{copy.titleEmphasis}</em>
        </h2>
        <span className="brand-welcome-rule" aria-hidden="true" />
        <div id="brand-welcome-description" className="brand-welcome-description">
          <p className="brand-welcome-service">{copy.service}</p>
          <p className="brand-welcome-disciplines">
            <span>{copy.disciplines[0]}</span><span aria-hidden="true"> · </span><span>{copy.disciplines[1]}</span><span aria-hidden="true"> · </span><span>{copy.disciplines[2]}</span>
          </p>
          <p className="brand-welcome-worlds">{copy.worlds[0]} <span>·</span> {copy.worlds[1]} <span>·</span> {copy.worlds[2]}</p>
        </div>
      </div>
      <button type="button" className="brand-welcome-enter text-link" onClick={dismiss}>
        {copy.enter}<Arrow />
      </button>
    </dialog>
  );
}
