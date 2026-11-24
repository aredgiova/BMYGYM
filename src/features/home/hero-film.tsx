"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { HomeCopy } from "@/i18n/types";

const filmSource = "/videos/bmygym-hero-film-v1.mp4";
const filmPoster = "/images/bmygym-hero-film-poster.webp";

type Connection = EventTarget & { saveData?: boolean };

export function HeroFilm({ copy, caption }: { copy: HomeCopy["hero"]["video"]; caption: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const intentRef = useRef<"auto" | "play" | "pause">("auto");
  const syncRef = useRef<(() => void) | null>(null);
  const [playing, setPlaying] = useState(false);
  const [hasFrame, setHasFrame] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const connection = (navigator as Navigator & { connection?: Connection }).connection;
    const welcome = document.querySelector<HTMLDialogElement>(".brand-welcome");
    let visible = false;
    let disposed = false;
    let pendingPlay = false;

    function shouldPlay() {
      const requested = intentRef.current === "play" ||
        (intentRef.current === "auto" && !motion.matches && !connection?.saveData);
      return requested && visible && !document.hidden && !welcome?.open && !video?.error;
    }

    function syncPlayback() {
      if (!video || disposed) return;
      if (!shouldPlay()) {
        video.pause();
        return;
      }

      // No video bytes are requested behind the welcome, offscreen, or when
      // reduced motion / data saving calls for the still image instead.
      if (!video.getAttribute("src")) video.src = filmSource;
      if (!video.paused || pendingPlay) return;
      video.muted = true;
      pendingPlay = true;
      void video.play().then(() => {
        if (disposed || !shouldPlay()) video.pause();
      }).catch(() => {
        // Autoplay can be denied (for example in low-power mode). The poster
        // and manual play button remain available; no unhandled rejection.
      }).finally(() => {
        pendingPlay = false;
      });
    }

    syncRef.current = syncPlayback;
    const visibilityObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting && entry.intersectionRatio >= 0.15;
      syncPlayback();
    }, { threshold: [0, 0.15] });
    visibilityObserver.observe(video);
    const welcomeObserver = new MutationObserver(syncPlayback);
    if (welcome) welcomeObserver.observe(welcome, { attributes: true, attributeFilter: ["open"] });
    document.addEventListener("visibilitychange", syncPlayback);
    motion.addEventListener("change", syncPlayback);
    connection?.addEventListener("change", syncPlayback);

    return () => {
      disposed = true;
      syncRef.current = null;
      visibilityObserver.disconnect();
      welcomeObserver.disconnect();
      document.removeEventListener("visibilitychange", syncPlayback);
      motion.removeEventListener("change", syncPlayback);
      connection?.removeEventListener("change", syncPlayback);
      video.pause();
    };
  }, []);

  function togglePlayback() {
    intentRef.current = videoRef.current?.paused ? "play" : "pause";
    syncRef.current?.();
  }

  return (
    <figure className="hero-visual hero-film">
      <div className="hero-film-frame">
        <Image
          className="hero-film-poster"
          src={filmPoster}
          alt=""
          aria-hidden="true"
          width={1080}
          height={1920}
          preload
          unoptimized
        />
        <video
          id="hero-film"
          ref={videoRef}
          className="hero-film-video"
          data-has-frame={hasFrame && !failed}
          width={1080}
          height={1920}
          poster={filmPoster}
          preload="none"
          muted
          playsInline
          loop
          aria-label={copy.description}
          onPlay={() => setPlaying(true)}
          onPlaying={() => setHasFrame(true)}
          onPause={() => setPlaying(false)}
          onError={() => { setFailed(true); setPlaying(false); }}
        />
      </div>
      <figcaption className="hero-caption hero-film-caption">
        <span>{caption}</span>
        {!failed && (
          <button
            type="button"
            className="hero-film-toggle"
            onClick={togglePlayback}
            aria-controls="hero-film"
            aria-label={playing ? copy.pause : copy.play}
            title={playing ? copy.pause : copy.play}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              {playing ? <path d="M8 5v14M16 5v14" stroke="currentColor" strokeWidth="1.5" /> :
                <path d="m8 5 11 7-11 7V5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />}
            </svg>
          </button>
        )}
        {failed && <span className="hero-film-error" role="status">{copy.unavailable}</span>}
      </figcaption>
      <noscript><style>{".hero-film-toggle { display: none; }"}</style></noscript>
    </figure>
  );
}
