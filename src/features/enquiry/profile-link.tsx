"use client";

import { useSyncExternalStore, type MouseEvent, type ReactNode } from "react";
import {
  getProfileSelection,
  getServerProfileSelection,
  PROFILE_SELECTION_EVENT,
  profileSelectionHref,
  subscribeProfileSelection,
  type ClientProfile,
} from "./profile-selection";

export function ProfileLink({
  profile,
  className,
  children,
}: {
  profile: ClientProfile;
  className?: string;
  children: ReactNode;
}) {
  const selection = useSyncExternalStore(
    subscribeProfileSelection,
    getProfileSelection,
    getServerProfileSelection,
  );
  // The query-only SSR link retains the current language path without needing
  // request-specific search parameters in this statically rendered page.
  const href = selection.href
    ? profileSelectionHref(selection.href, profile)
    : `?client=${profile}#enquiry`;

  function onClick(event: MouseEvent<HTMLAnchorElement>) {
    if (
      event.defaultPrevented || event.button !== 0 ||
      event.metaKey || event.ctrlKey || event.shiftKey || event.altKey
    ) return;

    event.preventDefault();
    const target = new URL(profileSelectionHref(window.location.href, profile), window.location.origin);
    if (window.location.href !== target.href) {
      // Keep Next.js's existing history state and the mounted form. Modified
      // clicks retain the normal link behavior; ordinary clicks stay in place.
      window.history.pushState(window.history.state, "", target.href);
    }
    // pushState emits no popstate; an explicit event also handles repeat clicks.
    window.dispatchEvent(new Event(PROFILE_SELECTION_EVENT));
    document.getElementById("enquiry")?.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth",
      block: "start",
    });
  }

  return <a href={href} className={className} onClick={onClick}>{children}</a>;
}
