import Link from "next/link";

const services = [
  {
    id: "implant",
    name: "Implant Prosthetics",
    desc: "Complete full-arch solutions from removable overdentures to fixed zirconia — 9 models across the Komplett X series, one flat price.",
    tag: "Most popular",
    badge: "X1 – X9",
    meta: ["Removable & Fixed", "All-on-4 / All-on-6", "CAD/CAM Zirconia"],
    featured: true,
    href: "/services#implant",
  },
  {
    id: "crown",
    name: "Crown & Bridge",
    desc: "Zirconia, PFM, e.max — premium materials milled in-house for perfect fit and natural aesthetics.",
    tag: null,
    badge: null,
    meta: null,
    featured: false,
    href: "/services#crown",
  },
  {
    id: "removable",
    name: "Removables",
    desc: "Digital and conventional full/partial dentures. Precision-fitted, patient-ready.",
    tag: null,
    badge: null,
    meta: null,
    featured: false,
    href: "/services#removable",
  },
  {
    id: "appliance",
    name: "Appliances",
    desc: "Nightguards, mouthguards, and orthodontic retainers — crafted for comfort and durability.",
    tag: null,
    badge: null,
    meta: null,
    featured: false,
    href: "/services#appliance",
  },
];

export default function Services() {
  return (
    <section className="bg-white px-5 py-20 md:px-8">
      <div className="mx-auto max-w-6xl">

        {/* Header */}
        <div className="mb-12 flex items-end justify-between">
          <div>
            <p className="mb-2 text-[10px] font-medium uppercase tracking-widest text-ink-3">
              What we make
            </p>
            <h2 className="font-serif text-[32px] text-ink">
              Full-service lab,<br />under one roof.
            </h2>
          </div>
          <Link
            href="/services"
            className="hidden text-sm text-ink-3 transition-colors hover:text-ink md:block"
          >
            View all services →
          </Link>
        </div>

        {/* Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s) => (
            <Link
              key={s.id}
              href={s.href}
              className={`group flex flex-col rounded-2xl border p-6 transition-all duration-150 hover:shadow-sm ${
                s.featured
                  ? "border-green-700 bg-green-900 hover:bg-green-800"
                  : "border-surface-3 bg-white hover:border-ink-4"
              }`}
            >
              {/* Top row: dot + badge */}
              <div className="mb-5 flex items-center justify-between">
                <div className={`h-2 w-2 rounded-full ${s.featured ? "bg-green-400" : "bg-surface-3"}`} />
                {s.badge && (
                  <span className="rounded-full border border-green-600/40 bg-green-800/50 px-2 py-0.5 text-[10px] font-semibold tracking-wider text-green-300">
                    {s.badge}
                  </span>
                )}
              </div>

              <h3 className={`mb-2 text-[15px] font-medium ${s.featured ? "text-white" : "text-ink"}`}>
                {s.name}
              </h3>

              <p className={`flex-1 text-[13px] leading-relaxed ${s.featured ? "text-white/50" : "text-ink-3"}`}>
                {s.desc}
              </p>

              {/* Meta specs — implant only */}
              {s.meta && (
                <div className="mt-4 flex flex-col gap-1.5">
                  {s.meta.map((m) => (
                    <div key={m} className="flex items-center gap-1.5">
                      <svg className="h-3 w-3 flex-shrink-0 text-green-400/60" viewBox="0 0 12 12" fill="none">
                        <path d="M2 6l2.5 2.5L10 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <span className="text-[11px] text-white/40">{m}</span>
                    </div>
                  ))}
                </div>
              )}

              {s.tag && (
                <span className="mt-4 inline-flex w-fit rounded-full bg-green-700/30 px-2.5 py-0.5 text-[10px] font-medium text-green-300">
                  {s.tag}
                </span>
              )}

              {/* Arrow */}
              <div className={`mt-5 flex items-center gap-1 text-[11px] font-medium transition-colors ${
                s.featured ? "text-green-400/60 group-hover:text-green-300" : "text-ink-4 group-hover:text-ink-3"
              }`}>
                Learn more
                <svg className="h-3 w-3 transition-transform group-hover:translate-x-0.5" viewBox="0 0 12 12" fill="none">
                  <path d="M2.5 6h7M6.5 3l3 3-3 3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </Link>
          ))}
        </div>

        {/* Mobile see all */}
        <div className="mt-6 text-center md:hidden">
          <Link href="/services" className="text-sm text-ink-3 hover:text-ink">
            View all services →
          </Link>
        </div>

      </div>
    </section>
  );
}