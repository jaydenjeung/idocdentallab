const steps = [
  {
    number: "01",
    title: "Request a pickup",
    desc: "Request a free pickup from your office — local service in Orange County and nearby, or schedule UPS nationwide.",
  },
  {
    number: "02",
    title: "We fabricate",
    desc: "Our technicians use in-house CAD/CAM and 3D printing to craft your case to spec. Most cases delivered in 3–5 business days.",
  },
  {
    number: "03",
    title: "Delivered to you",
    desc: "Your case ships back fast. If anything needs adjustment, our remake policy has you covered — no questions asked.",
  },
];

export default function HowItWorks() {
  return (
    <section className="bg-white px-5 py-20 md:px-8">
      <div className="mx-auto max-w-6xl">

        {/* Header */}
        <div className="mb-14">
          <p className="mb-3 text-[10px] font-medium uppercase tracking-widest text-ink-3">
            How it works
          </p>
          <h2 className="font-serif text-[32px] text-ink md:text-[40px]">
            Simple to start.<br />Easy to stay.
          </h2>
        </div>

        {/* Steps */}
        <div className="grid gap-4 md:grid-cols-3">
          {steps.map((s, i) => (
            <div
              key={s.number}
              className="relative rounded-2xl border border-surface-3 bg-surface p-7"
            >
              {i < steps.length - 1 && (
                <div className="absolute -right-3 top-1/2 hidden -translate-y-1/2 text-ink-4 md:block">
                  →
                </div>
              )}
              <div className="mb-5 font-mono text-[13px] text-ink-4">
                {s.number}
              </div>
              <h3 className="mb-3 font-serif text-[20px] text-ink">
                {s.title}
              </h3>
              <p className="text-[13px] leading-relaxed text-ink-3">
                {s.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}