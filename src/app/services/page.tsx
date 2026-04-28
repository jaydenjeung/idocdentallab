import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Full-service dental laboratory — implant prosthetics, crown & bridge, removables, and appliances. In-house CAD/CAM milling and 3D printing.",
};

const services = [
  {
    id: "implant",
    number: "01",
    name: "Implant Prosthetics",
    tagline: "Complete restorations, one flat price.",
    desc: "Our signature Komplett Bundle covers everything for a complete implant restoration — custom abutment, zirconia or PFM crown, lab analog, and lab screw. No hidden fees, no add-ons.",
    featured: true,
    tag: "Most popular",
    items: [
      "CAD/CAM custom abutment (any implant system)",
      "Zirconia or PFM crown — premium material",
      "Lab analog included",
      "Lab screw included",
      "One flat price — no hidden fees",
    ],
    turnaround: "5–7 business days",
  },
  {
    id: "crown",
    number: "02",
    name: "Crown & Bridge",
    tagline: "Milled in-house for perfect fit.",
    desc: "Zirconia, PFM, e.max, and PMMA — every unit precision-milled in our in-house CAD/CAM center. Natural shade matching and fast turnaround for single units to full-arch bridges.",
    featured: false,
    tag: null,
    items: [
      "Full-contour zirconia",
      "Layered zirconia (high aesthetics)",
      "PFM (porcelain fused to metal)",
      "e.max press & CAD",
      "PMMA temporaries",
      "Maryland bridges",
    ],
    turnaround: "3–5 business days",
  },
  {
    id: "removable",
    number: "03",
    name: "Removables",
    tagline: "Digital and conventional, patient-ready.",
    desc: "Full and partial dentures crafted with precision. We offer both conventional wax try-in workflows and fully digital dentures — faster turnaround, better fit, fewer remakes.",
    featured: false,
    tag: null,
    items: [
      "Full dentures (conventional)",
      "Digital dentures (milled or printed)",
      "Cast partial frameworks",
      "Flexible partials (Valplast)",
      "Immediate dentures",
      "Denture repairs & relines",
    ],
    turnaround: "5–7 business days",
  },
  {
    id: "appliance",
    number: "04",
    name: "Appliances",
    tagline: "Comfort-fit, built to last.",
    desc: "Nightguards, sports mouthguards, and orthodontic retainers crafted for long-term comfort and durability. Hard, soft, or dual-laminate options available.",
    featured: false,
    tag: null,
    items: [
      "Hard acrylic nightguards",
      "Dual-laminate nightguards",
      "Soft sports mouthguards",
      "Custom-fit mouthguards",
      "Hawley retainers",
      "Essix retainers",
    ],
    turnaround: "3–5 business days",
  },
];

export default function ServicesPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-white px-5 py-20 md:px-8 md:py-28">
        <div className="mx-auto max-w-6xl">
          <p className="mb-4 text-[10px] font-medium uppercase tracking-widest text-ink-3">
            What we make
          </p>
          <h1 className="mb-6 font-serif text-[40px] leading-[1.05] tracking-[-1px] text-ink md:text-[56px]">
            Full-service lab,<br />under one roof.
          </h1>
          <p className="max-w-xl text-[15px] leading-relaxed text-ink-3">
            From single-unit crowns to full-arch implant cases — every restoration
            is fabricated in-house with CAD/CAM precision and finished by hand.
          </p>
        </div>
      </section>

      {/* Services */}
      <section className="bg-surface px-5 pb-24 md:px-8">
        <div className="mx-auto max-w-6xl space-y-6">
          {services.map((s) => (
            <div
              key={s.id}
              id={s.id}
              className={`rounded-3xl border p-8 md:p-10 ${
                s.featured
                  ? "border-green-700 bg-green-900"
                  : "border-surface-3 bg-white"
              }`}
            >
              <div className="grid gap-8 md:grid-cols-2 md:gap-16">
                {/* Left */}
                <div>
                  <div className="mb-4 flex items-center gap-3">
                    <span
                      className={`font-mono text-[11px] ${
                        s.featured ? "text-green-400" : "text-ink-4"
                      }`}
                    >
                      {s.number}
                    </span>
                    {s.tag && (
                      <span className="rounded-full bg-green-700/30 px-2.5 py-0.5 text-[10px] font-medium text-green-300">
                        {s.tag}
                      </span>
                    )}
                  </div>

                  <h2
                    className={`mb-2 font-serif text-[28px] leading-tight md:text-[32px] ${
                      s.featured ? "text-white" : "text-ink"
                    }`}
                  >
                    {s.name}
                  </h2>
                  <p
                    className={`mb-4 text-[13px] font-medium uppercase tracking-wider ${
                      s.featured ? "text-green-400" : "text-green-700"
                    }`}
                  >
                    {s.tagline}
                  </p>
                  <p
                    className={`text-[14px] leading-relaxed ${
                      s.featured ? "text-white/60" : "text-ink-3"
                    }`}
                  >
                    {s.desc}
                  </p>

                  <div
                    className={`mt-6 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-[12px] ${
                      s.featured
                        ? "border-green-600 text-green-300"
                        : "border-surface-3 text-ink-3"
                    }`}
                  >
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${
                        s.featured ? "bg-green-400" : "bg-green-600"
                      }`}
                    />
                    Avg. turnaround: {s.turnaround}
                  </div>
                </div>

                {/* Right — checklist */}
                <div>
                  <p
                    className={`mb-4 text-[10px] font-medium uppercase tracking-widest ${
                      s.featured ? "text-green-400/60" : "text-ink-4"
                    }`}
                  >
                    What&apos;s included
                  </p>
                  <ul className="space-y-3">
                    {s.items.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <svg
                          viewBox="0 0 16 16"
                          fill="none"
                          className={`mt-0.5 h-4 w-4 shrink-0 ${
                            s.featured ? "text-green-400" : "text-green-700"
                          }`}
                        >
                          <circle
                            cx="8"
                            cy="8"
                            r="7"
                            stroke="currentColor"
                            strokeWidth="1"
                            fill={s.featured ? "rgba(74,222,128,0.1)" : "#EDF7F2"}
                          />
                          <path
                            d="M5 8l2 2 4-4"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <span
                          className={`text-[14px] ${
                            s.featured ? "text-white/70" : "text-ink-2"
                          }`}
                        >
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-green-900 px-5 py-20 md:px-8">
        <div className="mx-auto max-w-6xl flex flex-col items-center text-center gap-6 md:flex-row md:justify-between md:text-left">
          <div>
            <h2 className="font-serif text-[28px] text-white md:text-[36px]">
              Ready to send your first case?
            </h2>
            <p className="mt-2 text-[14px] text-white/50">
              Free UPS pickup from your office. No phone calls needed.
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