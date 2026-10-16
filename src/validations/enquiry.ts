export const PROJECT_TYPES = [
  "Private Residence",
  "Superyacht / Yacht",
  "Luxury Hospitality",
  "Private Aviation",
  "Other Bespoke Project",
] as const;

export type ProjectType = (typeof PROJECT_TYPES)[number];

export type Enquiry = {
  fullName: string;
  email: string;
  projectType: ProjectType;
  message: string;
  privacy: true;
  company?: string;
  location?: string;
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

export function validateEnquiry(input: unknown): EnquiryValidation {
  if (typeof input !== "object" || input === null || Array.isArray(input)) {
    return {
      success: false,
      errors: { message: "Please complete the enquiry form." },
    };
  }

  const values = input as Record<string, unknown>;
  const errors: EnquiryErrors = {};
  const text = (field: EnquiryField): string =>
    typeof values[field] === "string" ? values[field].trim() : "";

  const fullName = text("fullName");
  const email = text("email");
  const projectType = text("projectType");
  const message = text("message");
  const company = text("company");
  const location = text("location");

  if (
    fullName.length < 2 ||
    fullName.length > 120 ||
    hasControlCharacter(fullName)
  ) {
    errors.fullName = "Please enter your name (2–120 characters).";
  }
  if (!isEmailAddress(email)) {
    errors.email = "Please enter a valid email address.";
  }
  if (!PROJECT_TYPES.some((type) => type === projectType)) {
    errors.projectType = "Please select a project type.";
  }
  if (
    message.length < 20 ||
    message.length > 5000 ||
    message.includes("\u0000")
  ) {
    errors.message =
      "Please tell us about your project in 20–5,000 characters.";
  }
  if (values.privacy !== true) {
    errors.privacy = "Please agree to the privacy notice to send your enquiry.";
  }

  for (const field of ["company", "location"] as const) {
    if (
      (values[field] !== undefined && typeof values[field] !== "string") ||
      text(field).length > 160 ||
      hasControlCharacter(text(field))
    ) {
      errors[field] = "Please use no more than 160 characters.";
    }
  }

  // This hidden field is never needed by visitors; reject automated submissions.
  if (values.website !== undefined && values.website !== "") {
    errors.website =
      "Unable to process this enquiry. Please contact hello@bmygym.com.";
  }

  if (Object.keys(errors).length > 0) return { success: false, errors };

  return {
    success: true,
    data: {
      fullName,
      email,
      projectType: projectType as ProjectType,
      message,
      privacy: true,
      ...(company ? { company } : {}),
      ...(location ? { location } : {}),
    },
  };
}
