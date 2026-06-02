import Link from "next/link";

const options = [
  {
    href: "/send-a-case/local-pickup",
    title: "Local pickup",
    badge: "Orange County & nearby",
    description:
      "Request a pickup from your office. Our team will confirm and send our driver or a local courier — often same or next business day.",
    cta: "Request local pickup",
  },
  {
    href: "/send-a-case/ups-pickup",
    title: "UPS pickup",
    badge: "Nationwide",
    description:
      "Schedule a free UPS pickup online. Best if you're outside our local service area.",
    cta: "Schedule UPS pickup",
  },
];

export default function PickupHubPage() {
  return (
    <main className="min-h-screen bg-white">
      <section className="bg-[#0a3d2e] px-6 py-14 md:py-20">
        <div className="max-w-3xl mx-auto">
          <p className="text-[#4ade80] text-sm font-medium tracking-widest uppercase mb-3">
            Send a Case
          </p>
          <h1 className="text-white text-3xl md:text-4xl font-bold leading-tight mb-4">
            Request a case pickup
          </h1>
          <p className="text-white/70 text-base max-w-xl">
            Free pickup from your practice. Choose local service if you&apos;re in Orange
            County or nearby — otherwise schedule UPS.
          </p>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-4 py-10 md:py-14">
        <div className="grid gap-5 sm:grid-cols-2">
          {options.map((opt) => (
            <Link
              key={opt.href}
              href={opt.href}
              className="group flex flex-col rounded-2xl border border-gray-200 p-6 transition-all hover:border-green-600 hover:shadow-[0_8px_30px_rgba(22,101,52,0.08)]"
            >
              <span className="mb-3 inline-block w-fit rounded-full bg-green-50 px-3 py-1 text-[11px] font-medium text-green-800">
                {opt.badge}
              </span>
              <h2 className="text-lg font-semibold text-gray-900 mb-2">{opt.title}</h2>
              <p className="flex-1 text-sm leading-relaxed text-gray-500 mb-6">
                {opt.description}
              </p>
              <span className="text-sm font-medium text-green-700 group-hover:text-green-800">
                {opt.cta} →
              </span>
            </Link>
          ))}
        </div>

        <p className="mt-10 text-center text-sm text-gray-500">
          Questions? Call{" "}
          <a href="tel:+18773884362" className="font-medium text-green-700 hover:underline">
            (877) 388-4362
          </a>{" "}
          Mon–Fri.
        </p>
      </section>
    </main>
  );
}
