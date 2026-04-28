const testimonials = [
  {
    quote:
      "I've been working with iDOC for about 3 years and they have been great from the beginning. Communication is always prompt and the work is consistently excellent.",
    name: "Dr. Arvin Ahmadiah",
    role: "Private Practice, CA",
    initials: "AA",
  },
  {
    quote:
      "The bridge fit perfectly with only slight adjustments and it looked phenomenal. My patient was thrilled. Thank you for your fine work on this case.",
    name: "Charles Roberts, DMD",
    role: "Roberts Dental Group",
    initials: "CR",
  },
  {
    quote:
      "You're the best lab I've ever worked with and always super concerned with results. You're the standard I compare every other lab to.",
    name: "Dr. Shaelan",
    role: "General Practice, CA",
    initials: "DS",
  },
];

export default function Testimonials() {
  return (
    <section className="bg-surface px-5 py-20 md:px-8">
      <div className="mx-auto max-w-6xl">

        <div className="mb-12">
          <p className="mb-3 text-[10px] font-medium uppercase tracking-widest text-ink-3">
            What doctors say
          </p>
          <h2 className="font-serif text-[32px] text-ink md:text-[40px]">
            Trusted by practices<br />across California.
          </h2>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="flex flex-col rounded-2xl border border-surface-3 bg-white p-7"
            >
              <div className="mb-4 flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg key={i} viewBox="0 0 12 12" fill="#1A5C3A" className="h-3 w-3">
                    <path d="M6 1l1.4 2.8 3.1.4-2.2 2.2.5 3.1L6 8l-2.8 1.5.5-3.1L1.5 4.2l3.1-.4z" />
                  </svg>
                ))}
              </div>

              <p className="flex-1 text-[13px] leading-relaxed text-ink-3 italic">
                &ldquo;{t.quote}&rdquo;
              </p>

              <div className="mt-6 flex items-center gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-50 text-[11px] font-medium text-green-700">
                  {t.initials}
                </div>
                <div>
                  <p className="text-[13px] font-medium text-ink">{t.name}</p>
                  <p className="text-[11px] text-ink-3">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}