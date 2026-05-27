"use client";

import { useState } from "react";
import Link from "next/link";

type Model = {
  id: string;
  name: string;
  type: "Removable" | "Fixed";
  tagline: string;
  implants: string;
  material: string;
  bar: string;
  bestFor: string;
  highlights: string[];
  criteria: string[];
};

const models: Model[] = [
  {
    id: "x1",
    name: "X1 · Locator Overture",
    type: "Removable",
    tagline: "Reliable. Affordable. Patient-Friendly.",
    implants: "2–4",
    material: "Acrylic / PMMA",
    bar: "None",
    bestFor: "Budget-conscious patients, elderly, transitioning from dentures",
    highlights: ["Locator attachment system", "Easy daily hygiene", "Repair-friendly design"],
    criteria: ["Most Economical", "Max Retention w/ Minimal Surgery"],
  },
  {
    id: "x2",
    name: "X2 · Bar & Clip (Hader)",
    type: "Removable",
    tagline: "Reliable. Retentive. Digitally Precise.",
    implants: "2–4",
    material: "Acrylic / PMMA",
    bar: "Titanium Bar",
    bestFor: "Patients needing extra retention with removability",
    highlights: ["CAD/CAM milled titanium bar", "Replaceable Hader clips", "Superior retention over X1"],
    criteria: ["Most Economical"],
  },
  {
    id: "x3",
    name: "X3 · Bar & Locator",
    type: "Removable",
    tagline: "Reliable. Retentive. Dual Support.",
    implants: "4+",
    material: "Acrylic / PMMA",
    bar: "Titanium Bar",
    bestFor: "Advanced ridge resorption, max retention removable",
    highlights: ["Dual retention: bar + Locator", "Chairside Locator cap replacement", "Forgiving tissue adaptation"],
    criteria: ["For Poor Hygiene Patients"],
  },
  {
    id: "x4",
    name: "X4 · Bar & PEEK",
    type: "Removable",
    tagline: "Strong. Lightweight. Metal-Free.",
    implants: "4+",
    material: "PEEK Framework",
    bar: "Titanium + PEEK",
    bestFor: "Metal-sensitive patients, high esthetic removable cases",
    highlights: ["Up to 60% lighter than metal-acrylic", "No visible metal components", "Easiest for repair & reline"],
    criteria: ["Esthetic Priority", "Easiest Repair/Rework", "For Poor Hygiene Patients"],
  },
  {
    id: "x5",
    name: "X5 · Bar & Zirconia (Cemented)",
    type: "Fixed",
    tagline: "Elegant. Durable. Premium Precision.",
    implants: "4+",
    material: "Monolithic Zirconia",
    bar: "Titanium Bar",
    bestFor: "Patients seeking high-strength fixed arch, All-on-4/6",
    highlights: ["Zirconia cemented over titanium bar", "All-on-4 / All-on-6 compatible", "No visible screws"],
    criteria: ["High Durability & Longevity", "Full-Arch Immediate Loading"],
  },
  {
    id: "x6",
    name: "X6 · Bar & Zirconia (Toronto)",
    type: "Fixed",
    tagline: "Strong. Retrievable. Fully Integrated.",
    implants: "4+",
    material: "Monolithic Zirconia",
    bar: "Titanium Bar (Toronto)",
    bestFor: "Clinician-retrievable fixed arches, bruxers",
    highlights: ["Screw-retained — fully retrievable", "Crown-level repair without full removal", "Optimized for bruxers"],
    criteria: ["High Durability & Longevity", "Easiest Repair/Rework", "Full-Arch Immediate Loading"],
  },
  {
    id: "x7",
    name: "X7 · Multi-Unit & Zirconia",
    type: "Fixed",
    tagline: "Rigid. Esthetic. Screw-Retained Precision.",
    implants: "All-on-4/6",
    material: "Full-Arch Zirconia",
    bar: "Multi-Unit Titanium",
    bestFor: "Premium full-arch, 'third set of teeth' experience",
    highlights: ["No cement — eliminates peri-implantitis risk", "Natural translucency & stain resistance", "Angled MU abutment compatible"],
    criteria: ["Esthetic Priority", "Simplest Maintenance", "Full-Arch Immediate Loading"],
  },
  {
    id: "x8",
    name: "X8 · Segmented Bar & Zirconia",
    type: "Fixed",
    tagline: "Modular. Durable. Esthetically Superior.",
    implants: "All-on-6+",
    material: "Zirconia Full Arch",
    bar: "Segmented Titanium",
    bestFor: "Complex arches, high esthetic demand, selective retrievability",
    highlights: ["Interlocking segmented bar for passive fit", "Each segment serviceable independently", "No visible metal — ideal for anterior zones"],
    criteria: ["Esthetic Priority", "High Durability & Longevity"],
  },
  {
    id: "x9",
    name: "X9 · Locator Fixed",
    type: "Fixed",
    tagline: "Low-Profile. Fixed. Patient-Preferred.",
    implants: "2–4",
    material: "PMMA / Zirconia",
    bar: "None / Internal",
    bestFor: "Limited vertical space, Locator-familiar clinicians",
    highlights: ["Fixed feel with Locator F-Tx system", "Low profile — ideal for limited interarch space", "Clinician-retrievable"],
    criteria: ["Simplest Maintenance", "Max Retention w/ Minimal Surgery"],
  },
];

const criteriaList = [
  "Most Economical",
  "Esthetic Priority",
  "Simplest Maintenance",
  "High Durability & Longevity",
  "Easiest Repair/Rework",
  "Full-Arch Immediate Loading",
  "For Poor Hygiene Patients",
  "Max Retention w/ Minimal Surgery",
];

export default function Komplett() {
  const [filter, setFilter] = useState<string | null>(null);
  const [typeFilter, setTypeFilter] = useState<"All" | "Removable" | "Fixed">("All");
  const [openId, setOpenId] = useState<string | null>(null);

  const filtered = models.filter((m) => {
    const typeMatch = typeFilter === "All" || m.type === typeFilter;
    const criteriaMatch = !filter || m.criteria.includes(filter);
    return typeMatch && criteriaMatch;
  });

  const toggle = (id: string) => setOpenId(openId === id ? null : id);

  return (
    <section id="implant" className="bg-[#f4f6f3] px-5 py-20 md:px-8">
      <div className="mx-auto max-w-6xl">

        {/* Header */}
        <div className="mb-10">
          <p className="mb-3 text-[10px] font-semibold uppercase tracking-widest text-green-700">
            Full-Arch Implant Prosthetics
          </p>
          <h2 className="font-serif text-[36px] leading-tight text-gray-900 md:text-[48px]">
            Komplett X Series
          </h2>
          <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-gray-500">
            9 solutions covering every full-arch clinical scenario — from affordable removable
            overdentures to premium fixed zirconia. All powered by an in-house CAD/CAM digital workflow.
          </p>
        </div>

        {/* Spectrum bar */}
        <div className="mb-10 grid grid-cols-2 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
          <div className="px-6 py-5 border-r border-gray-100">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 mb-3">
              Removable · X1–X4
            </p>
            <div className="flex flex-wrap gap-2">
              {["X1 Locator", "X2 Bar & Clip", "X3 Bar & Locator", "X4 Bar & PEEK"].map((l) => (
                <span key={l} className="rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-[12px] text-gray-600">{l}</span>
              ))}
            </div>
          </div>
          <div className="px-6 py-5 bg-green-50">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-green-600 mb-3">
              Fixed · X5–X9
            </p>
            <div className="flex flex-wrap gap-2">
              {["X5 Cemented", "X6 Toronto", "X7 Multi-Unit", "X8 Segmented", "X9 Locator Fixed"].map((l) => (
                <span key={l} className="rounded-full border border-green-200 bg-green-100 px-3 py-1 text-[12px] text-green-700">{l}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-6 flex flex-wrap gap-3 items-start">
          <div className="flex rounded-xl border border-gray-200 bg-white overflow-hidden shadow-sm">
            {(["All", "Removable", "Fixed"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTypeFilter(t)}
                className={`px-5 py-2.5 text-[13px] font-medium transition-colors ${
                  typeFilter === t
                    ? "bg-[#0a3d2e] text-white"
                    : "text-gray-500 hover:text-gray-800 hover:bg-gray-50"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            {criteriaList.map((c) => (
              <button
                key={c}
                onClick={() => setFilter(filter === c ? null : c)}
                className={`rounded-full border px-3.5 py-1.5 text-[12px] font-medium transition-all ${
                  filter === c
                    ? "border-green-700 bg-green-700 text-white"
                    : "border-gray-200 bg-white text-gray-600 hover:border-green-400 hover:text-green-700"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* Accordion list */}
        <div className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
          {filtered.map((m, idx) => {
            const isOpen = openId === m.id;
            const isLast = idx === filtered.length - 1;
            return (
              <div key={m.id} className={!isLast ? "border-b border-gray-100" : ""}>

                {/* Summary row — always visible */}
                <button
                  onClick={() => toggle(m.id)}
                  className="w-full text-left px-6 py-4 flex items-center gap-4 hover:bg-gray-50 transition-colors group"
                >
                  {/* Type badge */}
                  <span className={`flex-shrink-0 rounded-full px-2.5 py-0.5 text-[10px] font-semibold ${
                    m.type === "Fixed"
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-100 text-gray-500"
                  }`}>
                    {m.type}
                  </span>

                  {/* Name + tagline */}
                  <div className="flex-1 min-w-0">
                    <span className="text-[14px] font-semibold text-gray-900">{m.name}</span>
                    <span className="ml-3 text-[12px] text-gray-400 italic hidden sm:inline">{m.tagline}</span>
                  </div>

                  {/* Implants */}
                  <span className="flex-shrink-0 text-[12px] text-gray-400 hidden md:block">
                    {m.implants} implants
                  </span>

                  {/* Criteria tags — top 1 only */}
                  <span className="flex-shrink-0 hidden lg:block rounded-full bg-gray-100 px-2.5 py-0.5 text-[11px] text-gray-500">
                    {m.criteria[0]}
                  </span>

                  {/* Chevron */}
                  <svg
                    className={`flex-shrink-0 h-4 w-4 text-gray-400 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                    viewBox="0 0 16 16" fill="none"
                  >
                    <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>

                {/* Expanded detail */}
                {isOpen && (
                  <div className="px-6 pb-6 pt-2 border-t border-gray-100 bg-gray-50">
                    <div className="grid gap-6 md:grid-cols-3">

                      {/* Specs */}
                      <div>
                        <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 mb-3">Specs</p>
                        <div className="space-y-2.5">
                          {[
                            { label: "Implants", value: m.implants },
                            { label: "Material", value: m.material },
                            { label: "Bar",      value: m.bar },
                          ].map((s) => (
                            <div key={s.label} className="flex justify-between gap-2">
                              <span className="text-[12px] text-gray-400">{s.label}</span>
                              <span className="text-[12px] font-semibold text-gray-800 text-right">{s.value}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Highlights */}
                      <div>
                        <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 mb-3">Key Features</p>
                        <div className="space-y-2">
                          {m.highlights.map((h) => (
                            <div key={h} className="flex items-start gap-2">
                              <svg className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-green-600" viewBox="0 0 12 12" fill="none">
                                <path d="M2 6l2.5 2.5L10 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                              <span className="text-[13px] text-gray-700 leading-relaxed">{h}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Ideal for + criteria */}
                      <div>
                        <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 mb-3">Ideal For</p>
                        <p className="text-[13px] text-gray-700 leading-relaxed mb-4">{m.bestFor}</p>
                        <div className="flex flex-wrap gap-1.5">
                          {m.criteria.map((c) => (
                            <span
                              key={c}
                              onClick={() => setFilter(filter === c ? null : c)}
                              className={`cursor-pointer rounded-full px-2.5 py-1 text-[11px] font-medium transition-colors ${
                                filter === c
                                  ? "bg-green-700 text-white"
                                  : "bg-white border border-gray-200 text-gray-500 hover:border-green-300 hover:text-green-700"
                              }`}
                            >
                              {c}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}

          {filtered.length === 0 && (
            <div className="py-16 text-center">
              <p className="text-gray-400 text-sm">No models match the selected criteria.</p>
              <button
                onClick={() => { setFilter(null); setTypeFilter("All"); }}
                className="mt-3 text-green-700 text-sm hover:text-green-600 underline"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>

        {/* JB Fork & Tray */}
        <div className="mt-8 rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-green-600 mb-2">
            Workflow Advantage
          </p>
          <h3 className="text-[22px] font-semibold text-gray-900 mb-3">JB Fork & JB Tray System</h3>
          <p className="text-[14px] text-gray-500 leading-relaxed mb-6 max-w-2xl">
            Developed by Professor Heo Joong-Bo (Pusan National University) and used in university
            hospitals worldwide — our standard for all Komplett X cases. Final impression and bite
            registration in a single appointment.
          </p>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              { label: "Superior Accuracy",  desc: "Reproducible VD & centric relation" },
              { label: "Single Appointment", desc: "Impression + bite in one visit" },
              { label: "Less Chair Time",    desc: "Faster delivery, fewer adjustments" },
              { label: "Clinically Proven",  desc: "University hospital validated" },
            ].map((f) => (
              <div key={f.label} className="rounded-xl border border-green-100 bg-green-50 p-4">
                <p className="text-[13px] font-semibold text-green-800 mb-1">{f.label}</p>
                <p className="text-[12px] text-green-600">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 rounded-2xl bg-[#0a3d2e] px-8 py-6">
          <div>
            <p className="text-white font-semibold text-[16px] mb-1">
              Not sure which model is right for your case?
            </p>
            <p className="text-white/50 text-[13px]">
              Our team can help you select the ideal Komplett X solution — call or send a case today.
            </p>
          </div>
          <div className="flex gap-3 flex-shrink-0">
            <a
              href="tel:+18773884362"
              className="rounded-full bg-green-600 px-6 py-3 text-[13px] font-semibold text-white hover:bg-green-500 transition-colors whitespace-nowrap"
            >
              (877) 388-4362
            </a>
            <Link
              href="/send-a-case/digital-impression"
              className="rounded-full border border-white/20 px-6 py-3 text-[13px] font-semibold text-white hover:bg-white/10 transition-colors whitespace-nowrap"
            >
              Send a case →
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}