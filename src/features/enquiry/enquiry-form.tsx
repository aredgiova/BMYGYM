"use client";

import Link from "next/link";
import { useEffect, useRef, useState, useSyncExternalStore, type FormEvent } from "react";
import { Arrow } from "@/components/ui/arrow";
import { localePath, type Locale } from "@/i18n/config";
import type { CommonCopy } from "@/i18n/types";
import {
  CLIENT_TYPES,
  PROJECT_TYPES,
  validateEnquiry,
  type ClientType,
  type EnquiryErrors,
  type EnquiryField,
} from "@/validations/enquiry";
import {
  clientTypeForProfile,
  getProfileSelection,
  getServerProfileSelection,
  subscribeProfileSelection,
} from "./profile-selection";

type FormStatus = {
  kind: "idle" | "sending" | "success" | "error";
  message: string;
};
type EnquiryResponse = {
  success?: boolean;
  message?: string;
  error?: { fields?: EnquiryErrors } | null;
};

function FieldError({
  field,
  message,
}: {
  field: EnquiryField;
  message?: string;
}) {
  return message ? (
    <p id={`${field}-error`} className="field-error">
      {message}
    </p>
  ) : null;
}

export function EnquiryForm({ locale, copy }: { locale: Locale; copy: CommonCopy }) {
  const content = copy.form;
  const profileSelection = useSyncExternalStore(
    subscribeProfileSelection,
    getProfileSelection,
    getServerProfileSelection,
  );
  const selectionToken = `${profileSelection.revision}:${profileSelection.profile ?? ""}`;
  const [manualProfile, setManualProfile] = useState<{
    token: string;
    value: ClientType | "";
  } | null>(null);
  // A manual choice survives ordinary renders and section links. A deliberate
  // profile CTA or history traversal creates a new token and reapplies the URL.
  const clientType = manualProfile?.token === selectionToken
    ? manualProfile.value
    : clientTypeForProfile(profileSelection.profile);
  const [status, setStatus] = useState<FormStatus>({
    kind: "idle",
    message: "",
  });
  const [fieldErrors, setFieldErrors] = useState<EnquiryErrors>({});
  const statusRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const clientTypeRef = useRef<HTMLSelectElement>(null);
  const submittingRef = useRef(false);

  useEffect(() => {
    if (profileSelection.source !== "cta" || submittingRef.current) return;
    const frame = requestAnimationFrame(() => {
      const control = nameRef.current?.value ? clientTypeRef.current : nameRef.current;
      control?.focus({ preventScroll: true });
    });
    return () => cancelAnimationFrame(frame);
  }, [profileSelection.revision, profileSelection.source]);

  function validationProps(field: EnquiryField, hint?: string) {
    const error = field === "clientType" && clientType ? undefined : fieldErrors[field];
    return {
      "aria-invalid": error ? true : undefined,
      "aria-describedby": [hint, error ? `${field}-error` : undefined]
        .filter(Boolean).join(" ") || undefined,
      onChange: () =>
        setFieldErrors((previous) => {
          if (!previous[field]) return previous;
          const next = { ...previous };
          delete next[field];
          return next;
        }),
    };
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submittingRef.current) return;
    const form = event.currentTarget;
    const data = new FormData(form);
    const input = {
      fullName: data.get("fullName"),
      email: data.get("email"),
      clientType: data.get("clientType"),
      company: data.get("company"),
      projectType: data.get("projectType"),
      location: data.get("location"),
      message: data.get("message"),
      privacy: data.get("privacy") === "on",
      website: data.get("website"),
      locale,
    };
    let firstInvalidField: string | undefined;

    function focusResult(errors: EnquiryErrors = {}) {
      firstInvalidField = Object.keys(errors).find(
        (field) => field !== "website" && field !== "locale",
      );
      requestAnimationFrame(() => {
        const invalidControl = firstInvalidField
          ? form.elements.namedItem(firstInvalidField)
          : null;
        if (invalidControl instanceof HTMLElement) invalidControl.focus();
        else statusRef.current?.focus();
      });
    }

    const validation = validateEnquiry(input, copy.validation);
    if (!validation.success) {
      setFieldErrors(validation.errors);
      setStatus({ kind: "error", message: validation.errors.website || copy.api.validation });
      focusResult(validation.errors);
      return;
    }

    submittingRef.current = true;
    setFieldErrors({});
    setStatus({ kind: "sending", message: content.sendingStatus });

    try {
      const response = await fetch("/api/v1/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json", "X-BMYGYM-Locale": locale },
        body: JSON.stringify(input),
        signal: AbortSignal.timeout(20000),
      });
      const result: EnquiryResponse = await response.json();

      if (!response.ok || result.success !== true) {
        const errors = result.error?.fields ?? {};
        setFieldErrors(errors);
        firstInvalidField = Object.keys(errors).find(
          (field) => field !== "website" && field !== "locale",
        );
        setStatus({
          kind: "error",
          message:
            errors.website ||
            result.message ||
            copy.api.delivery,
        });
        return;
      }

      setStatus({
        kind: "success",
        message:
          result.message ||
          copy.api.success,
      });
      form.reset();
      // Reset to the profile expressed by the current URL, just as a new visit
      // would; the remaining fields are cleared only after confirmed success.
      setManualProfile(null);
    } catch {
      setStatus({
        kind: "error",
        message: copy.api.delivery,
      });
    } finally {
      submittingRef.current = false;
      requestAnimationFrame(() => {
        const invalidControl = firstInvalidField
          ? form.elements.namedItem(firstInvalidField)
          : null;
        if (invalidControl instanceof HTMLElement) invalidControl.focus();
        else statusRef.current?.focus();
      });
    }
  }

  return (
    <form
      className="enquiry-form"
      action="/api/v1/contact"
      method="post"
      noValidate
      onSubmit={handleSubmit}
      aria-label={content.label}
      aria-busy={status.kind === "sending"}
    >
      <p className="form-required-note">{content.required}</p>
      <fieldset disabled={status.kind === "sending"}>
        <legend className="sr-only">{content.legend}</legend>
        <div className="form-row">
          <div className="form-field">
            <label htmlFor="fullName">
              {content.fullName} <span>*</span>
            </label>
            <input
              id="fullName"
              ref={nameRef}
              name="fullName"
              autoComplete="name"
              placeholder={content.namePlaceholder}
              required
              minLength={2}
              maxLength={120}
              {...validationProps("fullName")}
            />
            <FieldError field="fullName" message={fieldErrors.fullName} />
          </div>
          <div className="form-field">
            <label htmlFor="email">
              {content.email} <span>*</span>
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder={content.emailPlaceholder}
              required
              maxLength={254}
              {...validationProps("email")}
            />
            <FieldError field="email" message={fieldErrors.email} />
          </div>
        </div>
        <div className="form-row">
          <div className="form-field">
            <label htmlFor="clientType">
              {content.clientType} <span>*</span>
            </label>
            <select
              id="clientType"
              ref={clientTypeRef}
              name="clientType"
              required
              value={clientType}
              {...validationProps("clientType")}
              onChange={(event) => {
                setManualProfile({
                  token: selectionToken,
                  value: event.currentTarget.value as ClientType | "",
                });
                validationProps("clientType").onChange();
              }}
            >
              <option value="" disabled>{content.clientPlaceholder}</option>
              {CLIENT_TYPES.map((type, index) => (
                <option key={type} value={type}>{content.clientOptions[index]}</option>
              ))}
            </select>
            <FieldError field="clientType" message={clientType ? undefined : fieldErrors.clientType} />
          </div>
          <div className="form-field">
            <label htmlFor="company">
              {content.company}{" "}
              <span className="optional">{content.optional}</span>
            </label>
            <input
              id="company"
              name="company"
              autoComplete="organization"
              placeholder={content.companyPlaceholder}
              maxLength={160}
              {...validationProps("company")}
            />
            <FieldError field="company" message={fieldErrors.company} />
          </div>
        </div>
        <div className="form-row">
          <div className="form-field">
            <label htmlFor="projectType">
              {content.projectType} <span>*</span>
            </label>
            <select
              id="projectType"
              name="projectType"
              required
              defaultValue=""
              {...validationProps("projectType")}
            >
              <option value="" disabled>
                {content.projectPlaceholder}
              </option>
              {PROJECT_TYPES.map((type, index) => (
                <option key={type} value={type}>
                  {content.projectOptions[index]}
                </option>
              ))}
            </select>
            <FieldError field="projectType" message={fieldErrors.projectType} />
          </div>
          <div className="form-field">
            <label htmlFor="location">
              {content.location} <span className="optional">{content.optional}</span>
            </label>
            <input
              id="location"
              name="location"
              placeholder={content.locationPlaceholder}
              maxLength={160}
              {...validationProps("location")}
            />
            <FieldError field="location" message={fieldErrors.location} />
          </div>
        </div>
        <div className="form-field">
          <label htmlFor="message">
            {content.message} <span>*</span>
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            placeholder={content.messagePlaceholder}
            required
            minLength={20}
            maxLength={5000}
            {...validationProps("message", "message-hint")}
          />
          <p id="message-hint" className="form-hint">{content.messageHint}</p>
          <FieldError field="message" message={fieldErrors.message} />
        </div>
        <div className="honeypot" aria-hidden="true">
          <label htmlFor="website">{content.honeypot}</label>
          <input id="website" name="website" tabIndex={-1} autoComplete="off" />
        </div>
        <label className="privacy-check">
          <input
            id="privacy"
            type="checkbox"
            name="privacy"
            required
            {...validationProps("privacy")}
          />
          <span>
            {content.privacyBefore}{" "}
            <Link href={localePath(locale, "/privacy")} target="_blank" rel="noopener">
              {content.privacyLink}
            </Link>{" "}
            {content.privacyAfter} *
          </span>
        </label>
        <FieldError field="privacy" message={fieldErrors.privacy} />
        <button
          className="button button-dark submit-button"
          type="submit"
          disabled={status.kind === "sending"}
        >
          {status.kind === "sending"
            ? content.sending
            : content.submit}
          <Arrow diagonal />
        </button>
      </fieldset>
      <div
        ref={statusRef}
        className={`form-status ${status.kind}`}
        role="status"
        aria-live="polite"
        tabIndex={-1}
      >
        {status.message}
        {status.kind === "error" && (
          <a href="mailto:hello@bmygym.com">
            {content.emailFallback}
            <Arrow diagonal />
          </a>
        )}
      </div>
      <noscript>
        <p>{content.noScript}</p>
      </noscript>
    </form>
  );
}
