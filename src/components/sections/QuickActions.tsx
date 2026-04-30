import Link from "next/link";

const actions = [
  {
    href: "/send-a-case/digital-impression",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/>
        <path d="M8 12s1.5 2 4 2 4-2 4-2"/>
        <path d="M9 9h.01M15 9h.01"/>
      </svg>
    ),
    label: "Send a Digital Impression",
    description: "CEREC · Trios · iTero · Medit",
    accent: "green",
  },
  {
    href: "/send-a-case/ups-pickup",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 8h14M5 8a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v0a2 2 0 01-2 2M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8"/>
        <path d="M10 12h4M12 10v4"/>
      </svg>
    ),
    label: "Request UPS Pickup",
    description: "Schedule a free case pickup",
    accent: "amber",
  },
  {
    href: "/send-a-case/rx-form",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 12h6M9 16h6M9 8h6"/>
        <path d="M5 3h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2z"/>
      </svg>
    ),
    label: "Download Rx Form",
    description: "Print or fill out digitally",
    accent: "blue",
  },
  {
    href: "/send-a-case/remake",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4v5h5"/>
        <path d="M20 20v-5h-5"/>
        <path d="M4.929 14.929A10 10 0 1019.07 9.07"/>
      </svg>
    ),
    label: "Request a Remake",
    description: "Submit a remake or correction",
    accent: "red",
  },
];

const accentMap: Record<string, { bg: string; icon: string; border: string }> = {
  green: {
    bg: "bg-[#f0fdf4]",
    icon: "text-[#16a34a]",
    border: "group-hover:border-[#16a34a]",
  },
  amber: {
    bg: "bg-[#fffbeb]",
    icon: "text-[#d97706]",
    border: "group-hover:border-[#d97706]",
  },
  blue: {
    bg: "bg-[#eff6ff]",
    icon: "text-[#2563eb]",
    border: "group-hover:border-[#2563eb]",
  },
  red: {
    bg: "bg-[#fef2f2]",
    icon: "text-[#dc2626]",
    border: "group-hover:border-[#dc2626]",
  },
};

export default function QuickActions() {
  return (
    <section className="bg-white border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Label */}
        <p className="text-xs font-semibold tracking-widest uppercase text-gray-400 mb-5">
          Quick Actions
        </p>

        {/* Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {actions.map((action) => {
            const a = accentMap[action.accent];
            return (
              <Link
                key={action.href}
                href={action.href}
                className={`group flex flex-col gap-3 rounded-2xl border border-gray-200 bg-white p-4 transition-all duration-150 hover:shadow-sm ${a.border}`}
              >
                {/* Icon */}
                <div className={`w-10 h-10 rounded-xl ${a.bg} ${a.icon} flex items-center justify-center flex-shrink-0`}>
                  {action.icon}
                </div>

                {/* Text */}
                <div>
                  <p className="text-sm font-semibold text-gray-900 leading-snug mb-0.5">
                    {action.label}
                  </p>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    {action.description}
                  </p>
                </div>

                {/* Arrow */}
                <div className="mt-auto">
                  <span className={`text-xs font-medium ${a.icon} opacity-0 group-hover:opacity-100 transition-opacity`}>
                    Go →
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}