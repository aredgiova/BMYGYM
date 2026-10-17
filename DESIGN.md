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
    fontFamily: "Bodoni Moda, Georgia, serif"
    fontSize: "clamp(3.25rem, 5.4vw, 5.5rem)"
    fontWeight: 400
    lineHeight: 1.08
    letterSpacing: "-0.035em"
  headline:
    fontFamily: "Bodoni Moda, Georgia, serif"
    fontSize: "clamp(2.75rem, 4.1vw, 4.25rem)"
    fontWeight: 400
    lineHeight: 1.12
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

## Overview

**Creative North Star: "The Architectural Portfolio"**

An architectural portfolio for a bespoke longevity design house, shaped for private clients accustomed to exceptional spaces and personal service. Warm ivory, pale stone, fine serif headings and generous space frame complete environments. The user-confirmed direction is discreet luxury with photography as the protagonist. The presentation is quiet, editorial and personal; imagery leads and interface furniture stays restrained.

Bodoni Moda carries the expressive voice; Manrope carries navigation, explanations and forms. Flat surfaces, hairline rules and a limited dark section create depth without ornamental effects. The user-pinned brief is the visual authority for design contract 64135187.

Source of truth: `src/app/globals.css`, `src/app/layout.tsx`, and the implemented components. Durable positioning lives in `PRODUCT.md`; the home page sequence and first-viewport composition live in `docs/home-brief.md`. This document records the built system. The hidden `data-design-contract` in the root layout records the same direction; it is not product copy or runtime configuration.

**Key Characteristics:**

- Architecture and complete environments lead the imagery.
- Warm ivory and sand, with restrained taupe accents.
- Fine serif headlines, readable supporting text and generous section space.
- A concise photographic opening followed by a separate editorial introduction.
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

The Air concept image extends the warm palette through an ivory fitness studio, pale wood and restrained champagne details inside a private jet. A Pilates reformer leads the composition, supported by integrated cable training and neatly arranged dumbbells; the exercise purpose must remain visually clear. It is a generated visualisation requested by the user, not evidence of an installed or certified aviation environment. Hero image shading is an image-legibility treatment. The `stone-ink` tone carries secondary text on stone surfaces and the Blueprint commission caption; the footer scopes its muted text to this darker tone to keep small text above 4.5:1 contrast. Required-field markers use the accent tone.

## Typography

Both families are local WOFF2 assets loaded with `next/font/local` and `display: swap`. Bodoni Moda includes normal and italic variable files; Manrope provides the sans-serif variable file. Keep Georgia and Arial as respective fallbacks.

The frontmatter records global defaults. Headings use balanced wrapping and normal weight; italic serif phrases add editorial emphasis. Font sizes use `rem` so the reading scale follows the browser's base font preference. The typographic BMYGYM wordmark is not supplied final logo artwork.

| Role | Implemented scale |
| --- | --- |
| Reading copy and form controls | `--text-body: 1.125rem` (18px at the default 16px root), becoming `1.0625rem` (17px) below 768px. Body and secondary introduction copy use 1.75 line height; environment copy uses 1.8 and individual editorial passages retain up to 1.9. |
| Labels, actions, captions, notes and legal navigation | `--text-small: 0.875rem` (14px) across desktop and mobile. This is the floor for visible auxiliary text; narrow screens reflow it instead of reducing its size. Retained contextual labels use restrained uppercase tracking; buttons use 0.1em. |
| Form labels and privacy consent | `1rem` (16px), with optional-field notes and error text at the auxiliary size. |
| Headings | Bodoni Moda retains its editorial hierarchy; global h2 spans 44–68px with 1.12 line height and global h3 spans 32–40px at the default root. Environment chapter titles span 48–72px and become 52px on mobile. Individual section headings vary within the same serif system. |
| Editorial introduction | The first paragraph below the hero uses Bodoni Moda at `clamp(1.625rem, 2.1vw, 2rem)` (26–32px), 1.5 line height and a 37ch maximum measure. Its supporting paragraph stays at the reading scale. The philosophy lead is 22px on desktop and 20px on mobile. |

The hero display uses `clamp(3.25rem, 5.4vw, 5.5rem)` (52–88px) with 1.08 line height. Below 1200px it uses `clamp(3.5rem, 5.4vw, 4.25rem)` (56–68px), below 1024px it is `3.75rem` (60px), and below 768px it uses `clamp(2.75rem, 10.5vw, 3.5rem)` (44–56px) with a 1.13 line height. Below 360px it is `2.625rem` (42px). Reading widths commonly use 40–54ch; environment copy is capped at 48ch.

## Layout

The editorial container is centered with a maximum width of 1680px and fluid gutters. General vertical section spacing is `--section-space: clamp(88px, 8.5vw, 148px)`; individual features tune that rhythm. Desktop compositions pair image and copy, give each environment its own full-width chapter, and retain an asymmetric two-image vision grid. Imagery is cropped within explicit aspect ratios with `object-fit: cover`; preserve each existing crop when replacing assets.

The introduction below the hero has `1.3fr 1fr` columns, an adjustable 60–140px gap and 88px vertical padding. Land and Air use image / copy columns of `1.15fr 0.85fr`; Sea reverses them at widths of at least 768px. Each chapter has a 48–112px column gap, with 100px between chapters on desktop. All three environment images use the same `ConceptImage` component and share a 1.05 aspect ratio. The Blueprint has 120px vertical padding and a single hairline division between its introduction and paid-service scope. The Vision surface uses `#30312b`, a `1.35fr 1fr` image grid, a 64px gap and a 112px offset on the capsule column. The enquiry form has a fine vertical division on desktop and a horizontal division when stacked.

| Query | Implemented change |
| --- | --- |
| min-width 1700px | Hero copy aligns with the centered 1680px content field. |
| max-width 1199px | Desktop navigation becomes a disclosure; environment chapter gaps become 80px and image crops tighten. The header's JavaScript media query returns to desktop navigation at 1200px. |
| max-width 1023px | Header remains 79px, gutters are 36px and general section rhythm is 88px; form rows become single-column. Environment columns retain their alternating composition, with a 36px column gap, 76px chapter gap and 0.78 image aspect ratio. The hero's bottom strip becomes a two-column grid with its caption on a separate row. |
| max-width 767px | Header is 72px, gutters are 24px, body copy becomes 17px and general section rhythm is 72px. The introduction stacks with 48px vertical padding. Every environment follows image then copy, with 26px between them, 64px between chapters and a 1.02 image aspect ratio. Other main grids and footer content stack; form submit spans the width and Cookie Settings flows inline at full width. |
| max-width 359px | Gutters are 18px and wordmark / hero headings compress for narrow screens; auxiliary text keeps its 14px floor. |

The philosophy image and its caption stay in normal flow at every breakpoint, reserving their full height before the motto row so scrolling cannot overlap the text. The desktop and tablet header is 79px tall and sticky, with a centered inner width of at most 1280px. Anchor scrolling reserves its height plus 20px. The full-bleed hero keeps only its headline, short service description and primary enquiry action over the photography; the longer offer paragraphs sit in the following ivory introduction. Its desktop minimum height is `clamp(680px, calc(100svh - var(--header-height)), 920px)`, becoming 720px below 1024px, 680px below 768px and 700px below 360px. Content may grow beyond these minimums. The hero copy reserves 140px beneath it on desktop and 152px on mobile for the context strip. The mobile image source requests 1200px to support the tall crop. Concept captions remain visible at narrow widths, including the Air caption identifying the generated AERO ONE visualisation.

## Elevation & Depth

The implemented system has no card shadows. Depth comes from tonal sections, photography and hairline boundaries. The sticky header uses a solid beige surface. Desktop Cookie Settings is a bordered 280px disclosure panel above its trigger; below 768px it participates in document flow so it cannot overflow the viewport.

Motion is small and purposeful: button and field transitions use 0.2s, navigation underlines 0.25s, and environment-image hover scale is 1.035 over 0.7s. Action arrows move 4px horizontally over 0.3s on hover. The hero arrives once over 1.1s with a 14px upward settle from an already-visible 0.6 opacity. Image, arrow and hero easing is `cubic-bezier(0.16, 1, 0.3, 1)`. Reduced-motion preference removes animations and transitions and disables smooth scrolling.

## Shapes

Buttons, input fields, image frames and section panels are square. Fine one-pixel lines establish structure. Thin inline SVG arrows mark direction. The oval aircraft windows belong to the Air concept image; they do not establish a rounded control system.

## Components

- **Buttons:** dark on pale surfaces and ivory over the hero. Minimum height is 58px, becoming 56px on mobile. Text is 14px with enough room to wrap inside the available width. Desktop padding is 17px by 26px; mobile horizontal padding is 16px. Hover fills are `#514b41` and `#e4dccc` respectively. Sending disables the submit control and fieldset; button opacity becomes 0.65.
- **Header:** the BMYGYM serif wordmark has no tagline and uses 1.3125rem (21px) type with 0.3em tracking; below 768px it becomes 1.25rem (20px) / 0.22em and below 360px 1.125rem (18px) / 0.18em. Desktop navigation uses uppercase 14px type with 0.16em tracking and 28px gaps. Below 1200px the disclosure menu uses 2rem (32px) serif links.
- **Header enquiry:** a solid dark action with pale text and no arrow remains beside desktop or mobile navigation. Desktop type is 14px with 0.12em tracking. Its desktop minimum size is 186px by 46px, narrowing to 176px below 1200px; below 768px it is 7rem wide with a 44px minimum height and a two-line label. It uses a `#403a33` hover fill. Mobile navigation closes on selection, outside pointer, Escape, or returning to desktop width; Escape restores focus to its trigger.
- **Text links:** uppercase 14px type with 0.08em tracking, a thin taupe underline and an inline arrow. A 44px minimum height provides a larger interaction area than the label alone; maximum width follows the container.
- **Inputs:** visible 16px labels above transparent, underline-only fields; input text follows the 17–18px reading scale. Focus changes the border to ink and adds a 2px input-focus outline with 4px offset. Invalid fields have a red border and associated text. General interactive focus uses a 2px focus outline with 5px offset.
- **Enquiry feedback:** keep idle, sending, error and success states distinct. The form exposes busy status, announces results politely, focuses the first server-invalid field or status, and retains values on failure. Errors provide an email fallback. Success follows confirmed API success; it must never be simulated for presentation.
- **Concept imagery:** `ConceptImage` accepts source, alternative text, optional class, caption and sizes. The default visible caption is “BMYGYM concept visualisation.” Use the supplied assets honestly. Air uses `/images/air-aviation-fitness.webp`, a generated private-jet fitness studio with an ivory Pilates reformer, integrated cable training, arranged dumbbells and oval windows above the clouds, created at the user's request. Its visible caption is “BMYGYM AERO ONE · Concept visualisation.”
- **Environment chapters:** image and `.environment-copy` are sibling elements within each article. All three chapter titles link to the enquiry with a consistent inline arrow; all three concept images are also links with descriptive accessible names. Desktop image requests use `55vw`, changing to `100vw` below 768px. Preserve the aviation disclosure and its technical-feasibility and certification qualification.
- **Editorial disclosures:** native `details` / `summary`, a hairline boundary and an arrow rotating 90 degrees when open. Keep supporting descriptions in the reading flow.
- **Footer and legal pages:** restrained links and reusable typography. Footer navigation and notes use 14px, while contact details follow the reading scale; footer groups wrap and stack on mobile. Legal copy uses the reading scale within a 1040px maximum page width. Legal draft notices use sand; factual and approval requirements remain explicit.

## Do's and Don'ts

### Do:

- Do use the supplied concept imagery and the user-requested generated Air visual with visible concept captions and meaningful alternatives.
- Do preserve the locally hosted Bodoni Moda / Manrope pairing and the warm neutral palette.
- Do keep Land, Sea and Air equally legible, with matching image treatment and an explicit concept caption for AERO ONE.
- Do preserve keyboard focus, labelled fields, reduced motion and honest enquiry feedback.
- Do treat the text wordmark as provisional typography until final logo artwork is supplied.

### Don't:

- Don't turn the design house into an equipment catalogue or add prices and product purchase cards.
- Don't present concepts as completed projects, certified products or available production equipment.
- Don't invent a production logo, client testimonials or business credentials, or present generated aviation imagery as a real or certified installation.
- Don't add floating card shadows, pill controls, loud gradients or ornamental interface density.
