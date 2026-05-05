const stats = [
  { value: "20+",  label: "Years in business"  },
  { value: "500+", label: "Dental practices"    },
  { value: "50",   label: "Skilled technicians" },
  { value: "5–7",  label: "Day avg. turnaround" },
];

const base = [
  "Tufts University School of Dental Medicine",
  "UCLA School of Dentistry",
  "VA Medical Centers",
  "Pacific Dental Services",
];

export default function StatsBar() {
  return (
    <section className="bg-green-900 overflow-x-hidden">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-2 md:grid-cols-4">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className={`px-8 py-6 ${
                i < stats.length - 1 ? "border-r border-white/10" : ""
              }`}
            >
              <div className="font-serif text-[28px] leading-none text-white">
                {s.value}
              </div>
              <div className="mt-1.5 text-[11px] text-white/50">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Marquee */}
      <div className="border-t border-white/10 py-3 overflow-x-hidden">
        <div
          className="flex whitespace-nowrap"
          style={{ animation: "marquee 25s linear infinite" }}
        >
          {[...base, ...base, ...base, ...base].map((name, i) => (
            <span key={i} className="inline-flex shrink-0 items-center gap-4 px-6 text-[11px]">
              <span className="text-white/20 select-none">·</span>
              <span className="text-white/50">{name}</span>
            </span>
          ))}
        </div>
      </div>

    </section>
  );
}