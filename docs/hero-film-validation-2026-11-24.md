# Hero film validation — 24 November 2026

The supplied portrait film occupies the existing hero visual, beside the established live typography. The page retains its concept caption and all existing commercial text. No additional section or external video service was introduced.

## Media verification

- Original: 58,350,369 bytes, HEVC, 1080 × 1920, 829 frames, approximately 29.1 seconds, no audio stream.
- Web export: 22,332,424 bytes, H.264, same 1080 × 1920 frame and all 829 frames, original variable frame timing, no audio stream, MP4 fast start.
- Poster: first source frame at 1080 × 1920, WebP quality 94, 101,848 bytes.
- Both original and output decoded to completion. Detail and rendered desktop/mobile compositions were inspected. No crop, upscaling, color filter or additional blur. Existing blurred bands belong to the supplied montage.

## Checks

- ESLint, TypeScript, all 32 existing tests and optimized production build pass.
- Desktop English at 1440px, Spanish at 390px with device pixel ratio 3, and German, French, Russian, Italian and Arabic at 320px: no horizontal overflow, preserved 9:16 frame, contain sizing and localized controls.
- Actual browser decoding confirms the video is 1080 × 1920, muted and inline. MP4 delivery supports HTTP 206 byte ranges with `video/mp4` content type.
- No video request behind the welcome; closing it permits playback.
- Reduced motion and Save-Data keep the poster without requesting MP4. Explicit Play works with reduced motion.
- Manual pause survives leaving/re-entering the viewport. Playing video pauses offscreen and resumes when visible. The visibility-change handler was also checked with a simulated hidden document.
- A blocked media request preserves the loaded poster and announces localized failure feedback.
- With JavaScript disabled, the poster remains and the nonfunctional custom control is hidden.

Browser evidence is in the ignored local `artifacts/hero-film/` directory. Checks use Microsoft Edge/Chromium, including mobile viewport and density emulation; they do not constitute testing on a physical iPhone or Safari. A high-quality full-resolution file is intentionally prioritized over aggressive compression. Download scheduling avoids unnecessary initial traffic; pausing playback does not guarantee the browser cancels an already-started media download.

GitHub connector and local Git credentials were independently verified as `aredgiova` (GitHub user ID 18452503) before publication. The requested destination is `aredgiova/BMYGYM` / `main`; repository publication and any hosting deployment are separate states.
