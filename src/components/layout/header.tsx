"use client";

import { useEffect, useRef, useState } from "react";
import { Arrow } from "@/components/ui/arrow";
import { LanguageSelector } from "./language-selector";
import { localePath, type Locale } from "@/i18n/config";
import type { CommonCopy } from "@/i18n/types";

export function Header({ isHome = true, locale, copy }: { isHome?: boolean; locale: Locale; copy: CommonCopy["nav"] }) {
  const links = [
    { href: "#philosophy", label: copy.philosophy },
    { href: "#environments", label: copy.environments },
    { href: "#approach", label: copy.approach },
    { href: "#vision", label: copy.vision },
  ];
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const prefix = isHome ? "" : localePath(locale);

  useEffect(() => {
    if (!open) return;
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    }
    function onPointer(event: PointerEvent) {
      if (
        event.target instanceof Node &&
        !headerRef.current?.contains(event.target)
      )
        setOpen(false);
    }
    const media = window.matchMedia("(min-width: 1440px)");
    const onResize = () => {
      if (media.matches) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    media.addEventListener("change", onResize);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
      media.removeEventListener("change", onResize);
    };
  }, [open]);

  return (
    <header ref={headerRef} className="site-header">
      <div className="header-inner">
        <a
          className="wordmark"
          href={`${prefix}#home`}
          aria-label={copy.home}
          onClick={() => setOpen(false)}
        >
          BMYGYM
        </a>
        <nav className="desktop-nav" aria-label={copy.main}>
          {links.map((link) => (
            <a key={link.href} href={`${prefix}${link.href}`}>
              {link.label}
            </a>
          ))}
        </nav>
        <div className="header-actions">
          <LanguageSelector locale={locale} label={copy.language} />
          <a
            className="header-enquiry"
            href={`${prefix}#enquiry`}
            onClick={() => setOpen(false)}
          >
            {copy.enquiry}
          </a>
          <button
            ref={toggleRef}
            type="button"
            className={`menu-toggle${open ? " is-open" : ""}`}
            aria-label={open ? copy.close : copy.open}
            aria-expanded={open}
            aria-controls="mobile-navigation"
            onClick={() => setOpen(!open)}
          >
            <span />
            <span />
          </button>
        </div>
      </div>
      <nav
        id="mobile-navigation"
        className="mobile-nav"
        aria-label={copy.mobile}
        hidden={!open}
      >
        {links.map((link) => (
          <a
            key={link.href}
            href={`${prefix}${link.href}`}
            onClick={() => setOpen(false)}
          >
            {link.label}
            <Arrow />
          </a>
        ))}
        <a href={`${prefix}#enquiry`} onClick={() => setOpen(false)}>
          {copy.enquiry}
          <Arrow diagonal />
        </a>
        <p>
          {copy.tagline}
        </p>
      </nav>
    </header>
  );
}
