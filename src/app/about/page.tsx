import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About",
  description:
    "IDOC Dental Lab has served Southern California dental practices for over 20 years. Learn about our story, values, and commitment to quality.",
};

const values = [
  {
    title: "People first.",
    desc: "Denture patients have a right to chew steak too. Every restoration we make is for a real person — not a case number. We don't forget that.",
  },
  {
    title: "Call us. We pick up.",
    desc: "Our CS team knows your cases by name. Questions, updates, problems — you get a real answer from someone who actually works here.",
  },
  {
    title: "Fit before it ships.",
    desc: "We'd rather call you about a delay than send you a case that doesn't seat. Our QC process isn't a formality — it's the last person who checks before your patient sits down.",
  },
  {
    title: "We know what frustrates you.",
    desc: "Cases that come back wrong. Remakes that disappear into a void. No one who knows your account when you call. We've heard it for 20 years — and we built IDOC to be the answer.",
  },
];

const milestones = [
  { year: "2001", event: "Founded in Garden Grove, CA — one room, a few mills, and a belief that local labs could do better" },
  { year: "2008", event: "Invested in in-house CAD/CAM before it was standard" },
  { year: "2014", event: "Moved to a fully digital workflow end-to-end" },
  { year: "2018", event: "Added in-house 3D printing" },
  { year: "2021", event: "Passed 500 active practice partners across Southern California" },
  { year: "2024", event: "Launched digital case submission — no impressions, no shipping delays" },
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
            We've been doing this<br />since 2001.
          </h1>
          <p className="max-w-xl text-[15px] leading-relaxed text-ink-3">
            Not a startup. Not a DSO. A dental lab in Orange County, California —
            built by technicians, run by people who care whether the case seats right.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="bg-surface px-5 py-20 md:px-8">
        <div className="mx-auto max-w-6xl grid gap-12 md:grid-cols-2 md:gap-20 items-start">
          <div>
            <h2 className="mb-5 font-serif text-[28px] leading-tight text-ink md:text-[36px]">
              A lab that remembers why this work matters.
            </h2>
            <div className="space-y-4 text-[14px] leading-relaxed text-ink-3">
              <p>
                Our founder used to say: <em>"Denture patients have a right to chew steak too."</em>{" "}
                That's not a tagline. That's the reason IDOC exists.
              </p>
              <p>
                When every case is just a number, that patient on the other end of the
                restoration stops being a person. We started IDOC because we didn't want
                to work that way.
              </p>
              <p>
                Twenty years later, same belief. We invested in CAD/CAM early, built
                out full digital workflows, added 3D printing — not to grow faster,
                but to do better work for the same reason we started.
              </p>
              <p>
                50 technicians. 500+ practices. Every case still goes out the door
                with someone's name on it.
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4">
            {[
              { stat: "20+", label: "Years in business" },
              { stat: "500+", label: "Dental practices served" },
              { stat: "50", label: "Skilled technicians" },
              { stat: "<3%", label: "Remake rate" },
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
            How we work.
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
            How we got here.
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
              Send us a case. See the difference.
            </h2>
            <p className="mt-2 text-[14px] text-white/50">
              Free UPS pickup. No contracts. If it's not right, we remake it.
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