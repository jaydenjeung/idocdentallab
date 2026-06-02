"use client";

import { useState } from "react";

export const dynamic = "force-dynamic";

const serviceOptions = [
  "Implant Prosthetics (Komplett Bundle)",
  "Crown & Bridge — Zirconia",
  "Crown & Bridge — PFM",
  "Crown & Bridge — e.max",
  "Crown & Bridge — PMMA Temporary",
  "Removables — Full Denture",
  "Removables — Partial Denture",
  "Appliances — Nightguard",
  "Appliances — Mouthguard",
  "Appliances — Retainer",
  "Other",
];

export default function GetStartedPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    practiceName: "",
    doctorName: "",
    phone: "",
    email: "",
    service: "",
    patientName: "",
    dueDate: "",
    scanMethod: "",
    notes: "",
  });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit() {
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Failed");
      setSubmitted(true);
    } catch {
      setError("Something went wrong. Please call us at (877) 388-4362.");
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center px-5">
        <div className="text-center max-w-md">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-50">
            <svg viewBox="0 0 24 24" fill="none" className="h-8 w-8 text-green-700">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
              <path d="M7 12l3.5 3.5L17 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <h2 className="mb-3 font-serif text-[28px] text-ink">Case submitted.</h2>
          <p className="text-[14px] leading-relaxed text-ink-3">
            We&apos;ll reach out within 1 business day to confirm pickup and case details.
            If you have questions, call us at{" "}
            <a href="tel:+18773884362" className="text-green-700">(877) 388-4362</a>.
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Hero */}
      <section className="bg-white px-5 py-16 md:px-8 md:py-20">
        <div className="mx-auto max-w-2xl">
          <p className="mb-4 text-[10px] font-medium uppercase tracking-widest text-ink-3">
            Send a case
          </p>
          <h1 className="mb-3 font-serif text-[36px] leading-[1.05] tracking-[-1px] text-ink md:text-[48px]">
            Let&apos;s get started.
          </h1>
          <p className="text-[15px] leading-relaxed text-ink-3">
            Fill out the form below and we&apos;ll handle the rest —
            including free pickup from your office (local or UPS).
          </p>
        </div>
      </section>

      {/* Form */}
      <section className="bg-surface px-5 pb-24 md:px-8">
        <div className="mx-auto max-w-2xl">
          <div className="rounded-3xl border border-surface-3 bg-white p-8 md:p-10 space-y-8">

            {/* Practice info */}
            <div>
              <p className="mb-4 text-[10px] font-medium uppercase tracking-widest text-ink-3">
                Practice information
              </p>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <label className="block text-[12px] font-medium text-ink-2">
                    Practice name <span className="text-green-700">*</span>
                  </label>
                  <input
                    name="practiceName"
                    value={form.practiceName}
                    onChange={handleChange}
                    placeholder="Sunny Dental Group"
                    className="w-full rounded-xl border border-surface-3 bg-surface px-4 py-2.5 text-[14px] text-ink placeholder-ink-4 outline-none focus:border-green-700 transition-colors"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="block text-[12px] font-medium text-ink-2">
                    Doctor name <span className="text-green-700">*</span>
                  </label>
                  <input
                    name="doctorName"
                    value={form.doctorName}
                    onChange={handleChange}
                    placeholder="Dr. Jane Smith"
                    className="w-full rounded-xl border border-surface-3 bg-surface px-4 py-2.5 text-[14px] text-ink placeholder-ink-4 outline-none focus:border-green-700 transition-colors"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="block text-[12px] font-medium text-ink-2">
                    Phone <span className="text-green-700">*</span>
                  </label>
                  <input
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="(714) 555-0000"
                    className="w-full rounded-xl border border-surface-3 bg-surface px-4 py-2.5 text-[14px] text-ink placeholder-ink-4 outline-none focus:border-green-700 transition-colors"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="block text-[12px] font-medium text-ink-2">
                    Email <span className="text-green-700">*</span>
                  </label>
                  <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="doctor@sunnydental.com"
                    className="w-full rounded-xl border border-surface-3 bg-surface px-4 py-2.5 text-[14px] text-ink placeholder-ink-4 outline-none focus:border-green-700 transition-colors"
                  />
                </div>
              </div>
            </div>

            {/* Case info */}
            <div>
              <p className="mb-4 text-[10px] font-medium uppercase tracking-widest text-ink-3">
                Case details
              </p>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5 sm:col-span-2">
                  <label className="block text-[12px] font-medium text-ink-2">
                    Service type <span className="text-green-700">*</span>
                  </label>
                  <select
                    name="service"
                    value={form.service}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-surface-3 bg-surface px-4 py-2.5 text-[14px] text-ink outline-none focus:border-green-700 transition-colors"
                  >
                    <option value="">Select a service...</option>
                    {serviceOptions.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="block text-[12px] font-medium text-ink-2">
                    Patient name
                  </label>
                  <input
                    name="patientName"
                    value={form.patientName}
                    onChange={handleChange}
                    placeholder="J. Smith"
                    className="w-full rounded-xl border border-surface-3 bg-surface px-4 py-2.5 text-[14px] text-ink placeholder-ink-4 outline-none focus:border-green-700 transition-colors"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="block text-[12px] font-medium text-ink-2">
                    Due date
                  </label>
                  <input
                    name="dueDate"
                    type="date"
                    value={form.dueDate}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-surface-3 bg-surface px-4 py-2.5 text-[14px] text-ink outline-none focus:border-green-700 transition-colors"
                  />
                </div>
                <div className="space-y-1.5 sm:col-span-2">
                  <label className="block text-[12px] font-medium text-ink-2">
                    Scan / submission method
                  </label>
                  <select
                    name="scanMethod"
                    value={form.scanMethod}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-surface-3 bg-surface px-4 py-2.5 text-[14px] text-ink outline-none focus:border-green-700 transition-colors"
                  >
                    <option value="">Select...</option>
                    <option value="digital">Digital scan file (upload)</option>
                    <option value="pickup">Physical impression (local or UPS pickup)</option>
                    <option value="both">Both</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Notes */}
            <div>
              <p className="mb-4 text-[10px] font-medium uppercase tracking-widest text-ink-3">
                Additional notes
              </p>
              <textarea
                name="notes"
                value={form.notes}
                onChange={handleChange}
                rows={4}
                placeholder="Shade, special instructions, implant system, tooth numbers..."
                className="w-full rounded-xl border border-surface-3 bg-surface px-4 py-3 text-[14px] text-ink placeholder-ink-4 outline-none focus:border-green-700 transition-colors resize-none"
              />
            </div>

            {/* Error */}
            {error && (
              <p className="text-[13px] text-red-600">{error}</p>
            )}

            {/* Submit */}
            <div className="flex items-center justify-between pt-2">
              <p className="text-[12px] text-ink-3">
                We&apos;ll confirm within 1 business day.
              </p>
              <button
                onClick={handleSubmit}
                disabled={loading || !form.practiceName || !form.doctorName || !form.phone || !form.email || !form.service}
                className="rounded-full bg-green-700 px-8 py-3 text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {loading ? "Submitting..." : "Submit case →"}
              </button>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}