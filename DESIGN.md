---
name: BMYGYM
description: An architectural portfolio for bespoke longevity environments.
colors:
  paper: "#f6f3ed"
  ink: "#302e29"
  muted: "#6d685f"
  line: "#d8d2c7"
  sand: "#e9e3d8"
  stone-ink: "#625b50"
  accent: "#796a54"
  vision-surface: "#30312b"
  vision-ink: "#f5f0e6"
  vision-muted: "#c9c8bc"
  placeholder: "#756e63"
  error: "#8a382a"
  success: "#34563a"
  focus: "#8a6f49"
  input-focus: "#9a8666"
  header-surface: "#e3ded5"
  header-button: "#221e1c"
typography:
  display:
    fontFamily: "Bodoni Moda, BMYGYM Cyrillic Serif, Georgia, serif"
    fontSize: "clamp(3.25rem, 5.4vw, 5.5rem)"
    fontWeight: 400
    lineHeight: 1.08
    letterSpacing: "-0.035em"
  headline:
    fontFamily: "Bodoni Moda, BMYGYM Cyrillic Serif, Georgia, serif"
    fontSize: "clamp(2.75rem, 4.1vw, 4.25rem)"
    fontWeight: 400
    lineHeight: 1.12
    letterSpacing: "-0.035em"
  title:
    fontFamily: "Bodoni Moda, BMYGYM Cyrillic Serif, Georgia, serif"
    fontSize: "clamp(2rem, 2.8vw, 2.5rem)"
    fontWeight: 400
    lineHeight: 1.14
    letterSpacing: "-0.025em"
  body:
    fontFamily: "Manrope, BMYGYM Cyrillic Sans, Arial, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.75
  label:
    fontFamily: "Manrope, BMYGYM Cyrillic Sans, Arial, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 500
    lineHeight: 1.6
    letterSpacing: "0.14em"
  action:
    fontFamily: "Manrope, BMYGYM Cyrillic Sans, Arial, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 600
    lineHeight: 1.6
    letterSpacing: "0.1em"
rounded:
  square: "0"
spacing:
  page-gutter: "clamp(24px, 5.4vw, 96px)"
  section-block: "clamp(88px, 8.5vw, 148px)"
  field-gap: "10px"
  field-bottom: "30px"
  form-columns: "26px"
components:
  button-dark:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    typography: "{typography.action}"
    rounded: "{rounded.square}"
    padding: "17px 26px"
  button-ivory:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    typography: "{typography.action}"
    rounded: "{rounded.square}"
    padding: "17px 26px"
  header-enquiry:
    backgroundColor: "{colors.header-button}"
    textColor: "{colors.paper}"
    rounded: "{rounded.square}"
    padding: "0 24px"
  text-link:
    textColor: "{colors.ink}"
    padding: "10px 0"
  text-field:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.square}"
    padding: "9px 0 13px"
---

# Design System: BMYGYM

Updated 20 October 2026 for the five-language commercial presentation and supplied AERO ONE image. This records the repository design, not deployment or completed runtime verification.

## Overview

**Creative North Star: "The Architectural Portfolio"**

An architectural portfolio for a creator and integrator of bespoke longevity environments, shaped for private clients and professional partners. Warm ivory, pale stone, fine serif headings and generous space frame complete environments. The user-confirmed direction is discreet luxury with photography as the protagonist. The presentation is quiet, editorial and personal; imagery leads and interface furniture stays restrained. The opening makes BMYGYM's creative and integrative role explicit, and the editorial introduction addresses the two client profiles within one site.

Bodoni Moda carries the Latin expressive voice; Cormorant Garamond supplies Cyrillic serif characters in Russian. Manrope carries navigation, explanations and forms in Latin and Cyrillic. Flat surfaces, hairline rules and a limited dark section create depth without ornamental effects. The existing architectural direction remains the visual foundation.

Source of truth: `src/app/globals.css`, `src/app/[locale]/layout.tsx`, and the implemented components. Durable positioning lives in `PRODUCT.md`; the home page sequence and first-viewport composition live in `docs/home-brief.md`; language routes, glossary and review provenance live in `docs/i18n.md`. This document records the built system.

**Key Characteristics:**

- Architecture and complete environments lead the imagery.
- Warm ivory and sand, with restrained taupe accents.
- Fine serif headlines, readable supporting text and generous section space.
- A concise photographic opening followed by a separate editorial introduction.
- A discreet language selector and fully localised content in English, German, French, Spanish and Russian.
- Clear private-client and professional-partner profiles, with a formal paid Blueprint commission.
- Three generous Land, Sea and Air chapters, alternating image and copy on desktop.
- Square controls, thin dividers and subtle accessible motion.

## Colors

The palette resembles warm paper, pale stone and muted metal.

- **Primary — accent:** restrained taupe for contextual captions, fine links and editorial emphasis. Headings carry their hierarchy without redundant eyebrows above them.
- **Neutral — paper / sand:** ivory `#f6f3ed` is the default page surface; stone `#e9e3d8` distinguishes the paid Blueprint section, footer and image loading surfaces.
- **Header — header-surface / header-button:** the full-width navigation band is beige (`#e3ded5`), with a solid dark enquiry action (`#221e1c`).
- **Neutral — ink / muted / line:** ink carries primary text; muted supports reading copy and captions; line separates sections and controls.
- **Dark section — vision-surface / vision-ink / vision-muted:** the design vision section uses a warm charcoal field, pale headings and subdued supporting copy.
- **Functional — placeholder / error / success / focus / input-focus:** retain the implemented contrast for empty inputs, validation, submission results and keyboard focus. Error and success messages always include text.

The AIR image supplied by the user extends the warm palette through a cream leather AERO ONE chair, dark timber and restrained metallic details inside a private aircraft. The transformable chair and its extended leg support lead the composition. It represents a recovery and longevity concept in development, neither certified nor commercially available. Its development and integration remain subject to aircraft-specific technical feasibility, safety and aeronautical certification requirements. Hero image shading is an image-legibility treatment. The `stone-ink` tone carries secondary text on stone surfaces and the Blueprint commission caption; the footer scopes its muted text to this darker tone. Required-field markers use the accent tone.

## Typography

Latin Bodoni Moda normal/italic and Manrope variable faces are local WOFF2 assets loaded with `next/font/local` and `display: swap`. Russian uses a local Manrope Cyrillic variable face for sans-serif text. Bodoni Moda lacks Cyrillic coverage, so local Cormorant Garamond normal and italic faces supply the `BMYGYM Cyrillic Serif` fallback at weight 400. Supplemental Cyrillic faces use `@font-face`, `font-display: swap` and `unicode-range`; fonts are not requested from Google at runtime. Keep Georgia and Arial as final fallbacks. Official source and SIL Open Font License provenance are recorded in `docs/asset-manifest.md`, including `public/fonts/Cormorant-Garamond-OFL.txt`.

The frontmatter records global defaults. Headings use balanced wrapping and normal weight; italic serif phrases add editorial emphasis. Font sizes use `rem` so the reading scale follows the browser's base font preference. The typographic BMYGYM wordmark is not supplied final logo artwork.

| Role | Implemented scale |
| --- | --- |
| Reading copy and form controls | `--text-body: 1.125rem` (18px at the default 16px root), becoming `1.0625rem` (17px) below 768px. Body and secondary introduction copy use 1.75 line height; environment copy uses 1.8 and individual editorial passages retain up to 1.9. |
| Labels, actions, captions, notes and legal navigation | `--text-small: 0.875rem` (14px) across desktop and mobile. This is the floor for visible auxiliary text; narrow screens reflow it instead of reducing its size. Retained contextual labels use restrained uppercase tracking; buttons use 0.1em. |
| Form labels and privacy consent | `1rem` (16px), with optional-field notes and error text at the auxiliary size. |
| Headings | Bodoni Moda, with the Cyrillic Cormorant Garamond fallback, retains the editorial hierarchy; global h2 spans 44–68px with 1.12 line height and global h3 spans 32–40px at the default root. Environment chapter titles span 48–72px and become 52px on mobile. Individual section headings vary within the same serif system. |
| Editorial introduction | The first paragraph below the hero uses Bodoni Moda at `clamp(1.625rem, 2.1vw, 2rem)` (26–32px), 1.5 line height and a 37ch maximum measure. Its supporting paragraph stays at the reading scale. The philosophy lead is 22px on desktop and 20px on mobile. |

The hero display uses `clamp(3.25rem, 5.4vw, 5.5rem)` (52–88px) with 1.08 line height. Below 1440px it uses `clamp(3.5rem, 5.4vw, 4.25rem)` (56–68px), below 1024px it is `3.75rem` (60px), and below 768px the multilingual override uses `clamp(2.5rem, 9.5vw, 3.5rem)` (40–56px) with a 1.13 line height. Headlines, buttons and text links allow long translated words to wrap within their containers. Reading widths commonly use 40–54ch; environment copy is capped at 48ch.

## Layout

The editorial container is centered with a maximum width of 1680px and fluid gutters. General vertical section spacing is `--section-space: clamp(88px, 8.5vw, 148px)`; individual features tune that rhythm. Desktop compositions pair image and copy, give each environment its own full-width chapter, and retain an asymmetric two-image vision grid. Imagery is cropped within explicit aspect ratios with `object-fit: cover`; preserve each existing crop when replacing assets.

The introduction below the hero has `1.3fr 1fr` columns, an adjustable 60–140px gap and 88px vertical padding. A separate “Two Ways to Work With Us” section follows: one section heading and two open editorial blocks, each with a 3:2 image, an h3, short description and enquiry button. Equal columns use a 32–72px fluid gap; buttons align at the bottom without fixed text heights. Below 768px the blocks stack with a 48px gap. There are no card borders, shadows or extra badges. The current category images reuse existing concepts provisionally because the requested reference attachments have not arrived. Land and Air use image / copy columns of `1.15fr 0.85fr`; Sea reverses them at widths of at least 768px. Each chapter has a 48–112px column gap, with 100px between chapters on desktop. All three images use `ConceptImage`; Land and Sea use the existing responsive crops, while AIR uses a 3:2 aspect ratio to retain the supplied chair composition. The Blueprint has 120px vertical padding and a single hairline division between its introduction and paid-service scope. The Vision surface uses `#30312b`, a `1.35fr 1fr` image grid, a 64px gap and a 112px offset on the capsule column. The enquiry form has a fine vertical division on desktop and a horizontal division when stacked.

| Query | Implemented change |
| --- | --- |
| min-width 1700px | Hero copy aligns with the centered 1680px content field. |
| max-width 1439px | Desktop navigation becomes a disclosure; environment chapter gaps become 80px and existing image crops tighten. The header's JavaScript media query returns to desktop navigation at 1440px. AIR retains its 3:2 ratio. |
| max-width 1023px | Header remains 79px, gutters are 36px and general section rhythm is 88px; form rows become single-column. Environment columns retain their alternating composition, with a 36px column gap, 76px chapter gap and 0.78 image aspect ratio for Land and Sea. The hero's bottom strip becomes a two-column grid with its caption on a separate row. |
| max-width 767px | Header is 72px, gutters are 24px, body copy becomes 17px and general section rhythm is 72px. The introduction and client profiles stack. Every environment follows image then copy, with 26px between them, 64px between chapters and a 1.02 image aspect ratio for Land and Sea; AIR retains 3:2. The hero's context strip becomes one column and its text wraps. Other main grids and footer content stack; form submit spans the width and Cookie Settings flows inline at full width. |
| max-width 600px | The separate header enquiry button is hidden. Enquiry remains available in the mobile navigation and the hero; the language selector remains visible. |
| max-width 359px | Gutters are 18px and wordmark / hero headings compress for narrow screens; auxiliary text keeps its 14px floor. |

The philosophy image and its caption stay in normal flow at every breakpoint, reserving their full height before the motto row so scrolling cannot overlap the text. The desktop and tablet header is 79px tall and sticky, with a centered inner width of at most 1280px. Anchor scrolling reserves its height plus 20px. The full-bleed hero includes the headline, service description, explicit creator-and-integrator positioning and primary enquiry action over the photography; longer explanatory paragraphs sit in the following ivory introduction. Its desktop minimum height is `clamp(680px, calc(100svh - var(--header-height)), 920px)`, becoming 720px below 1024px, 680px below 768px and 700px below 360px. Content may grow beyond these minimums. The hero copy reserves 140px beneath it on desktop and 190px below 768px for the context strip. The mobile image source requests 1200px to support the tall crop. Localised concept captions remain visible at narrow widths, including the AIR caption identifying AERO ONE as a concept visualisation.

## Elevation & Depth

The implemented system has no card shadows. Depth comes from tonal sections, photography and hairline boundaries. The sticky header uses a solid beige surface. Desktop Cookie Settings is a bordered 280px disclosure panel above its trigger; below 768px it participates in document flow so it cannot overflow the viewport.

Motion is small and purposeful: button and field transitions use 0.2s, navigation underlines 0.25s, and environment-image hover scale is 1.035 over 0.7s. Action arrows move 4px horizontally over 0.3s on hover. The hero arrives once over 1.1s with a 14px upward settle from an already-visible 0.6 opacity. Image, arrow and hero easing is `cubic-bezier(0.16, 1, 0.3, 1)`. Reduced-motion preference removes animations and transitions and disables smooth scrolling.

## Shapes

Buttons, input fields, image frames and section panels are square. Fine one-pixel lines establish structure. Thin inline SVG arrows mark direction. The oval aircraft windows belong to the Air concept image; they do not establish a rounded control system.

## Components

- **Buttons:** dark on pale surfaces and ivory over the hero. Minimum height is 58px, becoming 56px on mobile. Text is 14px with enough room to wrap inside the available width. Desktop padding is 17px by 26px; mobile horizontal padding is 16px. Hover fills are `#514b41` and `#e4dccc` respectively. Sending disables the submit control and fieldset; button opacity becomes 0.65.
- **Header:** the BMYGYM serif wordmark has no tagline and uses 1.3125rem (21px) type with 0.3em tracking; below 768px it becomes 1.25rem (20px) / 0.22em and below 360px 1.125rem (18px) / 0.18em. Desktop navigation uses uppercase 14px type with 0.08em tracking and 20px gaps. Below 1440px the disclosure menu uses 2rem (32px) serif links.
- **Header enquiry:** a solid dark action with pale text and no arrow sits alongside the selector where space permits. At desktop widths of 1440px and above it has content-dependent width, 18px horizontal padding and 0.08em tracking. Below 1440px its minimum width is 176px; below 768px it is 7rem wide with a 44px minimum height and a wrapping label. At 600px and below it is hidden, while the menu and hero preserve enquiry access. It uses a `#403a33` hover fill. Mobile navigation closes on selection, outside pointer, Escape, or returning to desktop width; Escape restores focus to its trigger.
- **Language selector:** a compact uppercase code such as `EN` and a fine chevron open a restrained 190px ivory disclosure listing English, Deutsch, Français, Español and Русский. The trigger and each language link have at least a 44px target height. Current-language indication, localised accessible naming, keyboard support, Escape focus restoration and outside-pointer dismissal belong to the component. Native language names remain legible; flags are not used.
- **Text links:** uppercase 14px type with 0.08em tracking, a thin taupe underline and an inline arrow. A 44px minimum height provides a larger interaction area than the label alone; maximum width follows the container.
- **Inputs:** visible localised 16px labels above transparent, underline-only fields; input text follows the 17–18px reading scale. Client profile distinguishes private clients and professional partners; project type covers residence, yacht, hospitality, private aviation and other bespoke work. Optional company and location fields support project context. Focus changes the border to ink and adds a 2px input-focus outline with 4px offset. Invalid fields have a red border and associated translated text. General interactive focus uses a 2px focus outline with 5px offset.
- **Enquiry feedback:** keep idle, sending, error and success states distinct. The form exposes busy status, announces results politely, focuses the first server-invalid field or status, and retains values on failure. Errors provide an email fallback. Success follows confirmed API success; it must never be simulated for presentation.
- **Concept imagery:** `ConceptImage` accepts source, alternative text, optional class, caption and sizes. The visible captions and alternatives are localised. AIR uses the supplied `/images/aero-one-private-aviation.webp` (1536 × 1024, 287,132 bytes), showing the transformable recovery and longevity chair in a private aircraft. Its English caption is “BMYGYM AERO ONE · Concept visualisation.” Adjacent copy explicitly states development status, lack of certification and commercial availability, and applicable feasibility, safety and certification requirements.
- **Environment chapters:** image and `.environment-copy` are sibling elements within each article. All three chapter titles link to the enquiry with a consistent inline arrow; all three concept images are also links with descriptive accessible names. Desktop image requests use `55vw`, changing to `100vw` below 768px. Preserve the aviation disclosure and its technical-feasibility and certification qualification.
- **Editorial disclosures:** native `details` / `summary`, a hairline boundary and an arrow rotating 90 degrees when open. Keep supporting descriptions in the reading flow.
- **Footer and legal pages:** restrained localised links and reusable typography. Footer navigation and notes use 14px, while contact details follow the reading scale; footer groups wrap and stack on mobile. Legal copy uses the reading scale within a 1040px maximum page width. Legal pages preserve the selected locale. Legal draft notices use sand; factual and approval requirements remain explicit in all languages.

## Do's and Don'ts

### Do:

- Do use supplied concept imagery with localised visible concept captions and meaningful alternatives, including the new AERO ONE chair image.
- Do preserve the locally hosted Bodoni Moda / Manrope pairing, the Cyrillic Cormorant Garamond fallback and the warm neutral palette.
- Do keep Land, Sea and Air equally legible, with shared component treatment, the appropriate AIR crop and an explicit concept caption and status for AERO ONE.
- Do preserve the creator-and-integrator positioning, both client profiles and the formal paid Blueprint terms in every language.
- Do preserve keyboard focus, labelled fields, reduced motion and honest enquiry feedback.
- Do treat the text wordmark as provisional typography until final logo artwork is supplied.

### Don't:

- Don't turn the design house into an equipment catalogue or add prices and product purchase cards.
- Don't present concepts as completed projects, certified products or available production equipment.
- Don't invent a production logo, client testimonials or business credentials, or present aviation concept imagery as a real or certified installation.
- Don't add the new complete-environment visualisation or immersive tour in this phase; both remain future work requested by the user.
- Don't add floating card shadows, pill controls, loud gradients or ornamental interface density.
