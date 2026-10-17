"use client";

import { useEffect, useRef, useState } from "react";
import { Arrow } from "@/components/ui/arrow";

const links = [
  { href: "#philosophy", label: "Philosophy" },
  { href: "#environments", label: "Environments" },
  { href: "#approach", label: "Our Approach" },
  { href: "#vision", label: "Vision" },
];

export function Header({ isHome = true }: { isHome?: boolean }) {
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const prefix = isHome ? "" : "/";

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
    const media = window.matchMedia("(min-width: 1200px)");
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
          aria-label="BMYGYM home"
          onClick={() => setOpen(false)}
        >
          BMYGYM
        </a>
        <nav className="desktop-nav" aria-label="Main navigation">
          {links.map((link) => (
            <a key={link.href} href={`${prefix}${link.href}`}>
              {link.label}
            </a>
          ))}
        </nav>
        <div className="header-actions">
          <a
            className="header-enquiry"
            href={`${prefix}#enquiry`}
            onClick={() => setOpen(false)}
          >
            Private Enquiry
          </a>
          <button
            ref={toggleRef}
            type="button"
            className={`menu-toggle${open ? " is-open" : ""}`}
            aria-label={open ? "Close navigation" : "Open navigation"}
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
        aria-label="Mobile navigation"
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
          Private Enquiry
          <Arrow diagonal />
        </a>
        <p>
          Designed around you.
          <br />
          Created for exceptional spaces.
        </p>
      </nav>
    </header>
  );
}
