import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Download RX | IDOC Dental Lab",
  description:
    "Download the IDOC Universal Lab Slip. Required for all case submissions.",
};

export default function DownloadRxPage() {
  return (
    <>
      <section className="bg-white px-5 py-20 md:px-8 md:py-28">
        <div className="mx-auto max-w-6xl">
          <p className="mb-4 text-[10px] font-medium uppercase tracking-widest text-ink-3">
            Send a Case
          </p>
          <h1 className="mb-4 font-serif text-[40px] leading-[1.05] tracking-[-1px] text-ink md:text-[52px]">
            Download RX
          </h1>
          <p className="mb-10 max-w-lg text-[15px] leading-relaxed text-ink-3">
            A lab slip is required for every case. Print, fill out, and include
            it with your submission — physical or digital.
          </p>

          {/* Main download card */}
          <div className="flex flex-col gap-8 md:flex-row md:items-start md:gap-12">

            {/* PDF preview */}
            <div className="w-full md:w-[420px] shrink-0">
              <div className="overflow-hidden rounded-2xl border border-surface-3 bg-surface">
                <iframe
                  src="/idoc-lab-slip.pdf"
                  className="h-[540px] w-full"
                  title="IDOC Universal Lab Slip preview"
                />
              </div>
            </div>

            {/* Info + download */}
            <div className="flex flex-col gap-6">
              <div>
                <h2 className="mb-2 font-serif text-[26px] text-ink">
                  IDOC Universal Lab Slip
                </h2>
                <p className="text-[14px] leading-relaxed text-ink-3">
                  Use this form for all case types — crowns, bridges, implants,
                  removables, and appliances. Fill out completely before
                  submitting. Incomplete slips may delay your case.
                </p>
              </div>

              <a
                href="/idoc-lab-slip.pdf"
                download="IDOC_Lab_Slip.pdf"
                className="inline-flex w-fit items-center gap-2 rounded-full bg-green-700 px-7 py-3.5 text-sm font-medium text-white transition-opacity hover:opacity-90"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
                  <path d="M14 2v6h6"/>
                  <path d="M12 18v-6M9 15l3 3 3-3"/>
                </svg>
                Download Lab Slip
              </a>
              <p className="text-[12px] text-ink-3">PDF · 2 pages</p>

              {/* Tips */}
              <div className="rounded-2xl border border-surface-3 bg-surface p-5 space-y-3">
                <p className="text-[11px] font-medium uppercase tracking-widest text-ink-3">
                  Tips
                </p>
                {[
                  "Fill out patient name, tooth #, product, and shade before sending.",
                  "For implant cases, include implant manufacturer and SKU#.",
                  "Digital cases: send via your scanner or upload your scan file directly to the portal.",
                  "Physical cases: include the printed slip inside the case box.",
                ].map((tip) => (
                  <div key={tip} className="flex items-start gap-2.5">
                    <div className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-green-700" />
                    <p className="text-[13px] leading-relaxed text-ink-3">{tip}</p>
                  </div>
                ))}
              </div>

              {/* Questions */}
              <p className="text-[13px] text-ink-3">
                Questions about filling out a case?{" "}
                <a
                  href="tel:+18773884362"
                  className="text-green-700 hover:underline"
                >
                  Call us at (877) 388-4362
                </a>{" "}
                — our CS team picks up.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Coming soon: case-specific RX */}
      <section className="bg-surface px-5 py-16 md:px-8">
        <div className="mx-auto max-w-6xl">
          <p className="mb-3 text-[10px] font-medium uppercase tracking-widest text-ink-3">
            Coming soon
          </p>
          <h2 className="mb-2 font-serif text-[26px] text-ink">
            Case-specific lab slips
          </h2>
          <p className="text-[14px] text-ink-3 max-w-md">
            Dedicated slips for implants, removables, and appliances — coming soon.
          </p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {[
              "Implant / Komplett Bundle",
              "Crown & Bridge",
              "Removables",
              "Appliances",
            ].map((label) => (
              <div
                key={label}
                className="rounded-2xl border border-dashed border-surface-3 px-5 py-4 text-[13px] text-ink-3"
              >
                {label}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-green-900 px-5 py-16 md:px-8">
        <div className="mx-auto max-w-6xl flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="font-serif text-[24px] text-white md:text-[30px]">
              Ready to send your case?
            </h2>
            <p className="mt-1 text-[14px] text-white/50">
              Free pickup — local in OC &amp; nearby, or UPS nationwide.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href="/send-a-case/pickup"
              className="rounded-full border border-white/20 px-6 py-3 text-sm font-medium text-white/80 transition-colors hover:bg-white/10"
            >
              Request Case Pickup
            </Link>
            <Link
              href="/send-a-case/digital-impression"
              className="rounded-full bg-white px-6 py-3 text-sm font-medium text-green-900 transition-opacity hover:opacity-90"
            >
              Send Digital Impression →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}