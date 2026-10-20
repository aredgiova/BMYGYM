import { CLIENT_TYPES, type ClientType } from "../../validations/enquiry.ts";

export type ClientProfile = "private" | "professional";
export const PROFILE_SELECTION_EVENT = "bmygym:profile-selection";

export function clientTypeForProfile(profile: string | null): ClientType | "" {
  if (profile === "private") return CLIENT_TYPES[0];
  if (profile === "professional") return CLIENT_TYPES[1];
  return "";
}

export function profileSelectionHref(location: string, profile: ClientProfile): string {
  const url = new URL(location, "https://bmygym.invalid");
  url.searchParams.set("client", profile);
  url.hash = "enquiry";
  return `${url.pathname}${url.search}${url.hash}`;
}

type SelectionSnapshot = {
  href: string;
  profile: string | null;
  revision: number;
  source: "initial" | "cta" | "navigation";
};

const serverSnapshot: SelectionSnapshot = {
  href: "", profile: null, revision: 0, source: "initial",
};
let currentSnapshot = serverSnapshot;
const listeners = new Set<() => void>();

export function getServerProfileSelection(): SelectionSnapshot {
  return serverSnapshot;
}

export function getProfileSelection(): SelectionSnapshot {
  if (typeof window === "undefined") return serverSnapshot;
  if (currentSnapshot.href !== window.location.href) {
    currentSnapshot = {
      ...currentSnapshot,
      href: window.location.href,
      profile: new URLSearchParams(window.location.search).get("client"),
    };
  }
  return currentSnapshot;
}

function notify() {
  getProfileSelection();
  for (const listener of listeners) listener();
}

function onSelection() {
  currentSnapshot = {
    ...getProfileSelection(),
    revision: currentSnapshot.revision + 1,
    source: "cta",
  };
  notify();
}

function onHistoryNavigation() {
  const previousHref = currentSnapshot.href;
  const next = getProfileSelection();
  // Browsers can emit popstate for fragment navigation too. Moving between
  // sections must not overwrite a profile the visitor selected manually.
  if (previousHref) {
    const previous = new URL(previousHref);
    const current = new URL(next.href);
    if (previous.pathname === current.pathname && previous.search === current.search) {
      notify();
      return;
    }
  }
  currentSnapshot = {
    ...next,
    revision: currentSnapshot.revision + 1,
    source: "navigation",
  };
  notify();
}

export function subscribeProfileSelection(listener: () => void): () => void {
  if (listeners.size === 0) {
    window.addEventListener(PROFILE_SELECTION_EVENT, onSelection);
    window.addEventListener("popstate", onHistoryNavigation);
    window.addEventListener("hashchange", notify);
  }
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
    if (listeners.size === 0) {
      window.removeEventListener(PROFILE_SELECTION_EVENT, onSelection);
      window.removeEventListener("popstate", onHistoryNavigation);
      window.removeEventListener("hashchange", notify);
    }
  };
}
