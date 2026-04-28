import Link from "next/link";
import Image from "next/image";

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
];

export default function Footer() {
  return (
    <footer className="border-t border-surface-3 bg-green-900 px-5 py-14 md:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-10 md:grid-cols-4">

          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="inline-flex items-center mb-4">
              <Image
                src="/IDOC_logo.png"
                alt="iDOC Dental Lab"
                width={160}
                height={64}
                className="h-10 w-auto object-contain"
              />
            </Link>
            <p className="text-[13px] leading-relaxed text-white/40 max-w-xs">
              Full-service dental laboratory in Cypress, CA. In-house CAD/CAM
              milling, 3D printing, and digital workflows. Serving 500+ dental
              practices since 2001.
            </p>
            <a
              href="tel:+17145550000"
              className="mt-4 block text-[13px] text-white/30 hover:text-white/60 transition-colors"
            >
              (714) 555-0000
            </a>
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
                    <Link
                      href={l.href}
                      className="text-[13px] text-white/40 transition-colors hover:text-white/70"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

        </div>

        {/* Bottom */}
        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 md:flex-row">
          <p className="text-[11px] text-white/25">
            © {new Date().getFullYear()} iDOC Dental Lab. All rights reserved.
          </p>
          <p className="text-[11px] text-white/15">
            Cypress, CA · Serving Southern California since 2001
          </p>
        </div>
      </div>
    </footer>
  );
}