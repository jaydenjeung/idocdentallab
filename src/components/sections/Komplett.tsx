import Link from "next/link";

const features = [
  "CAD/CAM custom abutment (any implant system)",
  "Zirconia or PFM crown — premium material",
  "Lab analog included",
  "Lab screw included",
  "One flat price — no hidden fees",
];

export default function Komplett() {
  return (
    <section className="bg-surface px-5 py-20 md:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="rounded-3xl border border-surface-3 bg-white p-8 md:p-12">
          <div className="grid gap-10 md:grid-cols-2 md:gap-16 items-center">

            {/* Left */}
            <div>
              <p className="mb-3 text-[10px] font-medium uppercase tracking-widest text-ink-3">
                Featured product
              </p>
              <h2 className="mb-4 font-serif text-[36px] leading-tight text-ink md:text-[44px]">
                The Komplett<br />Bundle
              </h2>
              <p className="mb-6 text-[14px] leading-relaxed text-ink-3">
                Everything you need for a complete implant restoration — crown,
                lab analog, custom abutment, and lab screw — in one simple price.
                No surprises, no add-ons.
              </p>
              <Link
                href="/services#komplett"
                className="inline-flex items-center gap-2 rounded-full bg-green-700 px-6 py-2.5 text-[13px] font-medium text-white transition-opacity hover:opacity-90"
              >
                Learn more →
              </Link>
            </div>

            {/* Right — checklist */}
            <div className="space-y-3">
              {features.map((f) => (
                <div key={f} className="flex items-center gap-3">
                  <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-green-50 border border-green-200">
                    <svg viewBox="0 0 12 12" fill="none" className="h-3 w-3">
                      <path
                        d="M2 6l2.5 2.5L10 3"
                        stroke="#1A5C3A"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <span className="text-[14px] text-ink-2">{f}</span>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}