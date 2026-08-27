import Link from "next/link";
import Image from "next/image";
import { EVIDENT_DENTIST_PORTAL_URL } from "@/lib/portal";

const nav = [
  {
    title: "Services",
    links: [
      { label: "Implant Prosthetics", href: "/services#implant"   },
      { label: "Crown & Bridge",      href: "/services#crown"     },
      { label: "Removables",          href: "/services#removable" },
      { label: "Appliances",          href: "/services#appliance" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About",       href: "/about"       },
      { label: "Technology",  href: "/technology"  },
      { label: "Gallery",     href: "/gallery"     },
      { label: "Get Started", href: "/get-started" },
    ],
  },
  {
    title: "For dentists",
    links: [
      {
        label: "Dentist portal (Evident)",
        href: EVIDENT_DENTIST_PORTAL_URL,
        external: true,
      },
      { label: "Send a case", href: "/send-a-case/pickup" },
      { label: "Digital impression", href: "/send-a-case/digital-impression" },
      { label: "Material information", href: "/materials" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-surface-3 bg-green-900 px-5 py-14 md:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-5">

          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="inline-flex items-center mb-4">
              <Image
                src="/IDOC_logo.png"
                alt="IDOC Dental Lab"
                width={160}
                height={64}
                className="h-10 w-auto object-contain"
              />
            </Link>
            <p className="text-[13px] leading-relaxed text-white/40 max-w-xs">
              Full-service dental laboratory in Orange, CA. In-house CAD/CAM
              milling, 3D printing, and digital workflows. Serving 500+
              practices nationwide since 2001.
            </p>
            <a
              href="tel:+1-877-388-4362"
              className="mt-4 block text-[13px] text-white/30 hover:text-white/60 transition-colors"
            >
              (877) 388-4362
            </a>

            {/* Social */}
            <div className="mt-5 flex items-center gap-4">
              <a
                href="https://www.instagram.com/idocdentallab/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-white/30 hover:text-white/70 transition-colors"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <circle cx="12" cy="12" r="4"/>
                  <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
                </svg>
                <span className="text-[12px]">@idocdentallab</span>
              </a>
            </div>
          </div>

          {/* Nav cols */}
          {nav.map((col) => (
            <div key={col.title}>
              <p className="mb-4 text-[10px] font-medium uppercase tracking-widest text-white/30">
                {col.title}
              </p>
              <ul className="space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.href}>
                    {"external" in l && l.external ? (
                      <a
                        href={l.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[13px] text-white/40 transition-colors hover:text-white/70"
                      >
                        {l.label}
                      </a>
                    ) : (
                      <Link
                        href={l.href}
                        className="text-[13px] text-white/40 transition-colors hover:text-white/70"
                      >
                        {l.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}

        </div>

        {/* Bottom */}
        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 md:flex-row">
          <p className="text-[11px] text-white/25">
            © {new Date().getFullYear()} IDOC Dental Lab. All rights reserved.
          </p>
          <p className="text-[11px] text-white/15">
            Orange, CA · Serving practices nationwide since 2001
          </p>
        </div>
      </div>
    </footer>
  );
}