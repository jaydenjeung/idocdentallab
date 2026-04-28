import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About",
  description:
    "iDOC Dental Lab has served Southern California dental practices for over 20 years. Learn about our story, values, and commitment to quality.",
};

const values = [
  {
    title: "People first.",
    desc: "Behind every restoration is a patient. We never forget that our work affects real people's lives — and we take that seriously.",
  },
  {
    title: "In-house, always.",
    desc: "We don't outsource. Every case is fabricated in our Cypress facility by our own technicians, on our own equipment.",
  },
  {
    title: "Precision over speed.",
    desc: "Fast turnaround matters — but not at the cost of fit. Our QC process exists to make sure every case is right before it ships.",
  },
  {
    title: "Long-term partnerships.",
    desc: "We don't chase volume. We build relationships with practices that value quality, communication, and consistency.",
  },
];

const milestones = [
  { year: "2001", event: "iDOC founded in Cypress, CA" },
  { year: "2008", event: "Introduced in-house CAD/CAM milling" },
  { year: "2014", event: "Expanded to full digital workflow" },
  { year: "2018", event: "Added in-house 3D printing capabilities" },
  { year: "2021", event: "Reached 500+ active dental practice partners" },
  { year: "2024", event: "Launched digital case submission platform" },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-white px-5 py-20 md:px-8 md:py-28">
        <div className="mx-auto max-w-6xl">
          <p className="mb-4 text-[10px] font-medium uppercase tracking-widest text-ink-3">
            Our story
          </p>
          <h1 className="mb-6 font-serif text-[40px] leading-[1.05] tracking-[-1px] text-ink md:text-[56px]">
            20 years of precision.<br />Built on trust.
          </h1>
          <p className="max-w-xl text-[15px] leading-relaxed text-ink-3">
            iDOC Dental Lab was founded in Cypress, California with a simple belief —
            that dental practices deserve a lab partner they can rely on, every single case.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="bg-surface px-5 py-20 md:px-8">
        <div className="mx-auto max-w-6xl grid gap-12 md:grid-cols-2 md:gap-20 items-start">
          <div>
            <h2 className="mb-5 font-serif text-[28px] leading-tight text-ink md:text-[36px]">
              Southern California&apos;s premier dental lab.
            </h2>
            <div className="space-y-4 text-[14px] leading-relaxed text-ink-3">
              <p>
                Since 2001, iDOC has been fabricating dental restorations for practices
                across Southern California. What started as a small lab with a commitment
                to craftsmanship has grown into a full-service digital facility serving
                over 500 dental practices.
              </p>
              <p>
                We invested in CAD/CAM technology early — before it was standard —
                because we believed digital precision would set a new bar for what
                dental labs could deliver. Today, every case we produce runs through
                an end-to-end digital workflow.
              </p>
              <p>
                But technology is only part of the story. The other part is the team
                of 50 skilled technicians who bring care and expertise to every
                restoration that leaves our facility.
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4">
            {[
              { stat: "20+", label: "Years in business" },
              { stat: "500+", label: "Dental practices served" },
              { stat: "50", label: "Skilled technicians" },
              { stat: "3–5", label: "Day avg. turnaround" },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-2xl border border-surface-3 bg-white p-6"
              >
                <div className="font-serif text-[36px] leading-none text-green-700">
                  {item.stat}
                </div>
                <div className="mt-1 text-[12px] text-ink-3">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-white px-5 py-20 md:px-8">
        <div className="mx-auto max-w-6xl">
          <p className="mb-3 text-[10px] font-medium uppercase tracking-widest text-ink-3">
            What we stand for
          </p>
          <h2 className="mb-10 font-serif text-[32px] text-ink">
            Our values.
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => (
              <div
                key={v.title}
                className={`rounded-2xl border p-6 ${
                  i === 0
                    ? "border-green-700 bg-green-900"
                    : "border-surface-3 bg-surface"
                }`}
              >
                <div
                  className={`mb-3 h-1.5 w-6 rounded-full ${
                    i === 0 ? "bg-green-400" : "bg-green-700"
                  }`}
                />
                <h3
                  className={`mb-2 font-serif text-[18px] ${
                    i === 0 ? "text-white" : "text-ink"
                  }`}
                >
                  {v.title}
                </h3>
                <p
                  className={`text-[13px] leading-relaxed ${
                    i === 0 ? "text-white/60" : "text-ink-3"
                  }`}
                >
                  {v.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="bg-surface px-5 py-20 md:px-8">
        <div className="mx-auto max-w-6xl">
          <p className="mb-3 text-[10px] font-medium uppercase tracking-widest text-ink-3">
            Our history
          </p>
          <h2 className="mb-10 font-serif text-[32px] text-ink">
            Milestones.
          </h2>
          <div className="relative border-l border-surface-3 pl-8 space-y-8">
            {milestones.map((m) => (
              <div key={m.year} className="relative">
                <div className="absolute -left-[33px] h-3 w-3 rounded-full border-2 border-green-700 bg-white" />
                <div className="font-mono text-[11px] text-green-700 mb-1">{m.year}</div>
                <div className="text-[14px] text-ink-2">{m.event}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-green-900 px-5 py-20 md:px-8">
        <div className="mx-auto max-w-6xl flex flex-col items-center text-center gap-6 md:flex-row md:justify-between md:text-left">
          <div>
            <h2 className="font-serif text-[28px] text-white md:text-[36px]">
              Join 500+ practices across Southern California.
            </h2>
            <p className="mt-2 text-[14px] text-white/50">
              Free UPS pickup. No contracts. Just great work.
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