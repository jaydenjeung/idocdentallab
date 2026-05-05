import Link from "next/link";

export default function Hero() {
  return (
    <section className="bg-[#0a0f0d]">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="grid min-h-[560px] items-center gap-0 md:grid-cols-2">

          {/* Left — copy */}
          <div className="py-16 md:py-20 md:pr-12 md:border-r md:border-white/5">

            {/* Badge */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-green-500/25 px-3 py-1.5">
              <div className="h-1.5 w-1.5 rounded-full bg-green-400" />
              <span className="text-[10px] font-medium uppercase tracking-widest text-green-400">
                CDL Certified Full Service Dental Lab
              </span>
            </div>

            <h1 className="mb-5 font-serif text-[44px] leading-[1.02] tracking-[-1.5px] text-white md:text-[56px]">
              Your chair time is everything. We handle the rest.<br />
              <span className="text-green-400">People</span> first.
            </h1>

            <p className="mb-8 max-w-md text-[15px] leading-relaxed text-white/40 font-light">
              From single-unit crowns to full-arch implant cases — IDOC delivers
              lab-grade quality with in-house CAD/CAM milling and 3D printing,
              backed by 20+ years of expertise.
            </p>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                href="/get-started"
                className="inline-flex items-center justify-center rounded-full bg-green-700 px-7 py-3 text-[14px] font-medium text-white transition-opacity hover:opacity-90"
              >
                Get started
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center justify-center rounded-full border border-white/15 px-7 py-3 text-[14px] text-white/60 transition-colors hover:border-white/30 hover:text-white/80"
              >
                View services →
              </Link>
            </div>
          </div>

          {/* Right — video placeholder */}
          <div className="hidden md:flex items-center justify-center py-16 pl-12">
            <div className="relative w-full">

              {/* Video container */}
              <div className="aspect-video w-full rounded-2xl bg-[#0d1510] border border-white/6 flex flex-col items-center justify-center gap-4 overflow-hidden">
                {/* Play button */}
                <div className="flex h-14 w-14 items-center justify-center rounded-full border border-green-500/40 transition-all hover:border-green-400/70 hover:scale-105 cursor-pointer">
                  <div className="ml-1 h-0 w-0 border-b-[9px] border-t-[9px] border-l-[15px] border-b-transparent border-t-transparent border-l-green-400" />
                </div>
                <p className="text-[10px] uppercase tracking-widest text-white/20">
                  Company overview
                </p>
              </div>

              {/* Floating — years */}
              <div className="absolute -bottom-4 -left-4 rounded-xl bg-[#0a0f0d] border border-white/8 px-4 py-3">
                <div className="font-serif text-2xl text-white leading-none">20+</div>
                <div className="mt-0.5 text-[11px] text-white/30">Years of expertise</div>
              </div>

              {/* Floating — CAD/CAM */}
              <div className="absolute -top-4 -right-4 rounded-xl bg-green-900/90 border border-green-500/20 px-4 py-3">
                <div className="text-[10px] text-green-400/60 mb-0.5">In-house</div>
                <div className="text-[13px] font-medium text-white">CAD/CAM milling</div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}