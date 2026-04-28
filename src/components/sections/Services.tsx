import Link from "next/link";

const services = [
  {
    id: "implant",
    name: "Implant Prosthetics",
    desc: "Custom abutments, crowns, and bridges with our signature Komplett Bundle — everything for a complete implant restoration at one flat price.",
    tag: "Most popular",
    featured: true,
    href: "/services#implant",
  },
  {
    id: "crown",
    name: "Crown & Bridge",
    desc: "Zirconia, PFM, e.max — premium materials milled in-house for perfect fit and natural aesthetics.",
    tag: null,
    featured: false,
    href: "/services#crown",
  },
  {
    id: "removable",
    name: "Removables",
    desc: "Digital and conventional full/partial dentures. Precision-fitted, patient-ready.",
    tag: null,
    featured: false,
    href: "/services#removable",
  },
  {
    id: "appliance",
    name: "Appliances",
    desc: "Nightguards, mouthguards, and orthodontic retainers — crafted for comfort and durability.",
    tag: null,
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
              <div
                className={`mb-5 h-2 w-2 rounded-full ${
                  s.featured ? "bg-green-400" : "bg-surface-3"
                }`}
              />

              <h3
                className={`mb-2 text-[15px] font-medium ${
                  s.featured ? "text-white" : "text-ink"
                }`}
              >
                {s.name}
              </h3>

              <p
                className={`flex-1 text-[13px] leading-relaxed ${
                  s.featured ? "text-white/50" : "text-ink-3"
                }`}
              >
                {s.desc}
              </p>

              {s.tag && (
                <span className="mt-4 inline-flex w-fit rounded-full bg-green-700/30 px-2.5 py-0.5 text-[10px] font-medium text-green-300">
                  {s.tag}
                </span>
              )}
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