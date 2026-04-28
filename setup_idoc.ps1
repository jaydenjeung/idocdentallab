# iDOC Dental Lab — PowerShell 설치 스크립트
# 실행: .\setup_idoc.ps1 (idocdentallab 폴더 안에서)

Write-Host "📁 폴더 구조 생성 중..." -ForegroundColor Cyan

$dirs = @(
  "src/styles",
  "src/components/layout",
  "src/components/ui",
  "src/components/sections",
  "src/app/services",
  "src/app/technology",
  "src/app/about",
  "src/app/gallery",
  "src/app/get-started",
  "src/lib",
  "src/types"
)
foreach ($d in $dirs) { New-Item -ItemType Directory -Force -Path $d | Out-Null }

Write-Host "🎨 tailwind.config.ts..." -ForegroundColor Yellow
@'
import type { Config } from "tailwindcss";
const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        green: {
          50:  "#EDF7F2", 100: "#D4EDE0", 200: "#A3D4BA", 300: "#6AB88E",
          400: "#3D9467", 500: "#2D7A52", 600: "#236B45", 700: "#1A5C3A",
          800: "#14442A", 900: "#0D2E1C",
        },
        ink: { DEFAULT: "#0F0F0F", 2: "#3A3A3A", 3: "#7A7A7A", 4: "#B8B8B8" },
        surface: { DEFAULT: "#FAFAF8", 2: "#F2F1EE", 3: "#E8E7E3" },
      },
      fontFamily: {
        serif: ["DM Serif Display", "Georgia", "serif"],
        sans:  ["DM Sans", "system-ui", "sans-serif"],
      },
      borderRadius: { "4xl": "2rem" },
    },
  },
  plugins: [],
};
export default config;
'@ | Set-Content -Encoding UTF8 "tailwind.config.ts"

Write-Host "🎨 globals.css..." -ForegroundColor Yellow
@'
@import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&display=swap');
@tailwind base;
@tailwind components;
@tailwind utilities;
@layer base {
  * { box-sizing: border-box; }
  html { scroll-behavior: smooth; -webkit-font-smoothing: antialiased; }
  body { background-color: #FAFAF8; color: #0F0F0F; font-family: "DM Sans", system-ui, sans-serif; }
  h1, h2, h3 { font-family: "DM Serif Display", Georgia, serif; letter-spacing: -0.02em; line-height: 1.1; }
}
@layer utilities { .text-balance { text-wrap: balance; } }
'@ | Set-Content -Encoding UTF8 "src/styles/globals.css"

Write-Host "📄 layout.tsx..." -ForegroundColor Yellow
@'
import type { Metadata } from "next";
import "@/styles/globals.css";
export const metadata: Metadata = {
  title: { default: "iDOC Dental Lab — Precision Dental Prosthetics, Southern California", template: "%s | iDOC Dental Lab" },
  description: "Full-service dental laboratory in Cypress, CA. In-house CAD/CAM milling, 3D printing, and digital workflows. Serving 500+ dental practices since 2001.",
  openGraph: { title: "iDOC Dental Lab", description: "Precision dental prosthetics. People first.", url: "https://idocdentallab.com", siteName: "iDOC Dental Lab", locale: "en_US", type: "website" },
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (<html lang="en"><body>{children}</body></html>);
}
'@ | Set-Content -Encoding UTF8 "src/app/layout.tsx"

Write-Host "📄 page.tsx..." -ForegroundColor Yellow
@'
import Navbar       from "@/components/layout/Navbar";
import Footer       from "@/components/layout/Footer";
import Hero         from "@/components/sections/Hero";
import StatsBar     from "@/components/sections/StatsBar";
import Services     from "@/components/sections/Services";
import Komplett     from "@/components/sections/Komplett";
import HowItWorks   from "@/components/sections/HowItWorks";
import Testimonials from "@/components/sections/Testimonials";
import CTABanner    from "@/components/sections/CTABanner";
export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero /><StatsBar /><Services /><Komplett />
        <HowItWorks /><Testimonials /><CTABanner />
      </main>
      <Footer />
    </>
  );
}
'@ | Set-Content -Encoding UTF8 "src/app/page.tsx"

Write-Host "🧩 Navbar.tsx..." -ForegroundColor Yellow
@'
"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
const links = [
  { href: "/services",   label: "Services"   },
  { href: "/technology", label: "Technology" },
  { href: "/gallery",    label: "Gallery"    },
  { href: "/about",      label: "About"      },
];
export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <header className={`sticky top-0 z-50 w-full bg-white transition-shadow duration-200 ${scrolled ? "shadow-sm" : ""} border-b border-surface-3`}>
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-5 md:px-8">
        <Link href="/" className="font-serif text-xl tracking-tight text-ink">i<span className="text-green-700">DOC</span></Link>
        <nav className="hidden items-center gap-7 md:flex">
          {links.map((l) => (<Link key={l.href} href={l.href} className="text-sm text-ink-3 transition-colors hover:text-ink">{l.label}</Link>))}
        </nav>
        <div className="hidden items-center gap-3 md:flex">
          <a href="tel:+17145550000" className="text-sm text-ink-3 hover:text-ink transition-colors">(714) 555-0000</a>
          <Link href="/get-started" className="rounded-full bg-green-700 px-5 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90">Send a case</Link>
        </div>
        <div className="flex items-center gap-2 md:hidden">
          <Link href="/get-started" className="rounded-full bg-green-700 px-4 py-1.5 text-xs font-medium text-white">Send a case</Link>
          <button onClick={() => setOpen(!open)} aria-label="Toggle menu" className="flex flex-col gap-1 p-1">
            <span className={`block h-0.5 w-5 bg-ink transition-transform duration-200 ${open ? "translate-y-1.5 rotate-45" : ""}`} />
            <span className={`block h-0.5 w-5 bg-ink transition-opacity duration-200 ${open ? "opacity-0" : ""}`} />
            <span className={`block h-0.5 w-5 bg-ink transition-transform duration-200 ${open ? "-translate-y-1.5 -rotate-45" : ""}`} />
          </button>
        </div>
      </div>
      {open && (
        <div className="border-t border-surface-3 bg-white px-5 pb-4 md:hidden">
          <nav className="flex flex-col gap-1 pt-2">
            {links.map((l) => (<Link key={l.href} href={l.href} onClick={() => setOpen(false)} className="rounded-lg px-3 py-2.5 text-sm text-ink-2 hover:bg-surface">{l.label}</Link>))}
            <div className="mt-2 border-t border-surface-3 pt-3">
              <a href="tel:+17145550000" className="block rounded-lg px-3 py-2.5 text-sm text-ink-3">(714) 555-0000</a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
'@ | Set-Content -Encoding UTF8 "src/components/layout/Navbar.tsx"

Write-Host "🧩 Footer.tsx..." -ForegroundColor Yellow
@'
import Link from "next/link";
const services = [
  { href: "/services#crown",     label: "Crown & Bridge"      },
  { href: "/services#implant",   label: "Implant Prosthetics" },
  { href: "/services#komplett",  label: "Komplett Bundle"     },
  { href: "/services#removable", label: "Removables"          },
  { href: "/services#appliance", label: "Appliances"          },
];
const company = [
  { href: "/about",      label: "About"      },
  { href: "/technology", label: "Technology" },
  { href: "/gallery",    label: "Gallery"    },
];
const contact = [
  { href: "/get-started",                  label: "Get Started"            },
  { href: "/get-started#pickup",           label: "Request Pickup"         },
  { href: "mailto:info@idocdentallab.com", label: "info@idocdentallab.com" },
  { href: "#",                             label: "Cypress, CA"            },
];
export default function Footer() {
  return (
    <footer className="bg-green-900 px-5 pb-8 pt-14 md:px-10">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-2 gap-10 border-b border-white/10 pb-10 md:grid-cols-4">
          <div className="col-span-2 md:col-span-1">
            <div className="font-serif text-xl text-white mb-3">i<span className="text-green-300">DOC</span></div>
            <p className="text-xs text-white/40 leading-relaxed max-w-[200px]">Precision dental prosthetics, digitally crafted in Southern California since 2001.</p>
            <p className="mt-4 text-xs font-medium text-green-400 uppercase tracking-widest">People first.</p>
          </div>
          <div>
            <div className="mb-4 text-[10px] font-medium uppercase tracking-widest text-white/40">Services</div>
            <ul className="flex flex-col gap-2">{services.map((l) => (<li key={l.href}><Link href={l.href} className="text-sm text-white/40 transition-colors hover:text-white/80">{l.label}</Link></li>))}</ul>
          </div>
          <div>
            <div className="mb-4 text-[10px] font-medium uppercase tracking-widest text-white/40">Company</div>
            <ul className="flex flex-col gap-2">{company.map((l) => (<li key={l.href}><Link href={l.href} className="text-sm text-white/40 transition-colors hover:text-white/80">{l.label}</Link></li>))}</ul>
          </div>
          <div>
            <div className="mb-4 text-[10px] font-medium uppercase tracking-widest text-white/40">Contact</div>
            <ul className="flex flex-col gap-2">{contact.map((l) => (<li key={l.href}><Link href={l.href} className="text-sm text-white/40 transition-colors hover:text-white/80">{l.label}</Link></li>))}</ul>
          </div>
        </div>
        <div className="flex flex-col items-start justify-between gap-3 pt-6 md:flex-row md:items-center">
          <p className="text-xs text-white/25">© 2025 iDOC Dental Lab, Inc. All rights reserved.</p>
          <div className="flex gap-5">
            <Link href="/privacy" className="text-xs text-white/25 hover:text-white/50 transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="text-xs text-white/25 hover:text-white/50 transition-colors">Terms of Use</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
'@ | Set-Content -Encoding UTF8 "src/components/layout/Footer.tsx"

Write-Host "🧩 Button.tsx + Badge.tsx..." -ForegroundColor Yellow
@'
import Link from "next/link";
import { ReactNode } from "react";
type Variant = "primary" | "secondary" | "ghost" | "dark";
type Size    = "sm" | "md" | "lg";
interface ButtonProps { children: ReactNode; variant?: Variant; size?: Size; href?: string; onClick?: () => void; disabled?: boolean; className?: string; type?: "button" | "submit"; }
const variants: Record<Variant, string> = {
  primary:   "bg-green-700 text-white hover:opacity-90",
  secondary: "border border-green-700 text-green-700 bg-transparent hover:bg-green-50",
  ghost:     "border border-surface-3 text-ink-3 bg-transparent hover:bg-surface",
  dark:      "bg-ink text-white hover:opacity-85",
};
const sizes: Record<Size, string> = { sm: "px-4 py-1.5 text-xs", md: "px-5 py-2.5 text-sm", lg: "px-7 py-3.5 text-sm" };
export default function Button({ children, variant = "primary", size = "md", href, onClick, disabled = false, className = "", type = "button" }: ButtonProps) {
  const base = `inline-flex items-center justify-center rounded-full font-medium transition-all duration-150 ${variants[variant]} ${sizes[size]} ${disabled ? "opacity-40 cursor-not-allowed" : "cursor-pointer"} ${className}`;
  if (href) return <Link href={href} className={base}>{children}</Link>;
  return <button type={type} onClick={onClick} disabled={disabled} className={base}>{children}</button>;
}
'@ | Set-Content -Encoding UTF8 "src/components/ui/Button.tsx"

@'
import { ReactNode } from "react";
type Variant = "primary" | "light" | "dark" | "neutral";
interface BadgeProps { children: ReactNode; variant?: Variant; className?: string; }
const variants: Record<Variant, string> = {
  primary: "bg-green-700 text-white",
  light:   "bg-green-50 text-green-700 border border-green-200",
  dark:    "bg-green-900 text-green-200",
  neutral: "bg-surface-2 text-ink-3",
};
export default function Badge({ children, variant = "light", className = "" }: BadgeProps) {
  return <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wide ${variants[variant]} ${className}`}>{children}</span>;
}
'@ | Set-Content -Encoding UTF8 "src/components/ui/Badge.tsx"

Write-Host "🧩 섹션 컴포넌트들..." -ForegroundColor Yellow

@'
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
export default function Hero() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="grid min-h-[560px] items-center gap-12 md:grid-cols-2">
          <div className="py-16 md:py-20">
            <Badge variant="light" className="mb-6">Southern California&apos;s Premier Dental Lab</Badge>
            <h1 className="mb-5 text-[44px] font-serif leading-[1.05] tracking-[-1.5px] text-ink md:text-[56px]">
              Precision-crafted.{" "}<em className="text-green-700">People</em>{" "}first.
            </h1>
            <p className="mb-8 max-w-md text-[15px] leading-relaxed text-ink-3 font-light">
              From single-unit crowns to full-arch implant cases — iDOC delivers lab-grade quality with in-house CAD/CAM milling and 3D printing, backed by 20+ years of expertise.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button href="/get-started" size="lg">Send a case</Button>
              <Button href="/services" variant="ghost" size="lg">View services →</Button>
            </div>
          </div>
          <div className="hidden items-center justify-center md:flex">
            <div className="relative w-full max-w-sm">
              <div className="aspect-square rounded-3xl bg-surface-2 flex items-center justify-center">
                <div className="text-center">
                  <div className="mx-auto mb-4 h-24 w-24 rounded-full bg-white flex items-center justify-center">
                    <svg viewBox="0 0 80 80" fill="none" className="h-14 w-14">
                      <path d="M40 12C32 12 24 17 22 26C20 34 22 44 24 52C26 60 28 68 32 68C36 68 37 62 40 62C43 62 44 68 48 68C52 68 54 60 56 52C58 44 60 34 58 26C56 17 48 12 40 12Z" stroke="#1A5C3A" strokeWidth="1.5" fill="#EDF7F2"/>
                      <path d="M30 30C30 30 33 36 40 36C47 36 50 30 50 30" stroke="#2D7A52" strokeWidth="1.2" strokeLinecap="round" fill="none"/>
                    </svg>
                  </div>
                  <p className="text-sm font-medium text-ink-3">People first.</p>
                </div>
              </div>
              <div className="absolute -bottom-4 -left-4 rounded-xl bg-white border border-surface-3 px-4 py-3 shadow-sm">
                <div className="font-serif text-2xl text-ink leading-none">20+</div>
                <div className="mt-0.5 text-xs text-ink-3">Years of expertise</div>
              </div>
              <div className="absolute -top-4 -right-4 rounded-xl bg-green-700 px-4 py-3">
                <div className="text-xs text-green-200">In-house</div>
                <div className="text-sm font-medium text-white">CAD/CAM milling</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
'@ | Set-Content -Encoding UTF8 "src/components/sections/Hero.tsx"

@'
const stats = [
  { num: "20+",  label: "Years in business"  },
  { num: "500+", label: "Dental practices"    },
  { num: "50",   label: "Skilled technicians" },
  { num: "3-5",  label: "Day avg. turnaround" },
];
export default function StatsBar() {
  return (
    <div className="bg-green-900">
      <div className="mx-auto max-w-6xl grid grid-cols-2 md:grid-cols-4">
        {stats.map((s, i) => (
          <div key={s.label} className={`px-8 py-7 ${i < 3 ? "border-b border-white/10 md:border-b-0 md:border-r" : ""} ${i === 1 ? "border-r border-white/10" : ""}`}>
            <div className="font-serif text-3xl text-white leading-none">{s.num}</div>
            <div className="mt-1.5 text-xs text-white/40 font-light tracking-wide">{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
'@ | Set-Content -Encoding UTF8 "src/components/sections/StatsBar.tsx"

@'
import Link from "next/link";
const services = [
  { id: "implant",   name: "Implant Prosthetics", desc: "Custom abutments, crowns, and bridges with our signature Komplett Bundle.", tag: "Most popular", featured: true,  href: "/services#implant"   },
  { id: "crown",     name: "Crown & Bridge",       desc: "Zirconia, PFM, e.max — premium materials milled in-house for perfect fit.",  tag: null,          featured: false, href: "/services#crown"     },
  { id: "removable", name: "Removables",           desc: "Digital and conventional full/partial dentures. Precision-fitted.",          tag: null,          featured: false, href: "/services#removable" },
  { id: "appliance", name: "Appliances",           desc: "Nightguards, mouthguards, and orthodontic retainers.",                       tag: null,          featured: false, href: "/services#appliance" },
];
export default function Services() {
  return (
    <section className="bg-white px-5 py-20 md:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 flex items-end justify-between">
          <div>
            <p className="mb-2 text-[10px] font-medium uppercase tracking-widest text-ink-3">What we make</p>
            <h2 className="font-serif text-[32px] text-ink">Full-service lab,<br />under one roof.</h2>
          </div>
          <Link href="/services" className="hidden text-sm text-ink-3 transition-colors hover:text-ink md:block">View all services →</Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s) => (
            <Link key={s.id} href={s.href} className={`group flex flex-col rounded-2xl border p-6 transition-all duration-150 hover:shadow-sm ${s.featured ? "border-green-700 bg-green-900 hover:bg-green-800" : "border-surface-3 bg-white hover:border-ink-4"}`}>
              <div className={`mb-5 h-2 w-2 rounded-full ${s.featured ? "bg-green-400" : "bg-surface-3"}`} />
              <h3 className={`mb-2 text-[15px] font-medium ${s.featured ? "text-white" : "text-ink"}`}>{s.name}</h3>
              <p className={`flex-1 text-[13px] leading-relaxed ${s.featured ? "text-white/50" : "text-ink-3"}`}>{s.desc}</p>
              {s.tag && <span className="mt-4 inline-flex w-fit rounded-full bg-green-700/30 px-2.5 py-0.5 text-[10px] font-medium text-green-300">{s.tag}</span>}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
'@ | Set-Content -Encoding UTF8 "src/components/sections/Services.tsx"

@'
import Button from "@/components/ui/Button";
const items = ["CAD/CAM custom abutment (any implant system)","Zirconia or PFM crown — premium material","Lab analog included","Lab screw included","One flat price — no hidden fees"];
export default function Komplett() {
  return (
    <section className="px-5 py-6 md:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="rounded-3xl bg-surface-2 px-8 py-14 md:px-14">
          <div className="grid gap-14 md:grid-cols-2 md:items-center">
            <div>
              <p className="mb-3 text-[10px] font-medium uppercase tracking-widest text-green-600">Featured product</p>
              <h2 className="mb-4 font-serif text-[36px] text-ink">The Komplett<br />Bundle</h2>
              <p className="mb-8 text-[14px] leading-relaxed text-ink-3 font-light">Everything you need for a complete implant restoration in one simple price. No surprises, no add-ons.</p>
              <Button href="/services#komplett" size="lg">Learn more →</Button>
            </div>
            <ul className="flex flex-col gap-3.5">
              {items.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-green-700">
                    <svg viewBox="0 0 10 10" fill="none" className="h-2.5 w-2.5"><path d="M2 5l2.5 2.5L8 3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </span>
                  <span className="text-[13px] text-ink-2 leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
'@ | Set-Content -Encoding UTF8 "src/components/sections/Komplett.tsx"

@'
const steps = [
  { num: "01", title: "Request a pickup", desc: "Schedule a free UPS pickup directly from your office. Fill out a quick form and we handle the rest." },
  { num: "02", title: "We fabricate",     desc: "Our technicians use in-house CAD/CAM and 3D printing. Most cases delivered in 3-5 business days." },
  { num: "03", title: "Delivered to you", desc: "Your case ships back fast. Our remake policy has you covered if adjustments are needed." },
];
export default function HowItWorks() {
  return (
    <section className="bg-surface px-5 py-20 md:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12">
          <p className="mb-2 text-[10px] font-medium uppercase tracking-widest text-ink-3">How it works</p>
          <h2 className="font-serif text-[32px] text-ink">Simple to start.<br />Easy to stay.</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {steps.map((s, i) => (
            <div key={s.num} className="relative rounded-2xl border border-surface-3 bg-white p-8">
              <div className="mb-4 font-serif text-5xl leading-none text-surface-3 select-none">{s.num}</div>
              <h3 className="mb-2 text-[15px] font-medium text-ink">{s.title}</h3>
              <p className="text-[13px] leading-relaxed text-ink-3 font-light">{s.desc}</p>
              {i < steps.length - 1 && (
                <div className="absolute -right-3 top-1/2 hidden -translate-y-1/2 md:block">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full border border-surface-3 bg-white">
                    <svg viewBox="0 0 10 10" fill="none" className="h-2.5 w-2.5"><path d="M3 5h4M7 5L5 3M7 5L5 7" stroke="#B8B8B8" strokeWidth="1.2" strokeLinecap="round"/></svg>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
'@ | Set-Content -Encoding UTF8 "src/components/sections/HowItWorks.tsx"

@'
const testimonials = [
  { quote: "I have been working with iDOC for about 3 years and they have been great from the beginning. Communication is always prompt and the work is consistently excellent.", name: "Dr. Arvin Ahmadieh", clinic: "Private Practice, CA",  initials: "AA" },
  { quote: "The bridge fit perfectly with only slight adjustments and it looked phenomenal. My patient was thrilled. Thank you for your fine work on this case.",                name: "Charles Roberts, DMD", clinic: "Roberts Dental Group", initials: "CR" },
  { quote: "You are the best lab I have ever worked with and always super concerned with results. You are the standard I compare every other lab to.",                           name: "Dr. Shaelan",          clinic: "General Practice, CA", initials: "DS" },
];
export default function Testimonials() {
  return (
    <section className="bg-white px-5 py-20 md:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12">
          <p className="mb-2 text-[10px] font-medium uppercase tracking-widest text-ink-3">What doctors say</p>
          <h2 className="font-serif text-[32px] text-ink">Trusted by practices<br />across California.</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {testimonials.map((t) => (
            <div key={t.name} className="flex flex-col rounded-2xl border border-surface-3 bg-surface p-7">
              <div className="mb-4 flex gap-0.5">
                {[...Array(5)].map((_, i) => (<svg key={i} viewBox="0 0 12 12" className="h-3 w-3 fill-green-600"><path d="M6 1l1.5 3 3.5.5-2.5 2.5.5 3.5L6 9l-3 1.5.5-3.5L1 4.5 4.5 4z"/></svg>))}
              </div>
              <p className="flex-1 font-serif text-[14px] italic leading-relaxed text-ink-2">&ldquo;{t.quote}&rdquo;</p>
              <div className="mt-6 flex items-center gap-3">
                <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-green-100 text-xs font-medium text-green-700">{t.initials}</div>
                <div>
                  <div className="text-[13px] font-medium text-ink">{t.name}</div>
                  <div className="text-[11px] text-ink-3">{t.clinic}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
'@ | Set-Content -Encoding UTF8 "src/components/sections/Testimonials.tsx"

@'
import Button from "@/components/ui/Button";
export default function CTABanner() {
  return (
    <section className="px-5 py-6 md:px-8 mb-6">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-8 rounded-3xl bg-green-900 px-8 py-14 md:flex-row md:items-center md:justify-between md:px-14">
          <h2 className="font-serif text-[32px] leading-[1.15] text-white md:max-w-lg">
            Ready to experience a lab that <em className="italic text-green-300">actually</em> delivers?
          </h2>
          <div className="flex flex-col gap-3 sm:flex-row md:flex-col md:items-end">
            <Button href="/get-started" className="!bg-white !text-green-700 hover:!bg-green-50" size="lg">Send your first case</Button>
            <Button href="/get-started#contact" variant="ghost" size="lg" className="!border-white/20 !text-white/60 hover:!bg-white/10">Schedule a call</Button>
          </div>
        </div>
      </div>
    </section>
  );
}
'@ | Set-Content -Encoding UTF8 "src/components/sections/CTABanner.tsx"

# 기존 globals.css 제거
if (Test-Path "src/app/globals.css") {
  Remove-Item "src/app/globals.css"
  Write-Host "🗑  src/app/globals.css 제거" -ForegroundColor Gray
}

Write-Host ""
Write-Host "✅ 완료! 15개 파일 생성됐어요." -ForegroundColor Green
Write-Host ""
Write-Host "이제 실행:" -ForegroundColor Cyan
Write-Host "  npm run dev" -ForegroundColor White
