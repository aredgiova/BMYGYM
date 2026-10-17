---
name: BMYGYM
description: An architectural portfolio for bespoke longevity environments.
colors:
  paper: "#f7f5f0"
  ink: "#302e29"
  muted: "#6d685f"
  line: "#d8d2c7"
  sand: "#eae4d9"
  accent: "#796a54"
  vision-surface: "#292a25"
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
    fontFamily: "Bodoni Moda, Georgia, serif"
    fontSize: "clamp(3rem, 4.6vw, 4.5rem)"
    fontWeight: 400
    lineHeight: 1.12
    letterSpacing: "-0.035em"
  headline:
    fontFamily: "Bodoni Moda, Georgia, serif"
    fontSize: "clamp(2.5rem, 3.8vw, 3.75rem)"
    fontWeight: 400
    lineHeight: 1.14
    letterSpacing: "-0.035em"
  title:
    fontFamily: "Bodoni Moda, Georgia, serif"
    fontSize: "clamp(2rem, 2.8vw, 2.5rem)"
    fontWeight: 400
    lineHeight: 1.14
    letterSpacing: "-0.025em"
  body:
    fontFamily: "Manrope, Arial, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.75
  label:
    fontFamily: "Manrope, Arial, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 500
    lineHeight: 1.6
    letterSpacing: "0.14em"
  action:
    fontFamily: "Manrope, Arial, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 600
    lineHeight: 1.6
    letterSpacing: "0.09em"
rounded:
  square: "0"
spacing:
  page-gutter: "clamp(24px, 5.4vw, 96px)"
  section-block: "110px"
  field-gap: "8px"
  field-bottom: "24px"
  form-columns: "26px"
components:
  button-dark:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    typography: "{typography.action}"
    rounded: "{rounded.square}"
    padding: "16px 23px"
  button-ivory:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    typography: "{typography.action}"
    rounded: "{rounded.square}"
    padding: "16px 23px"
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

## Overview

**Creative North Star: "The Architectural Portfolio"**

An architectural portfolio for a bespoke longevity design house. Warm paper, sand, fine serif headings and generous space frame complete environments. The presentation is quiet, editorial and personal; imagery leads and interface furniture stays restrained.

Bodoni Moda carries the expressive voice; Manrope carries navigation, explanations and forms. Flat surfaces, hairline rules and a limited dark section create depth without ornamental effects. The user-pinned brief is the visual authority for design contract 64135187.

Source of truth: `src/app/globals.css`, `src/app/layout.tsx`, and the implemented components. Durable positioning lives in `PRODUCT.md`; the home page sequence and first-viewport composition live in `docs/home-brief.md`. This document records the built system. The hidden `data-design-contract` in the root layout records the same direction; it is not product copy or runtime configuration.

**Key Characteristics:**

- Architecture and complete environments lead the imagery.
- Warm ivory and sand, with restrained taupe accents.
- Fine serif headlines, compact tracked labels and generous section space.
- Square controls, thin dividers and subtle accessible motion.

## Colors

The palette resembles warm paper, pale stone and muted metal.

- **Primary — accent:** restrained taupe for section labels, fine links and editorial emphasis.
- **Neutral — paper / sand:** paper is the default page surface; sand distinguishes the paid Blueprint section and image loading surfaces.
- **Header — header-surface / header-button:** the full-width navigation band is beige (`#e3ded5`), with a solid dark enquiry action (`#221e1c`).
- **Neutral — ink / muted / line:** ink carries primary text; muted supports reading copy and captions; line separates sections and controls.
- **Dark section — vision-surface / vision-ink / vision-muted:** the design vision section uses a warm charcoal field, pale headings and subdued supporting copy.
- **Functional — placeholder / error / success / focus / input-focus:** retain the implemented contrast for empty inputs, validation, submission results and keyboard focus. Error and success messages always include text.

The Air reservation uses a related pale stone field (`#e9e4db`) and dark taupe type (`#716450`). These are local treatments, not a second brand palette. Hero image shading is an image-legibility treatment.

## Typography

Both families are local WOFF2 assets loaded with `next/font/local` and `display: swap`. Bodoni Moda includes normal and italic variable files; Manrope provides the sans-serif variable file. Keep Georgia and Arial as respective fallbacks.

The frontmatter records global defaults. Headings use balanced wrapping and normal weight; italic serif phrases add editorial emphasis. Font sizes use `rem` so the reading scale follows the browser's base font preference. The typographic BMYGYM wordmark is not supplied final logo artwork.

| Role | Implemented scale |
| --- | --- |
| Reading copy and form controls | `--text-body: 1.125rem` (18px at the default 16px root), becoming `1.0625rem` (17px) below 768px. Body and hero copy use 1.75 line height; individual editorial sections retain 1.85–1.9. |
| Labels, actions, captions, notes and legal navigation | `--text-small: 0.875rem` (14px) across desktop and mobile. This is the floor for visible auxiliary text; narrow screens reflow it instead of reducing its size. Section labels remain uppercase with 0.14em tracking; buttons use 0.09em. |
| Form labels and privacy consent | `1rem` (16px), with optional-field notes and error text at the auxiliary size. |
| Headings | Bodoni Moda retains its editorial hierarchy; global h2 spans 40–60px and global h3 spans 32–40px at the default root. Individual section headings vary within the same serif system. |

The hero display spans 48–72px on desktop, becomes `3.75rem` (60px) below 1200px and `3.625rem` (58px) below 1024px, then uses `clamp(2.625rem, 9.6vw, 3.5rem)` (42–56px) below 768px with a 1.17 line height. Below 360px it is `2.5rem` (40px). Reading widths commonly use 48–54ch, keeping longer text comfortable as its size grows.

## Layout

The editorial container is centered with a maximum width of 1680px and fluid gutters. General section padding is 110px vertically; individual feature sections tune this rhythm. Desktop compositions use paired image/copy columns, three environment columns, and an asymmetric two-image vision grid. Imagery is cropped within explicit aspect ratios with `object-fit: cover`; preserve each existing crop when replacing assets.

| Query | Implemented change |
| --- | --- |
| min-width 1700px | Hero copy aligns with the centered 1680px content field. |
| max-width 1199px | Desktop navigation becomes a disclosure; column gaps and image crops tighten. The header's JavaScript media query returns to desktop navigation at 1200px. |
| max-width 1023px | Header remains 79px, gutters are 36px, general section rhythm is 80px; form rows become single-column. The hero's bottom strip becomes a two-column grid with its caption on a separate row. |
| max-width 767px | Header is 72px, gutters are 24px, body copy becomes 17px and general section rhythm is 67px. Main feature grids and footer content stack; environment subtitles sit below their titles, form submit spans the width, and Cookie Settings content flows inline at full width. |
| max-width 359px | Gutters are 18px and wordmark / hero headings compress for narrow screens; auxiliary text keeps its 14px floor. |

The desktop and tablet header is 79px tall and sticky, with a centered inner width of at most 1280px. Anchor scrolling reserves its height plus 20px. The hero uses a full-bleed environment image and an image-legibility overlay, with a minimum height of 745px on mobile and 790px below 360px; its content can grow beyond that minimum. Copy reserves 140px beneath it on desktop and 160px on mobile for the bottom strip. The mobile image source requests 1200px to support the tall crop. The concept caption remains visible at narrow widths. The Air window is wider, and its internal gaps are adjusted to accommodate the larger supporting text.

## Elevation & Depth

The implemented system has no card shadows. Depth comes from tonal sections, photography and hairline boundaries. The sticky header uses a solid beige surface. Desktop Cookie Settings is a bordered 280px disclosure panel above its trigger; below 768px it participates in document flow so it cannot overflow the viewport.

Motion is small and purposeful: button and field transitions use 0.2s, navigation underlines 0.25s, and environment-image hover scale is 1.035 over 0.7s. The hero arrives once over 1.1s with a 14px upward settle. Image and hero easing is `cubic-bezier(0.16, 1, 0.3, 1)`. Reduced-motion preference removes animations and transitions and disables smooth scrolling.

## Shapes

Buttons, input fields, image frames and section panels are square. Fine one-pixel lines establish structure. Thin inline SVG arrows mark direction. The rounded aircraft-window outline in the reserved Air visual is a semantic motif; it does not establish a rounded control system.

## Components

- **Buttons:** dark on pale surfaces and ivory over the hero. Minimum height is 54px, becoming 56px on mobile. Text is 14px with enough room to wrap inside the available width. Hover fills are `#514b41` and `#e4dccc` respectively. Sending disables the submit control and fieldset; button opacity becomes 0.65.
- **Header:** the BMYGYM serif wordmark has no tagline and uses 1.3125rem (21px) type with 0.3em tracking; below 768px it becomes 1.25rem (20px) / 0.22em and below 360px 1.125rem (18px) / 0.18em. Desktop navigation uses uppercase 14px type with 0.16em tracking and 28px gaps. Below 1200px the disclosure menu uses 2rem (32px) serif links.
- **Header enquiry:** a solid dark action with pale text and no arrow remains beside desktop or mobile navigation. Desktop type is 14px with 0.12em tracking. Its desktop minimum size is 186px by 46px, narrowing to 176px below 1200px; below 768px it is 7rem wide with a 44px minimum height and a two-line label. It uses a `#403a33` hover fill. Mobile navigation closes on selection, outside pointer, Escape, or returning to desktop width; Escape restores focus to its trigger.
- **Text links:** uppercase 14px type with 0.08em tracking, a thin taupe underline and an inline arrow. A 44px minimum height provides a larger interaction area than the label alone; maximum width follows the container.
- **Inputs:** visible 16px labels above transparent, underline-only fields; input text follows the 17–18px reading scale. Focus changes the border to ink and adds a 2px input-focus outline with 4px offset. Invalid fields have a red border and associated text. General interactive focus uses a 2px focus outline with 5px offset.
- **Enquiry feedback:** keep idle, sending, error and success states distinct. The form exposes busy status, announces results politely, focuses the first server-invalid field or status, and retains values on failure. Errors provide an email fallback. Success follows confirmed API success; it must never be simulated for presentation.
- **Concept imagery:** `ConceptImage` accepts source, alternative text, optional class, caption and sizes. The default visible caption is “BMYGYM concept visualisation.” Use the supplied assets honestly; the Air reservation communicates a concept awaiting its final visual.
- **Editorial disclosures:** native `details` / `summary`, a hairline boundary and an arrow rotating 90 degrees when open. Keep supporting descriptions in the reading flow.
- **Footer and legal pages:** restrained links and reusable typography. Footer navigation and notes use 14px, while contact details follow the reading scale; footer groups wrap and stack on mobile. Legal copy uses the reading scale within a 1040px maximum page width. Legal draft notices use sand; factual and approval requirements remain explicit.

## Do's and Don'ts

### Do:

- Do use the supplied concept imagery with visible concept captions and meaningful alternatives.
- Do preserve the locally hosted Bodoni Moda / Manrope pairing and the warm neutral palette.
- Do keep Land, Sea and Air equally legible; retain the reserved aviation concept area until approved imagery exists.
- Do preserve keyboard focus, labelled fields, reduced motion and honest enquiry feedback.
- Do treat the text wordmark as provisional typography until final logo artwork is supplied.

### Don't:

- Don't turn the design house into an equipment catalogue or add prices and product purchase cards.
- Don't present concepts as completed projects, certified products or available production equipment.
- Don't invent a production logo, aviation imagery, client testimonials or business credentials.
- Don't add floating card shadows, pill controls, loud gradients or ornamental interface density.
