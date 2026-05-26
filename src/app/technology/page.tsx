import type { Metadata } from "next";
import Link from "next/link";
import TechReelsWrapper from "@/components/sections/TechReelsWrapper";

export const metadata: Metadata = {
  title: "Technology",
  description:
    "IDOC uses in-house CAD/CAM milling, 3D printing, and fully digital workflows to deliver consistent, precise restorations — fewer remakes, faster turnaround.",
};

const pillars = [
  {
    number: "01",
    title: "CAD/CAM Milling",
    subtitle: "Precision you can measure.",
    body: "Every crown, bridge, and abutment is designed digitally and milled in-house from premium blocks. No outsourcing, no variability. The same calibrated machines run every case — so the 500th unit is as accurate as the first.",
    points: [
      "Sub-20-micron marginal accuracy",
      "Consistent fit across every unit",
      "Zirconia, e.max, PMMA, wax — all in-house",
      "No third-party milling center delays",
    ],
  },
  {
    number: "02",
    title: "In-House 3D Printing",
    subtitle: "Fast. Repeatable. Patient-ready.",
    body: "Our 3D printing capabilities cover surgical guides, custom trays, diagnostic models, and printed temporaries. What used to take days now ships the same week — without sacrificing accuracy.",
    points: [
      "High-resolution resin printing",
      "Surgical guide fabrication",
      "Printed diagnostic & working models",
      "Same-week turnaround on most cases",
    ],
  },
  {
    number: "03",
    title: "Digital Workflow",
    subtitle: "From scan to delivery — no impressions needed.",
    body: "We accept digital scan files directly from any intraoral scanner. No physical impressions, no shipping delays, no distortion. Your office uploads the file, we start fabrication the same day.",
    points: [
      "Compatible with all major IOS systems",
      "Direct file upload — no impression shipping",
      "Same-day case start on digital submissions",
      "Real-time case tracking",
    ],
  },
  {
    number: "04",
    title: "Quality Control",
    subtitle: "Every case checked before it ships.",
    body: "Before any restoration leaves our lab, it goes through a multi-point inspection — margins, occlusion, shade, and fit. Our remake rate is under 2%. When a case leaves IDOC, it's ready to seat.",
    points: [
      "Multi-point pre-ship inspection",
      "Shade verification under standardized lighting",
      "Occlusal and marginal fit check",
      "Under 3% remake rate",
    ],
  },
];

export default function TechnologyPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-white px-5 py-20 md:px-8 md:py-28">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-12 md:grid-cols-2 md:gap-16 items-center">
            {/* Left — copy */}
            <div>
              <p className="mb-4 text-[10px] font-medium uppercase tracking-widest text-ink-3">
                Our technology
              </p>
              <h1 className="mb-6 font-serif text-[40px] leading-[1.05] tracking-[-1px] text-ink md:text-[56px]">
                Complex cases.<br />Simple process.
              </h1>
              <p className="mb-4 text-[15px] leading-relaxed text-ink-3">
                Full-arch implant restorations. Zirconia bridges. Digital overdentures.
                IDOC handles it all in-house — from scan file to final delivery,
                with no outsourcing and no surprises.
              </p>
              <p className="text-[15px] leading-relaxed text-ink-3">
                Sub-20-micron marginal accuracy. Under 2% remake rate.
                3–5 day turnaround. Cases that seat right the first time, every time.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Link
                  href="/get-started"
                  className="inline-flex items-center justify-center rounded-full bg-green-700 px-7 py-3 text-[14px] font-medium text-white transition-opacity hover:opacity-90"
                >
                  Send a case
                </Link>
                <Link
                  href="/services"
                  className="inline-flex items-center justify-center rounded-full border border-black/15 px-7 py-3 text-[14px] text-ink-3 transition-colors hover:border-black/30 hover:text-ink"
                >
                  View services →
                </Link>
              </div>
            </div>

            {/* Right — reels */}
            <TechReelsWrapper />
          </div>
        </div>
      </section>

      {/* Trust bar */}
      <section className="border-y border-surface-3 bg-surface px-5 py-8 md:px-8">
        <div className="mx-auto max-w-6xl grid grid-cols-2 gap-6 md:grid-cols-4">
          {[
            { stat: "<3%", label: "Remake rate" },
            { stat: "5–7", label: "Day avg. turnaround" },
            { stat: "100%", label: "In-house fabrication" },
            { stat: "20+", label: "Years of precision" },
          ].map((item) => (
            <div key={item.label}>
              <div className="font-serif text-[28px] text-green-700">{item.stat}</div>
              <div className="text-[12px] text-ink-3">{item.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Pillars */}
      <section className="bg-white px-5 py-20 md:px-8">
        <div className="mx-auto max-w-6xl space-y-6">
          {pillars.map((p, i) => (
            <div
              key={p.number}
              className={`rounded-3xl border p-8 md:p-10 ${
                i === 0
                  ? "border-green-700 bg-green-900"
                  : "border-surface-3 bg-surface"
              }`}
            >
              <div className="grid gap-8 md:grid-cols-2 md:gap-16">
                <div>
                  <span className={`font-mono text-[11px] ${i === 0 ? "text-green-400" : "text-ink-4"}`}>
                    {p.number}
                  </span>
                  <h2 className={`mt-3 font-serif text-[28px] leading-tight md:text-[32px] ${i === 0 ? "text-white" : "text-ink"}`}>
                    {p.title}
                  </h2>
                  <p className={`mt-1 mb-4 text-[13px] font-medium uppercase tracking-wider ${i === 0 ? "text-green-400" : "text-green-700"}`}>
                    {p.subtitle}
                  </p>
                  <p className={`text-[14px] leading-relaxed ${i === 0 ? "text-white/60" : "text-ink-3"}`}>
                    {p.body}
                  </p>
                </div>
                <div>
                  <p className={`mb-4 text-[10px] font-medium uppercase tracking-widest ${i === 0 ? "text-green-400/60" : "text-ink-4"}`}>
                    Key advantages
                  </p>
                  <ul className="space-y-3">
                    {p.points.map((point) => (
                      <li key={point} className="flex items-start gap-3">
                        <svg viewBox="0 0 16 16" fill="none" className={`mt-0.5 h-4 w-4 shrink-0 ${i === 0 ? "text-green-400" : "text-green-700"}`}>
                          <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1" fill={i === 0 ? "rgba(74,222,128,0.1)" : "#EDF7F2"} />
                          <path d="M5 8l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span className={`text-[14px] ${i === 0 ? "text-white/70" : "text-ink-2"}`}>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Why it matters */}
      <section className="bg-surface px-5 py-20 md:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-12 md:grid-cols-2 md:gap-20 items-center">
            <div>
              <p className="mb-3 text-[10px] font-medium uppercase tracking-widest text-ink-3">
                Why it matters
              </p>
              <h2 className="mb-5 font-serif text-[32px] leading-tight text-ink md:text-[40px]">
                Less chairtime.<br />Fewer remakes.<br />Happier patients.
              </h2>
              <p className="text-[14px] leading-relaxed text-ink-3">
                Every hour your team spends on a remake is an hour away from new patients.
                Our digital workflow and in-house QC exist for one reason — to make sure
                the case seats right the first time, every time.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Fewer remakes", desc: "Digital precision means less adjustment at the chair." },
                { label: "Faster turnaround", desc: "In-house milling ships in 3–5 days, not weeks." },
                { label: "No impression hassle", desc: "Send a scan file — we handle the rest." },
                { label: "Predictable results", desc: "Same process, same outcome, every single case." },
              ].map((item) => (
                <div key={item.label} className="rounded-2xl border border-surface-3 bg-white p-5">
                  <div className="mb-2 h-1.5 w-6 rounded-full bg-green-700" />
                  <p className="text-[13px] font-medium text-ink">{item.label}</p>
                  <p className="mt-1 text-[12px] leading-relaxed text-ink-3">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-green-900 px-5 py-20 md:px-8">
        <div className="mx-auto max-w-6xl flex flex-col items-center text-center gap-6 md:flex-row md:justify-between md:text-left">
          <div>
            <h2 className="font-serif text-[28px] text-white md:text-[36px]">
              See the difference in your next case.
            </h2>
            <p className="mt-2 text-[14px] text-white/50">
              Free UPS pickup. No phone calls. Results in 3–5 days.
            </p>
          </div>
          <Link
            href="/get-started"
            className="shrink-0 rounded-full bg-white px-8 py-3.5 text-sm font-medium text-green-900 transition-opacity hover:opacity-90"
          >
            Send a case →
          </Link>
        </div>
      </section>
    </>
  );
}