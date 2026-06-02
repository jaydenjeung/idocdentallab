import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { EVIDENT_DENTIST_PORTAL_URL } from "@/lib/portal";
import { INSTAGRAM_PROFILE_URL, withIgUtm } from "@/lib/instagram";

export const metadata: Metadata = {
  title: "Start with IDOC",
  description:
    "Came from Instagram? Send your first case, request free pickup, or sign in to the Evident dentist portal.",
  robots: { index: false, follow: true },
};

const actions = [
  {
    href: withIgUtm("/get-started"),
    title: "New to IDOC?",
    badge: "Most popular",
    description:
      "Tell us about your practice. We’ll reach out within one business day to set up your first case and pickup.",
    cta: "Get started",
    primary: true,
  },
  {
    href: withIgUtm("/send-a-case/pickup"),
    title: "Send a case now",
    badge: "Free pickup",
    description:
      "Ready to ship? Request local pickup in Orange County & nearby, or schedule UPS nationwide.",
    cta: "Request pickup",
    primary: false,
  },
  {
    href: EVIDENT_DENTIST_PORTAL_URL,
    title: "Already our customer?",
    badge: "Evident portal",
    description:
      "Sign in to submit cases, track orders, and communicate with the lab — same portal you’ve been using.",
    cta: "Dentist sign-in",
    primary: false,
    external: true,
  },
];

const quickLinks = [
  { label: "Digital impression", href: withIgUtm("/send-a-case/digital-impression") },
  { label: "Print UPS label", href: withIgUtm("/send-a-case/shipping-label") },
  { label: "See our work", href: withIgUtm("/gallery") },
  { label: "Services", href: withIgUtm("/services") },
];

const highlights = [
  "500+ practices nationwide",
  "Free pickup — local or UPS",
  "In-house CAD/CAM · 3–5 day turnaround",
  "Orange, CA · Serving dentists since 2001",
];

export default function InstagramLandingPage() {
  return (
    <main className="min-h-screen bg-white">
      <section className="relative overflow-hidden bg-[#0a3d2e] px-5 py-16 md:px-8 md:py-24">
        <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-green-500/10 blur-3xl" />
        <div className="pointer-events-none absolute -left-16 bottom-0 h-48 w-48 rounded-full bg-green-400/10 blur-3xl" />

        <div className="relative mx-auto max-w-2xl text-center">
          <div className="mb-6 flex justify-center">
            <Image
              src="/IDOC_logo.png"
              alt="IDOC Dental Lab"
              width={180}
              height={72}
              className="h-14 w-auto object-contain"
              priority
            />
          </div>

          <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.2em] text-[#4ade80]">
            From Instagram
          </p>
          <h1 className="font-serif text-[32px] leading-[1.1] tracking-[-0.5px] text-white md:text-[42px]">
            Ready to work with IDOC?
          </h1>
          <p className="mx-auto mt-4 max-w-md text-[15px] leading-relaxed text-white/65">
            Thanks for following along. If you&apos;re a dentist or dental team, pick the
            option below — we&apos;ll make your first case easy.
          </p>

          <ul className="mt-8 flex flex-wrap justify-center gap-x-4 gap-y-2 text-[12px] text-white/45">
            {highlights.map((item) => (
              <li key={item} className="flex items-center gap-1.5">
                <span className="text-[#4ade80]">✓</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-2xl px-5 py-10 md:py-14">
        <div className="space-y-4">
          {actions.map((action) => {
            const className = `group flex flex-col rounded-2xl border p-6 transition-all ${
              action.primary
                ? "border-green-600 bg-green-50/50 shadow-[0_8px_30px_rgba(22,101,52,0.1)] hover:border-green-700"
                : "border-gray-200 hover:border-green-600 hover:shadow-[0_8px_30px_rgba(22,101,52,0.06)]"
            }`;

            const inner = (
              <>
                <span
                  className={`mb-3 inline-block w-fit rounded-full px-3 py-1 text-[11px] font-medium ${
                    action.primary
                      ? "bg-green-700 text-white"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {action.badge}
                </span>
                <h2 className="text-lg font-semibold text-gray-900">{action.title}</h2>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-gray-500">
                  {action.description}
                </p>
                <span
                  className={`mt-5 text-sm font-semibold ${
                    action.primary
                      ? "text-green-800 group-hover:text-green-900"
                      : "text-green-700 group-hover:text-green-800"
                  }`}
                >
                  {action.cta} →
                </span>
              </>
            );

            if (action.external) {
              return (
                <a
                  key={action.title}
                  href={action.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={className}
                >
                  {inner}
                </a>
              );
            }

            return (
              <Link key={action.title} href={action.href} className={className}>
                {inner}
              </Link>
            );
          })}
        </div>

        <div className="mt-10 rounded-2xl border border-gray-100 bg-gray-50/80 px-5 py-5">
          <p className="mb-3 text-[10px] font-medium uppercase tracking-widest text-gray-400">
            More options
          </p>
          <div className="flex flex-wrap gap-2">
            {quickLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-full border border-gray-200 bg-white px-3.5 py-1.5 text-[12px] font-medium text-gray-700 transition-colors hover:border-green-600 hover:text-green-800"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-10 space-y-4 text-center">
          <p className="text-sm text-gray-600">
            Prefer to talk?{" "}
            <a
              href="tel:+18773884362"
              className="font-semibold text-green-700 hover:underline"
            >
              (877) 388-4362
            </a>
            <span className="text-gray-400"> · Mon–Fri</span>
          </p>

          <a
            href={INSTAGRAM_PROFILE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[13px] font-medium text-gray-500 transition-colors hover:text-gray-900"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
              <circle cx="12" cy="12" r="4"/>
            </svg>
            Back to @idocdentallab on Instagram
          </a>
        </div>
      </section>
    </main>
  );
}
