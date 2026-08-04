import Link from "next/link";
import { EVIDENT_DENTIST_PORTAL_URL } from "@/lib/portal";

const actions = [
  {
    href: "/send-a-case/digital-impression",
    label: "Upload a scan",
    description: "CEREC, Trios, iTero, Medit",
    cta: "Send files",
    external: false,
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
        <polyline points="17 8 12 3 7 8" />
        <line x1="12" y1="3" x2="12" y2="15" />
      </svg>
    ),
  },
  {
    href: "/send-a-case/pickup",
    label: "Schedule pickup",
    description: "SoCal local or UPS nationwide",
    cta: "Request pickup",
    external: false,
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="1" y="3" width="15" height="13" rx="1" />
        <path d="M16 8h4l3 3v5h-7V8z" />
        <circle cx="5.5" cy="18.5" r="2.5" />
        <circle cx="18.5" cy="18.5" r="2.5" />
      </svg>
    ),
  },
  {
    href: "/send-a-case/shipping-label",
    label: "Print UPS label",
    description: "Free 2nd Day Air",
    cta: "Get label",
    external: false,
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="6 9 6 2 18 2 18 9" />
        <path d="M6 18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2" />
        <rect x="6" y="14" width="12" height="8" />
      </svg>
    ),
  },
  {
    href: EVIDENT_DENTIST_PORTAL_URL,
    label: "Evident portal",
    description: "Cases, status, and accounts",
    cta: "Sign in",
    external: true,
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M15 3h4a2 2 0 012 2v14a2 2 0 01-2 2h-4" />
        <polyline points="10 17 15 12 10 7" />
        <line x1="15" y1="12" x2="3" y2="12" />
      </svg>
    ),
  },
  {
    href: "tel:+18773884362",
    label: "Call the lab",
    description: "(877) 388-4362 · Mon–Fri",
    cta: "Call now",
    external: true,
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6A19.79 19.79 0 012.12 4.18 2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
      </svg>
    ),
  },
];

export default function QuickActions() {
  return (
    <section className="border-b border-black/6 bg-surface">
      <div className="mx-auto max-w-6xl px-5 py-10 md:px-8 md:py-12">
        <div className="mb-7 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-2 text-[10px] font-medium uppercase tracking-widest text-ink-3">
              For our practices
            </p>
            <h2 className="font-serif text-[26px] leading-tight tracking-[-0.5px] text-ink md:text-[32px]">
              What do you need to do?
            </h2>
          </div>
          <p className="max-w-sm text-[13px] leading-relaxed text-ink-3 md:text-right">
            Common next steps for partner offices — send a case, print a label, or reach the lab.
          </p>
        </div>

        <div className="overflow-hidden rounded-2xl border border-black/8 bg-white">
          <ul className="divide-y divide-black/6 md:grid md:grid-cols-5 md:divide-x md:divide-y-0">
            {actions.map((action) => {
              const Comp = action.external ? "a" : Link;
              const externalProps = action.external && !action.href.startsWith("tel:")
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {};

              return (
                <li key={action.href} className="min-w-0">
                  <Comp
                    href={action.href}
                    {...externalProps}
                    className="group flex h-full flex-col gap-5 px-5 py-6 transition-colors duration-200 hover:bg-green-50/60 md:px-5 md:py-7"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-ink-3 transition-colors duration-200 group-hover:text-green-700">
                        {action.icon}
                      </span>
                      <span className="text-[11px] font-medium text-green-700 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                        {action.cta} →
                      </span>
                    </div>

                    <div>
                      <p className="mb-1 text-[14px] font-medium leading-snug text-ink">
                        {action.label}
                      </p>
                      <p className="text-[12px] leading-relaxed text-ink-3">
                        {action.description}
                      </p>
                    </div>
                  </Comp>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
