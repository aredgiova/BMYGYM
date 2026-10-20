"use client";
import { createContext, useContext } from "react";
import type { Locale } from "./config";
import type { CommonCopy } from "./types";
const LocaleContext = createContext<{locale: Locale; common: CommonCopy} | null>(null);
export function LocaleProvider({locale, common, children}: {locale: Locale; common: CommonCopy; children: React.ReactNode}) {
  return <LocaleContext.Provider value={{locale, common}}>{children}</LocaleContext.Provider>;
}
export function useLocale() {
  const context = useContext(LocaleContext);
  if (!context) throw new Error("LocaleProvider is required");
  return context;
}
