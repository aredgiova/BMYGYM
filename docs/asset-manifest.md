# BMYGYM asset manifest

Prepared on 16 October 2026 from the images supplied for this project.

## Image provenance and treatment

All project images are supplied BMYGYM concept visualisations. They must not be described as photographs of completed installations or client projects. The selected images are encoded as WebP at quality 90 with effort 6 using Sharp, preserving the source dimensions, aspect ratio, and artwork. Layout crops belong to the presentation layer; no text, equipment, finishes, or architectural details are removed or generated.

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

The seven WebP assets total 2,294,498 bytes, compared with 9,790,836 bytes for the source files (approximately 77% smaller). Responsive delivery can be handled by Next.js Image.

The `land-wellness` source includes embedded text at its upper edge. That text remains intact in the asset. The `fitness-wall` source also includes a BMYGYM ORVÉA mark, which is retained.

## Locally served fonts

Font binaries were downloaded from Google Fonts' official delivery service. Their source projects and licenses were checked in the [Google Fonts Bodoni Moda directory](https://github.com/google/fonts/tree/main/ofl/bodonimoda) and [Google Fonts Manrope directory](https://github.com/google/fonts/tree/main/ofl/manrope).

| Public asset                                     | Style and axes                            | Size         |
| ------------------------------------------------ | ----------------------------------------- | ------------ |
| `/fonts/bodoni-moda-latin-variable.woff2`        | Normal; weight 400–900; optical size 6–96 | 46,260 bytes |
| `/fonts/bodoni-moda-latin-italic-variable.woff2` | Italic; weight 400–900; optical size 6–96 | 53,756 bytes |
| `/fonts/manrope-latin-variable.woff2`            | Normal; weight 200–800                    | 24,836 bytes |

These Latin subsets include English and Spanish accented Latin characters. Additional script subsets would be needed if the site's supported languages expand. Every font file was checked for a valid WOFF2 signature.

SIL Open Font License 1.1 notices are included as `/fonts/Bodoni-Moda-OFL.txt` and `/fonts/Manrope-OFL.txt`.

Official binary source URLs:

- Bodoni Moda normal: `https://fonts.gstatic.com/s/bodonimoda/v28/aFTQ7PxzY382XsXX63LUYJSKSKg.woff2`
- Bodoni Moda italic: `https://fonts.gstatic.com/s/bodonimoda/v28/aFTS7PxzY382XsXX63LUYJSPeKrcWw.woff2`
- Manrope: `https://fonts.gstatic.com/s/manrope/v20/xn7gYHE41ni1AdIRggexSg.woff2`

The site should load these local files, with no runtime dependency on Google Fonts.
