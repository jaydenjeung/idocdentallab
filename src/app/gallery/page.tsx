import type { Metadata } from "next";
import Link from "next/link";
import GalleryReelsWrapper from "@/components/sections/GalleryReelsWrapper";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Browse IDOC Dental Lab's case gallery — implant prosthetics, crowns, bridges, and more. Real cases, real results.",
};

export default function GalleryPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-white px-5 py-20 md:px-8 md:py-28">
        <div className="mx-auto max-w-6xl">
          <p className="mb-4 text-[10px] font-medium uppercase tracking-widest text-ink-3">
            Our work
          </p>
          <h1 className="mb-6 font-serif text-[40px] leading-[1.05] tracking-[-1px] text-ink md:text-[56px]">
            Real cases.<br />Real results.
          </h1>
          <p className="max-w-xl text-[15px] leading-relaxed text-ink-3">
            Every restoration here was fabricated in-house by our team —
            full-arch implant cases, zirconia bridges, digital overdentures, and more.
          </p>
        </div>
      </section>

      {/* Gallery grid */}
      <section className="bg-surface px-5 py-12 md:px-8 md:py-16">
        <div className="mx-auto max-w-6xl">
          <GalleryReelsWrapper />

          <p className="mt-10 text-center text-[13px] text-ink-3">
            New cases added regularly.{" "}
            <a
              href="https://www.instagram.com/idocdentallab"
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-700 underline underline-offset-2"
            >
              Follow us on Instagram
            </a>{" "}
            for more.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-green-900 px-5 py-20 md:px-8">
        <div className="mx-auto max-w-6xl flex flex-col items-center text-center gap-6 md:flex-row md:justify-between md:text-left">
          <div>
            <h2 className="font-serif text-[28px] text-white md:text-[36px]">
              Ready to see your cases here?
            </h2>
            <p className="mt-2 text-[14px] text-white/50">
              Free UPS pickup. Results in 3–5 days.
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