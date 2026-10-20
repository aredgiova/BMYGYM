"use client";
import { LegalLayout } from "@/components/layout/legal-layout";
import { useLocale } from "@/i18n/provider";
import { localePath } from "@/i18n/config";

export default function NotFound() {
  const {locale, common} = useLocale();
  return <LegalLayout locale={locale} copy={common} title={common.notFound.title}>
    <p>{common.notFound.body}</p>
    <a className="button button-dark" href={localePath(locale)}>{common.notFound.back}</a>
  </LegalLayout>;
}
