"use client";

import Link from "next/link";
import { useRef, useState, type FormEvent } from "react";
import { Arrow } from "@/components/ui/arrow";
import { localePath, type Locale } from "@/i18n/config";
import type { BookingCopy, BookingIntent } from "@/i18n/booking";
import type { CommonCopy } from "@/i18n/types";
import { validateEnquiry, type EnquiryErrors, type EnquiryField } from "@/validations/enquiry";

export function RequestForm({ locale, copy, booking, intent }: {
  locale: Locale;
  copy: CommonCopy;
  booking: BookingCopy;
  intent: BookingIntent;
}) {
  const content = booking[intent];
  const [status, setStatus] = useState<{kind: "idle" | "sending" | "success" | "error"; message: string}>({kind: "idle", message: ""});
  const [errors, setErrors] = useState<EnquiryErrors>({});
  const submitting = useRef(false);
  const statusRef = useRef<HTMLDivElement>(null);

  function fieldProps(field: EnquiryField, hint?: string) {
    return {
      "aria-invalid": errors[field] ? true : undefined,
      "aria-describedby": [hint, errors[field] ? `${field}-error` : undefined].filter(Boolean).join(" ") || undefined,
      onChange: () => setErrors(previous => {
        if (!previous[field]) return previous;
        const next = {...previous};
        delete next[field];
        return next;
      }),
    };
  }

  function fieldError(field: EnquiryField) {
    return errors[field] ? <p className="field-error" id={`${field}-error`}>{errors[field]}</p> : null;
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting.current) return;
    const form = event.currentTarget;
    const data = new FormData(form);
    const input = {
      intent,
      locale,
      fullName: data.get("fullName"),
      email: data.get("email"),
      message: data.get("message"),
      expectedTimeline: data.get("expectedTimeline"),
      privacy: data.get("privacy") === "on",
      website: data.get("website"),
    };
    let resultErrors: EnquiryErrors = {};
    const focusResult = () => requestAnimationFrame(() => {
      const firstField = Object.keys(resultErrors).find(field => !["website", "locale", "intent"].includes(field));
      const control = firstField ? form.elements.namedItem(firstField) : null;
      if (control instanceof HTMLElement) control.focus();
      else statusRef.current?.focus();
    });
    const validation = validateEnquiry(input, {...copy.validation, message: content.messageValidation}, booking.validationIntent);
    if (!validation.success) {
      resultErrors = validation.errors;
      setErrors(resultErrors);
      setStatus({kind: "error", message: resultErrors.website || copy.api.validation});
      focusResult();
      return;
    }

    submitting.current = true;
    setErrors({});
    setStatus({kind: "sending", message: copy.form.sending});
    try {
      const response = await fetch("/api/v1/contact", {
        method: "POST",
        headers: {"Content-Type": "application/json", "X-BMYGYM-Locale": locale},
        body: JSON.stringify(input),
        signal: AbortSignal.timeout(20000),
      });
      const result: {success?: boolean; message?: string; error?: {fields?: EnquiryErrors}} = await response.json();
      if (!response.ok || result.success !== true) {
        resultErrors = result.error?.fields || {};
        setErrors(resultErrors);
        setStatus({kind: "error", message: resultErrors.website || result.message || copy.api.delivery});
        return;
      }
      setStatus({kind: "success", message: result.message || content.success});
      window.dispatchEvent(new CustomEvent("bmygym:enquiry-success", {detail: {intent}}));
      form.reset();
    } catch {
      setStatus({kind: "error", message: copy.api.delivery});
    } finally {
      submitting.current = false;
      focusResult();
    }
  }

  return (
    <form className="enquiry-form booking-form" action="/api/v1/contact" method="post" noValidate onSubmit={submit} aria-label={content.formTitle} aria-busy={status.kind === "sending"}>
      <h2>{content.formTitle}</h2>
      <p className="form-required-note">{copy.form.required}</p>
      <fieldset disabled={status.kind === "sending"}>
        <legend className="sr-only">{content.formTitle}</legend>
        <div className="form-row">
          <div className="form-field">
            <label htmlFor="fullName">{copy.form.fullName} <span>*</span></label>
            <input id="fullName" name="fullName" dir="auto" autoComplete="name" placeholder={copy.form.namePlaceholder} required minLength={2} maxLength={120} {...fieldProps("fullName")} />
            {fieldError("fullName")}
          </div>
          <div className="form-field">
            <label htmlFor="email">{copy.form.email} <span>*</span></label>
            <input id="email" name="email" type="email" dir="ltr" autoComplete="email" placeholder={copy.form.emailPlaceholder} required maxLength={254} {...fieldProps("email")} />
            {fieldError("email")}
          </div>
        </div>
        <div className="form-field">
          <label htmlFor="message">{content.message} <span>*</span></label>
          <textarea id="message" name="message" dir="auto" rows={5} required minLength={20} maxLength={5000} placeholder={content.messagePlaceholder} {...fieldProps("message", "message-hint")} />
          <p id="message-hint" className="form-hint">{copy.form.messageHint}</p>
          {fieldError("message")}
        </div>
        <div className="form-field">
          <label htmlFor="expectedTimeline">{content.timelineLabel} <span className="optional">{copy.form.optional}</span></label>
          <input id="expectedTimeline" name="expectedTimeline" dir="auto" maxLength={160} placeholder={content.timelinePlaceholder} {...fieldProps("expectedTimeline")} />
          {fieldError("expectedTimeline")}
        </div>
        <div className="honeypot" aria-hidden="true">
          <label htmlFor="website">{copy.form.honeypot}</label>
          <input id="website" name="website" tabIndex={-1} autoComplete="off" />
        </div>
        <label className="privacy-check">
          <input id="privacy" name="privacy" type="checkbox" required {...fieldProps("privacy")} />
          <span>{copy.form.privacyBefore}{/[’']$/.test(copy.form.privacyBefore) ? "" : " "}<Link href={localePath(locale, "privacy")} target="_blank" rel="noopener">{copy.form.privacyLink}</Link>{" "}{copy.form.privacyAfter} *</span>
        </label>
        {fieldError("privacy")}
        <button className="button button-dark submit-button" type="submit" disabled={status.kind === "sending"}>
          {status.kind === "sending" ? copy.form.sending : content.submit}<Arrow diagonal />
        </button>
      </fieldset>
      <div ref={statusRef} className={`form-status ${status.kind}`} role="status" aria-live="polite" tabIndex={-1}>
        {status.message}
        {status.kind === "error" && <a href="mailto:hello@bmygym.com">{copy.form.emailFallback}<Arrow diagonal /></a>}
      </div>
      <noscript><p>{copy.form.noScript}</p></noscript>
    </form>
  );
}
