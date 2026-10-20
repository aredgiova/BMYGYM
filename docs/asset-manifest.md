# BMYGYM asset manifest

Prepared on 16 October 2026; updated on 20 October 2026 for the supplied AERO ONE replacement and five-language typography.

## Image provenance and treatment

The active project images are supplied BMYGYM concept visualisations. They must not be described as photographs of completed installations or client projects. The original seven selected images were encoded as WebP at quality 90 with effort 6 using Sharp. The AERO ONE replacement is also delivered as WebP, preserving the source dimensions and artwork. Layout crops belong to the presentation layer; the replacement does not add, remove or generate image content.

Source files remain in the user's Downloads directory. The duplicate recovery image ending in ` (1).jpeg` is intentionally omitted.

| Public asset                        | Supplied source                             | Dimensions  |   Bytes | Intended context                        |
| ----------------------------------- | ------------------------------------------- | ----------- | ------: | --------------------------------------- |
| `/images/hero-residence.webp`       | `9BF3F725-B59F-4F88-A736-A8DB9652CBCA.jpeg` | 1536 × 1024 | 443,534 | Residential wellness hero concept       |
| `/images/philosophy-residence.webp` | `57EC6D03-5391-4F6F-BF4B-B9588D0573DC.png`  | 1024 × 1536 | 259,582 | Quiet residential interior / philosophy |
| `/images/land-wellness.webp`        | `IMG_9980.jpeg`                             | 1203 × 1799 | 564,506 | Boutique wellness environment on land   |
| `/images/sea-yacht.webp`            | `2721CDA5-6583-4F33-9BD4-830BD6DB1D7E.jpeg` | 1403 × 1121 | 316,410 | Yacht wellness interior concept         |
| `/images/approach-concept.webp`     | `54A5DA37-08FB-4FC1-AC61-28C81AEA0FE2.png`  | 1536 × 1024 | 294,312 | Concept study / design approach         |
| `/images/fitness-wall.webp`         | `B4A2721F-C22C-4D44-915B-A3EF82032109.jpeg` | 1402 × 1121 | 291,660 | Integrated fitness wall concept         |
| `/images/recovery-capsule.webp`     | `DAF825F9-5F2D-452F-85C1-F247788B1590.jpeg` | 1086 × 1448 | 124,494 | Recovery equipment concept              |
| `/images/aero-one-private-aviation.webp` | `3DED3D79-2582-4355-ADCA-3BA333281259.png` | 1536 × 1024 | 287,132 | AERO ONE transformable recovery and longevity chair concept for private aviation |

The eight active WebP assets total 2,581,630 bytes. Responsive delivery is handled by Next.js Image.

The `land-wellness` source includes embedded text at its upper edge. That text remains intact in the asset. The `fitness-wall` source also includes a BMYGYM ORVÉA mark, which is retained.

The new aviation image was supplied by the user at `C:/Users/User/Downloads/3DED3D79-2582-4355-ADCA-3BA333281259.png` (2,505,722 bytes). It replaces `/images/air-aviation-fitness.webp` in the AIR section. The previous generated private-jet fitness-studio asset remains in the repository but is not the active AIR illustration. AERO ONE is a concept in development, not certified or commercially available. Development and integration remain subject to aircraft-specific technical feasibility, safety and aeronautical certification requirements. The image retains a visible, localised concept caption and an adjacent status notice. Its 3:2 presentation preserves the chair composition.

No new complete-environment image or virtual tour was produced for this update; those are later-phase requests.

## Locally served fonts

Font binaries come from Google Fonts' official delivery service. Source projects and licenses are available in the [Bodoni Moda directory](https://github.com/google/fonts/tree/main/ofl/bodonimoda), [Manrope directory](https://github.com/google/fonts/tree/main/ofl/manrope) and [Cormorant Garamond directory](https://github.com/google/fonts/tree/main/ofl/cormorantgaramond).

| Public asset                                     | Style and axes                            | Size         |
| ------------------------------------------------ | ----------------------------------------- | ------------ |
| `/fonts/bodoni-moda-latin-variable.woff2`        | Normal; weight 400–900; optical size 6–96 | 46,260 bytes |
| `/fonts/bodoni-moda-latin-italic-variable.woff2` | Italic; weight 400–900; optical size 6–96 | 53,756 bytes |
| `/fonts/manrope-latin-variable.woff2`            | Normal; weight 200–800                    | 24,836 bytes |
| `/fonts/manrope-cyrillic-variable.woff2`          | Cyrillic; normal; weight 200–800          | 14,500 bytes |
| `/fonts/cormorant-garamond-cyrillic.woff2`         | Cyrillic; normal; weight 400              | 12,776 bytes |
| `/fonts/cormorant-garamond-cyrillic-italic.woff2`  | Cyrillic; italic; weight 400              | 12,720 bytes |

The Latin subsets serve the English, German, French and Spanish text. Russian uses the local Manrope Cyrillic subset for sans-serif text. Bodoni Moda does not provide Cyrillic coverage, so Cormorant Garamond supplies the Cyrillic serif normal and italic styles through the `BMYGYM Cyrillic Serif` fallback. CSS `unicode-range` limits these supplemental faces to their supported characters. The original Bodoni Moda / Manrope pairing is retained for Latin text and brand names.

SIL Open Font License 1.1 notices are included as `/fonts/Bodoni-Moda-OFL.txt`, `/fonts/Manrope-OFL.txt` and `/fonts/Cormorant-Garamond-OFL.txt`.

Original Latin binary source URLs:

- Bodoni Moda normal: `https://fonts.gstatic.com/s/bodonimoda/v28/aFTQ7PxzY382XsXX63LUYJSKSKg.woff2`
- Bodoni Moda italic: `https://fonts.gstatic.com/s/bodonimoda/v28/aFTS7PxzY382XsXX63LUYJSPeKrcWw.woff2`
- Manrope: `https://fonts.gstatic.com/s/manrope/v20/xn7gYHE41ni1AdIRggexSg.woff2`

All font files are served locally. Latin faces are loaded with `next/font/local`; Cyrillic faces use local `@font-face` declarations with `font-display: swap`. There is no runtime font request to Google Fonts.
