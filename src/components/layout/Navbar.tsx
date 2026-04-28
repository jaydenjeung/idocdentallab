"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

const links = [
  { href: "/services",   label: "Services"   },
  { href: "/technology", label: "Technology" },
  { href: "/gallery",    label: "Gallery"    },
  { href: "/about",      label: "About"      },
];

export default function Navbar() {
  const [open,     setOpen]     = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-200 ${
        scrolled
          ? "bg-[#0a0f0d]/95 backdrop-blur-sm border-b border-white/5 shadow-lg shadow-black/20"
          : "bg-[#0a0f0d] border-b border-white/5"
      }`}
    >
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-5 md:px-8">

        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src="/IDOC_logo.png"
            alt="iDOC Dental Lab"
            width={160}
            height={64}
            className="h-12 w-auto object-contain"
            priority
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-7 md:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm text-white/40 transition-colors hover:text-white/80"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden items-center gap-4 md:flex">
          <a
            href="tel:+17145550000"
            className="text-sm text-white/30 hover:text-white/60 transition-colors"
          >
            (714) 555-0000
          </a>
          <Link
            href="/get-started"
            className="rounded-full bg-green-700 px-5 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90"
          >
            Send a case
          </Link>
        </div>

        {/* Mobile hamburger */}
        <div className="flex items-center gap-2 md:hidden">
          <Link
            href="/get-started"
            className="rounded-full bg-green-700 px-4 py-1.5 text-xs font-medium text-white"
          >
            Send a case
          </Link>
          <button
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
            className="flex flex-col gap-1 p-1"
          >
            <span className={`block h-0.5 w-5 bg-white/60 transition-transform duration-200 ${open ? "translate-y-1.5 rotate-45" : ""}`} />
            <span className={`block h-0.5 w-5 bg-white/60 transition-opacity duration-200 ${open ? "opacity-0" : ""}`} />
            <span className={`block h-0.5 w-5 bg-white/60 transition-transform duration-200 ${open ? "-translate-y-1.5 -rotate-45" : ""}`} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-white/5 bg-[#0a0f0d] px-5 pb-4 md:hidden">
          <nav className="flex flex-col gap-1 pt-2">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm text-white/50 hover:text-white/80 hover:bg-white/5"
              >
                {l.label}
              </Link>
            ))}
            <div className="mt-2 border-t border-white/5 pt-3">
              <a
                href="tel:+17145550000"
                className="block rounded-lg px-3 py-2.5 text-sm text-white/30"
              >
                (714) 555-0000
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}