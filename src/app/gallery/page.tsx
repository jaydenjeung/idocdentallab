import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Browse iDOC Dental Lab's case gallery — implant prosthetics, crowns, bridges, and more. Real cases, real results.",
};

const categories = ["All", "Implant Prosthetics", "Crown & Bridge", "Removables", "Appliances"];

const cases = [
  { id: 1, category: "Implant Prosthetics", label: "Full-arch implant bridge", sub: "Zirconia · Upper arch" },
  { id: 2, category: "Crown & Bridge", label: "Anterior zirconia crowns", sub: "Layered zirconia · #8–11" },
  { id: 3, category: "Crown & Bridge", label: "Posterior e.max", sub: "e.max CAD · #19–21" },
  { id: 4, category: "Implant Prosthetics", label: "Komplett Bundle", sub: "Custom abutment + PFM · #30" },
  { id: 5, category: "Removables", label: "Digital full denture", sub: "Milled · Upper & lower" },
  { id: 6, category: "Crown & Bridge", label: "3-unit bridge", sub: "Full-contour zirconia · #12–14" },
  { id: 7, category: "Appliances", label: "Dual-laminate nightguard", sub: "Hard/soft · Full arch" },
  { id: 8, category: "Implant Prosthetics", label: "Screw-retained bridge", sub: "Zirconia · Lower arch" },
  { id: 9, category: "Crown & Bridge", label: "Full-mouth reconstruction", sub: "Zirconia · 20 units" },
  { id: 10, category: "Removables", label: "Cast partial framework", sub: "Co-Cr · Lower" },
  { id: 11, category: "Appliances", label: "Essix retainer", sub: "Clear · Upper & lower" },
  { id: 12, category: "Implant Prosthetics", label: "All-on-4 restoration", sub: "Zirconia · Upper arch" },
];

// Placeholder colors per category
const placeholderColors: Record<string, string> = {
  "Implant Prosthetics": "bg-green-50 border-green-100",
  "Crown & Bridge":      "bg-surface-2 border-surface-3",
  "Removables":          "bg-blue-50 border-blue-100",
  "Appliances":          "bg-amber-50 border-amber-100",
};

export default function GalleryPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-white px-5 py-20 md:px-8 md:py-28">
        <div className="mx-auto max-w-6xl">
          <p className="mb-4 text-[10px] font-medium uppercase tracking-widest text-ink-3">
            Our work
          </p>
          <h1 className="mb-6 font-serif text-[40px] leading-[1.05] tracking-[-1px] text-ink md:text-[56px]">
            Real cases.<br />Real results.
          </h1>
          <p className="max-w-xl text-[15px] leading-relaxed text-ink-3">
            Every restoration here was fabricated in-house by our team.
            From single-unit crowns to full-arch implant cases.
          </p>
        </div>
      </section>

      {/* Filter tabs — static for now */}
      <section className="sticky top-14 z-40 border-b border-surface-3 bg-white px-5 md:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="flex gap-1 overflow-x-auto py-3 scrollbar-hide">
            {categories.map((cat, i) => (
              <button
                key={cat}
                className={`shrink-0 rounded-full px-4 py-1.5 text-[13px] transition-colors ${
                  i === 0
                    ? "bg-green-700 text-white"
                    : "text-ink-3 hover:text-ink hover:bg-surface"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="bg-surface px-5 py-12 md:px-8 md:py-16">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {cases.map((c) => (
              <div
                key={c.id}
                className={`group rounded-2xl border overflow-hidden ${
                  placeholderColors[c.category] ?? "bg-surface-2 border-surface-3"
                }`}
              >
                {/* Placeholder image area */}
                <div className="aspect-[4/3] flex items-center justify-center">
                  <div className="text-center">
                    <svg
                      viewBox="0 0 48 48"
                      fill="none"
                      className="mx-auto h-10 w-10 text-ink-4"
                    >
                      <rect x="6" y="10" width="36" height="28" rx="3" stroke="currentColor" strokeWidth="1.5" />
                      <circle cx="18" cy="20" r="4" stroke="currentColor" strokeWidth="1.5" />
                      <path d="M6 32l10-8 8 6 6-4 12 10" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                    </svg>
                    <p className="mt-2 text-[11px] text-ink-4">Photo coming soon</p>
                  </div>
                </div>

                {/* Label */}
                <div className="border-t border-inherit bg-white/60 px-4 py-3">
                  <p className="text-[13px] font-medium text-ink">{c.label}</p>
                  <p className="text-[11px] text-ink-3">{c.sub}</p>
                </div>
              </div>
            ))}
          </div>

          <p className="mt-10 text-center text-[13px] text-ink-3">
            More cases added regularly. Have a specific restoration in mind?{" "}
            <Link href="/get-started" className="text-green-700 underline underline-offset-2">
              Send us a case.
            </Link>
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-green-900 px-5 py-20 md:px-8">
        <div className="mx-auto max-w-6xl flex flex-col items-center text-center gap-6 md:flex-row md:justify-between md:text-left">
          <div>
            <h2 className="font-serif text-[28px] text-white md:text-[36px]">
              Ready to see your cases here?
            </h2>
            <p className="mt-2 text-[14px] text-white/50">
              Free UPS pickup. Results in 3–5 days.
            </p>
          </div>
          <Link
            href="/get-started"
            className="shrink-0 rounded-full bg-white px-8 py-3.5 text-sm font-medium text-green-900 transition-opacity hover:opacity-90"
          >
            Get started →
          </Link>
        </div>
      </section>
    </>
  );
}