"use client";

import Link from "next/link";
import { useRef, useState, type FormEvent } from "react";
import { Arrow } from "@/components/ui/arrow";
import {
  PROJECT_TYPES,
  type EnquiryErrors,
  type EnquiryField,
} from "@/validations/enquiry";

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

export function EnquiryForm() {
  const [status, setStatus] = useState<FormStatus>({
    kind: "idle",
    message: "",
  });
  const [fieldErrors, setFieldErrors] = useState<EnquiryErrors>({});
  const statusRef = useRef<HTMLDivElement>(null);
  const submittingRef = useRef(false);

  function validationProps(field: EnquiryField) {
    return {
      "aria-invalid": fieldErrors[field] ? true : undefined,
      "aria-describedby": fieldErrors[field] ? `${field}-error` : undefined,
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
    submittingRef.current = true;
    const form = event.currentTarget;
    const data = new FormData(form);
    let firstInvalidField: string | undefined;
    setFieldErrors({});
    setStatus({ kind: "sending", message: "Sending your private enquiry…" });

    try {
      const response = await fetch("/api/v1/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: data.get("fullName"),
          email: data.get("email"),
          company: data.get("company"),
          projectType: data.get("projectType"),
          location: data.get("location"),
          message: data.get("message"),
          privacy: data.get("privacy") === "on",
          website: data.get("website"),
        }),
        signal: AbortSignal.timeout(20000),
      });
      const result: EnquiryResponse = await response.json();

      if (!response.ok || result.success !== true) {
        const errors = result.error?.fields ?? {};
        setFieldErrors(errors);
        firstInvalidField = Object.keys(errors).find(
          (field) => field !== "website",
        );
        setStatus({
          kind: "error",
          message:
            errors.website ||
            result.message ||
            "Your enquiry could not be sent. Please try again or email hello@bmygym.com.",
        });
        return;
      }

      setStatus({
        kind: "success",
        message:
          result.message ||
          "Thank you for your enquiry. Your message has been received. We look forward to exploring your vision.",
      });
      form.reset();
    } catch {
      setStatus({
        kind: "error",
        message:
          "We couldn’t confirm delivery. Please try again or contact hello@bmygym.com directly.",
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
      onSubmit={handleSubmit}
      aria-label="Private project enquiry"
      aria-busy={status.kind === "sending"}
    >
      <p className="form-required-note">Fields marked * are required.</p>
      <fieldset disabled={status.kind === "sending"}>
        <legend className="sr-only">Your contact and project details</legend>
        <div className="form-row">
          <div className="form-field">
            <label htmlFor="fullName">
              Full name <span>*</span>
            </label>
            <input
              id="fullName"
              name="fullName"
              autoComplete="name"
              placeholder="Your full name"
              required
              minLength={2}
              maxLength={120}
              {...validationProps("fullName")}
            />
            <FieldError field="fullName" message={fieldErrors.fullName} />
          </div>
          <div className="form-field">
            <label htmlFor="email">
              Email address <span>*</span>
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              required
              maxLength={254}
              {...validationProps("email")}
            />
            <FieldError field="email" message={fieldErrors.email} />
          </div>
        </div>
        <div className="form-row">
          <div className="form-field">
            <label htmlFor="company">
              Company / Organisation{" "}
              <span className="optional">(optional)</span>
            </label>
            <input
              id="company"
              name="company"
              autoComplete="organization"
              placeholder="Company or organisation"
              maxLength={160}
              {...validationProps("company")}
            />
            <FieldError field="company" message={fieldErrors.company} />
          </div>
          <div className="form-field">
            <label htmlFor="projectType">
              Project type <span>*</span>
            </label>
            <select
              id="projectType"
              name="projectType"
              required
              defaultValue=""
              {...validationProps("projectType")}
            >
              <option value="" disabled>
                Select your project
              </option>
              {PROJECT_TYPES.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
            <FieldError field="projectType" message={fieldErrors.projectType} />
          </div>
        </div>
        <div className="form-field">
          <label htmlFor="location">
            Project location <span className="optional">(optional)</span>
          </label>
          <input
            id="location"
            name="location"
            placeholder="City, country or destination"
            maxLength={160}
            {...validationProps("location")}
          />
          <FieldError field="location" message={fieldErrors.location} />
        </div>
        <div className="form-field">
          <label htmlFor="message">
            Tell us about your project <span>*</span>
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            placeholder="Your space, your vision, and what you wish to create…"
            required
            minLength={20}
            maxLength={5000}
            {...validationProps("message")}
          />
          <FieldError field="message" message={fieldErrors.message} />
        </div>
        <div className="honeypot" aria-hidden="true">
          <label htmlFor="website">Leave this field empty</label>
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
            I have read the{" "}
            <Link href="/privacy" target="_blank" rel="noopener">
              Privacy Policy (opens in a new tab)
            </Link>{" "}
            and acknowledge the processing of my information to respond to this
            enquiry. *
          </span>
        </label>
        <FieldError field="privacy" message={fieldErrors.privacy} />
        <button
          className="button button-dark submit-button"
          type="submit"
          disabled={status.kind === "sending"}
        >
          {status.kind === "sending"
            ? "Sending enquiry…"
            : "Submit private enquiry"}
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
            Email hello@bmygym.com
            <Arrow diagonal />
          </a>
        )}
      </div>
      <noscript>
        <p>
          To send an enquiry without JavaScript, please email{" "}
          <a href="mailto:hello@bmygym.com">hello@bmygym.com</a>.
        </p>
      </noscript>
    </form>
  );
}
