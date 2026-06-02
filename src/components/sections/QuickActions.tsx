import Link from "next/link";
import { EVIDENT_DENTIST_PORTAL_URL } from "@/lib/portal";

const actions = [
  {
    href: EVIDENT_DENTIST_PORTAL_URL,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M15 3h4a2 2 0 012 2v14a2 2 0 01-2 2h-4"/>
        <polyline points="10 17 15 12 10 7"/>
        <line x1="15" y1="12" x2="3" y2="12"/>
      </svg>
    ),
    label: "Dentist portal",
    description: "Sign in · Evident LMS",
    external: true,
  },
  {
    href: "/send-a-case/digital-impression",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <path d="M8 12s1.5 2 4 2 4-2 4-2"/>
        <path d="M9 9h.01M15 9h.01"/>
      </svg>
    ),
    label: "Send a Digital Impression",
    description: "CEREC · Trios · iTero · Medit",
    external: false,
  },
  {
    href: "/send-a-case/shipping-label",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2"/>
        <path d="M3 9h18M9 21V9"/>
      </svg>
    ),
    label: "Print Shipping Label",
    description: "UPS 2nd Day Air · Free",
    external: false,
  },
  {
    href: "/send-a-case/pickup",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 8h14M5 8a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v0a2 2 0 01-2 2M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8"/>
        <path d="M10 12h4M12 10v4"/>
      </svg>
    ),
    label: "Request Case Pickup",
    description: "Local (OC area) or UPS",
    external: false,
  },
  {
    href: "tel:+18773884362",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6A19.79 19.79 0 012.12 4.18 2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
      </svg>
    ),
    label: "Contact IDOC",
    description: "(877) 388-4362 · Mon–Fri",
    external: true,
  },
];

export default function QuickActions() {
  return (
    <section className="bg-white border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <p className="text-[10px] font-semibold tracking-widest uppercase text-gray-400 mb-5">
          Quick Actions
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
          {actions.map((action) => {
            const Comp = action.external ? "a" : Link;

            return (
              <Comp
                key={action.href}
                href={action.href}
                className="group flex flex-col gap-4 rounded-2xl border border-gray-200 bg-white p-5 transition-all duration-200 hover:border-gray-900 hover:shadow-[0_4px_20px_rgba(0,0,0,0.08)]"
              >
                {/* 아이콘 — 배경 없이 단색 */}
                <div className="text-gray-400 group-hover:text-gray-900 transition-colors duration-200">
                  {action.icon}
                </div>

                {/* 텍스트 */}
                <div className="flex-1">
                  <p className="text-[13px] font-semibold text-gray-900 leading-snug mb-1">
                    {action.label}
                  </p>
                  <p className="text-[11px] text-gray-400 leading-relaxed">
                    {action.description}
                  </p>
                </div>

                {/* 화살표 — hover 시 등장 */}
                <span className="text-[11px] font-medium text-gray-900 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  {action.external
                    ? action.href.startsWith("tel:")
                      ? "Call now →"
                      : "Sign in →"
                    : "Go →"}
                </span>
              </Comp>
            );
          })}
        </div>
      </div>
    </section>
  );
}