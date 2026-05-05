"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";

const links = [
  { href: "/services",   label: "Services"   },
  { href: "/technology", label: "Technology" },
  { href: "/gallery",    label: "Gallery"    },
  { href: "/about",      label: "About"      },
];

const sendCaseLinks = [
  {
    href: "/send-a-case/digital-impression",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <path d="M8 12s1.5 2 4 2 4-2 4-2"/>
        <path d="M9 9h.01M15 9h.01"/>
      </svg>
    ),
    label: "Send a Digital Impression",
    sub: "CEREC · Trios · iTero · Medit",
  },
  {
    href: "/send-a-case/shipping-label",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2"/>
        <path d="M3 9h18M9 21V9"/>
      </svg>
    ),
    label: "Print Shipping Label",
    sub: "UPS 2nd Day Air · Free",
  },
  {
    href: "/send-a-case/ups-pickup",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 8h14M5 8a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v0a2 2 0 01-2 2M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8"/>
        <path d="M10 12h4M12 10v4"/>
      </svg>
    ),
    label: "Request UPS Pickup",
    sub: "Schedule a free case pickup",
  },
  {
    href: "/send-a-case/download-rx",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
        <path d="M14 2v6h6"/>
        <path d="M12 18v-6M9 15l3 3 3-3"/>
      </svg>
    ),
    label: "Download RX",
    sub: "Lab slips & prescription forms",
  },
];

export default function Navbar() {
  const [open,         setOpen]         = useState(false);
  const [scrolled,     setScrolled]     = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
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
            alt="IDOC Dental Lab"
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
            href="tel:+1-877-388-4362"
            className="text-sm text-white/30 hover:text-white/60 transition-colors"
          >
            (877) 388-4362
          </a>

          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-1.5 rounded-full bg-green-700 px-5 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90"
            >
              Send a case
              <svg
                width="12" height="12" viewBox="0 0 12 12" fill="none"
                className={`transition-transform duration-150 ${dropdownOpen ? "rotate-180" : ""}`}
              >
                <path d="M2 4l4 4 4-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 top-full mt-2 w-64 rounded-2xl border border-white/10 bg-[#0e1512] shadow-2xl shadow-black/40 overflow-hidden">
                <div className="p-1.5">
                  {sendCaseLinks.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-start gap-3 rounded-xl px-3 py-2.5 transition-colors hover:bg-white/5 group"
                    >
                      <div className="mt-0.5 flex-shrink-0 text-green-400/60 group-hover:text-green-400 transition-colors">
                        {item.icon}
                      </div>
                      <div>
                        <div className="text-[13px] font-medium text-white/80 group-hover:text-white transition-colors">
                          {item.label}
                        </div>
                        <div className="text-[11px] text-white/30 mt-0.5">
                          {item.sub}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Mobile hamburger */}
        <div className="flex items-center gap-2 md:hidden">
          <Link
            href="/send-a-case/digital-impression"
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
              <p className="px-3 pb-1.5 text-[10px] font-semibold uppercase tracking-widest text-white/20">
                Send a Case
              </p>
              {sendCaseLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm text-white/50 hover:text-white/80 hover:bg-white/5"
                >
                  <span className="text-green-400/50">{item.icon}</span>
                  {item.label}
                </Link>
              ))}
              <Link
                href="/login"
                onClick={() => setOpen(false)}
                className="block rounded-lg px-3 py-2.5 text-sm text-white/60 hover:text-white hover:bg-white/5"
              >
                Client Login
              </Link>
              <a
                href="tel:+1-877-388-4362"
                className="block rounded-lg px-3 py-2.5 text-sm text-white/30 mt-1 border-t border-white/5 pt-3"
              >
                (877) 388-4362
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}