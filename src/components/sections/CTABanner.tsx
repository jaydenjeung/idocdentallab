import Link from "next/link";

export default function CTABanner() {
  return (
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
        <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
          <Link
            href="/get-started"
            className="rounded-full bg-white px-8 py-3.5 text-[13px] font-medium text-green-900 transition-opacity hover:opacity-90"
          >
            Get Started
          </Link>
          <a
            href="tel:+18773884362"
            className="rounded-full border border-white/20 px-8 py-3.5 text-[13px] text-white/60 transition-colors hover:border-white/40 hover:text-white/80"
          >
            (877) 388-4362
          </a>
        </div>
      </div>
    </section>
  );
}