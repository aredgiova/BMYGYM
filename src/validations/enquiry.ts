import en from "../i18n/en-common.json" with { type: "json" };
import enBooking from "../i18n/en-booking.json" with { type: "json" };
import { isLocale, type Locale } from "../i18n/config.ts";
import type { CommonCopy } from "../i18n/types.ts";

export const CLIENT_TYPES = ["Private Client", "Professional Partner"] as const;
export type ClientType = (typeof CLIENT_TYPES)[number];

export const PROJECT_TYPES = [
  "Private Residence",
  "Luxury Hospitality",
  "Superyacht",
  "Private Aviation",
  "Professional Partnership",
] as const;

export type ProjectType = (typeof PROJECT_TYPES)[number];
export const PROJECT_STAGES = ["Concept", "Planning", "Development", "Refit", "Other"] as const;
export type ProjectStage = (typeof PROJECT_STAGES)[number];
export const ENQUIRY_INTENTS = ["private-commission", "retreat", "private-consultation"] as const;
export type EnquiryIntent = (typeof ENQUIRY_INTENTS)[number];

export type Enquiry = {
  fullName: string;
  email: string;
  intent: EnquiryIntent;
  clientType?: ClientType;
  locale: Locale;
  projectType?: ProjectType;
  location?: string;
  projectStage?: ProjectStage;
  message: string;
  privacy: true;
  company?: string;
  expectedTimeline?: string;
};

export type EnquiryField = keyof Enquiry | "website";
export type EnquiryErrors = Partial<Record<EnquiryField, string>>;

export type EnquiryValidation =
  { success: true; data: Enquiry } | { success: false; errors: EnquiryErrors };

function hasControlCharacter(value: string): boolean {
  return Array.from(value).some((character) => {
    const code = character.charCodeAt(0);
    return code < 32 || code === 127;
  });
}

export function isEmailAddress(value: string): boolean {
  return (
    value.length <= 254 &&
    /^[^\s<>@,;]+@[^\s<>@,;]+\.[^\s<>@,;]+$/.test(value) &&
    !hasControlCharacter(value)
  );
}

export function validateEnquiry(
  input: unknown,
  messages: CommonCopy["validation"] = en.validation,
  intentMessage: string = enBooking.validationIntent,
): EnquiryValidation {
  if (typeof input !== "object" || input === null || Array.isArray(input)) {
    return {
      success: false,
      errors: { message: messages.message },
    };
  }

  const values = input as Record<string, unknown>;
  const errors: EnquiryErrors = {};
  const text = (field: EnquiryField): string =>
    typeof values[field] === "string" ? values[field].trim() : "";

  const fullName = text("fullName");
  const email = text("email");
  const intent = values.intent === undefined ? "private-commission" : text("intent");
  const locale = values.locale === undefined ? "en" : values.locale;
  const projectType = text("projectType");
  const projectStage = text("projectStage");
  const message = text("message");
  const company = text("company");
  const location = text("location");
  const expectedTimeline = text("expectedTimeline");

  if (
    fullName.length < 2 ||
    fullName.length > 120 ||
    hasControlCharacter(fullName)
  ) {
    errors.fullName = messages.fullName;
  }
  if (!isEmailAddress(email)) {
    errors.email = messages.email;
  }
  if (!ENQUIRY_INTENTS.some((candidate) => candidate === intent)) {
    errors.intent = intentMessage;
  }
  if (typeof locale !== "string" || !isLocale(locale)) {
    errors.locale = messages.locale;
  }
  if (intent === "private-commission") {
    if (!PROJECT_TYPES.some((type) => type === projectType)) {
      errors.projectType = messages.projectType;
    }
    if (location.length < 2 || location.length > 160 || hasControlCharacter(location)) {
      errors.location = messages.location;
    }
    if (!PROJECT_STAGES.some((stage) => stage === projectStage)) {
      errors.projectStage = messages.projectStage;
    }
  }
  if (
    message.length < 20 ||
    message.length > 5000 ||
    message.includes("\u0000")
  ) {
    errors.message = messages.message;
  }
  if (values.privacy !== true) {
    errors.privacy = messages.privacy;
  }

  for (const field of ["company", "expectedTimeline"] as const) {
    if (
      (values[field] !== undefined && typeof values[field] !== "string") ||
      text(field).length > 160 ||
      hasControlCharacter(text(field))
    ) {
      errors[field] = messages[field];
    }
  }

  // This hidden field is never needed by visitors; reject automated submissions.
  if (values.website !== undefined && values.website !== "") {
    errors.website = messages.website;
  }

  if (Object.keys(errors).length > 0) return { success: false, errors };

  return {
    success: true,
    data: {
      fullName,
      email,
      intent: intent as EnquiryIntent,
      // The category is the single visitor-facing choice; ignore any supplied
      // legacy profile so mail notifications cannot contain conflicting values.
      locale: locale as Locale,
      ...(intent === "private-commission" ? {
        clientType: (projectType === "Professional Partnership" ? "Professional Partner" : "Private Client") as ClientType,
        projectType: projectType as ProjectType,
        location,
        projectStage: projectStage as ProjectStage,
        ...(company ? { company } : {}),
      } : {}),
      message,
      privacy: true,
      ...(expectedTimeline ? { expectedTimeline } : {}),
    },
  };
}
