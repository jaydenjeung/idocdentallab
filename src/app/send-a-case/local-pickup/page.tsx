"use client";

import Link from "next/link";
import { useState } from "react";

const US_STATES = [
  "AL","AK","AZ","AR","CA","CO","CT","DE","FL","GA",
  "HI","ID","IL","IN","IA","KS","KY","LA","ME","MD",
  "MA","MI","MN","MS","MO","MT","NE","NV","NH","NJ",
  "NM","NY","NC","ND","OH","OK","OR","PA","RI","SC",
  "SD","TN","TX","UT","VT","VA","WA","WV","WI","WY",
];

type Status = "idle" | "loading" | "success" | "error";

export default function LocalPickupPage() {
  const [form, setForm] = useState({
    practiceName: "",
    doctorName: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    state: "CA",
    zip: "",
    preferredDate: "",
    notes: "",
  });
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const update = (field: keyof typeof form, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = async () => {
    if (!form.practiceName || !form.doctorName || !form.phone || !form.email || !form.address || !form.city || !form.zip) {
      setErrorMsg("Please fill in all required fields.");
      return;
    }

    setStatus("loading");
    setErrorMsg("");

    const addressLine = `${form.address}, ${form.city}, ${form.state} ${form.zip}`;
    const notesParts = [
      `Pickup address: ${addressLine}`,
      form.preferredDate ? `Preferred date: ${form.preferredDate}` : null,
      form.notes ? form.notes : null,
    ].filter(Boolean);

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          practiceName: form.practiceName,
          doctorName: form.doctorName,
          phone: form.phone,
          email: form.email,
          service: "Local Pickup Request",
          scanMethod: "Physical impression — local pickup",
          dueDate: form.preferredDate || null,
          notes: notesParts.join("\n"),
        }),
      });

      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
    } catch {
      setErrorMsg("Something went wrong. Please call (877) 388-4362.");
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <main className="min-h-screen bg-white flex items-center justify-center px-4 py-20">
        <div className="max-w-md text-center">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-50">
            <svg viewBox="0 0 24 24" fill="none" className="h-8 w-8 text-green-700">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
              <path d="M7 12l3.5 3.5L17 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Request received</h1>
          <p className="text-gray-600 text-sm leading-relaxed mb-8">
            We&apos;ll contact you shortly to confirm your pickup time. Our team will arrange
            pickup from your office — our driver or a local courier.
          </p>
          <Link
            href="/send-a-case/pickup"
            className="text-sm font-medium text-green-700 hover:underline"
          >
            ← Back to pickup options
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white">
      <section className="bg-[#0a3d2e] px-6 py-14 md:py-20">
        <div className="max-w-2xl mx-auto">
          <Link
            href="/send-a-case/pickup"
            className="inline-block text-[#4ade80]/80 text-sm mb-4 hover:text-[#4ade80]"
          >
            ← Pickup options
          </Link>
          <p className="text-[#4ade80] text-sm font-medium tracking-widest uppercase mb-3">
            Send a Case
          </p>
          <h1 className="text-white text-3xl md:text-4xl font-bold leading-tight mb-4">
            Request local pickup
          </h1>
          <p className="text-white/70 text-base max-w-lg">
            Available for practices in Southern California only. Submit your details and
            we&apos;ll call or email to confirm — we handle scheduling from there.
          </p>
        </div>
      </section>

      <section className="max-w-2xl mx-auto px-4 py-10">
        <div className="mb-8 rounded-xl border border-amber-200 bg-amber-50 px-5 py-4 text-sm leading-relaxed text-amber-900">
          <strong className="font-semibold">Southern California only.</strong> Local pickup is
          not available outside SoCal. If your practice is in another region, please{" "}
          <Link href="/send-a-case/ups-pickup" className="font-medium text-green-800 underline hover:text-green-900">
            schedule UPS pickup
          </Link>{" "}
          instead.
        </div>

        <div className="mb-8">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-4">
            Practice information
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Practice name <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                value={form.practiceName}
                onChange={(e) => update("practiceName", e.target.value)}
                className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/10"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Contact name <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                value={form.doctorName}
                onChange={(e) => update("doctorName", e.target.value)}
                className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/10"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Phone <span className="text-red-400">*</span>
              </label>
              <input
                type="tel"
                value={form.phone}
                onChange={(e) => update("phone", e.target.value)}
                className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/10"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Email <span className="text-red-400">*</span>
              </label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => update("email", e.target.value)}
                className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/10"
              />
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-4">
            Pickup address
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Street address <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                value={form.address}
                onChange={(e) => update("address", e.target.value)}
                className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/10"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                City <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                value={form.city}
                onChange={(e) => update("city", e.target.value)}
                className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/10"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">State</label>
                <select
                  value={form.state}
                  onChange={(e) => update("state", e.target.value)}
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/10 bg-white"
                >
                  {US_STATES.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  ZIP <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  value={form.zip}
                  onChange={(e) => update("zip", e.target.value)}
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/10"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-4">
            Pickup details
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Preferred date (optional)
              </label>
              <input
                type="date"
                value={form.preferredDate}
                onChange={(e) => update("preferredDate", e.target.value)}
                className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/10"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Notes (optional)
              </label>
              <textarea
                rows={3}
                placeholder="Best time to reach you, number of packages, etc."
                value={form.notes}
                onChange={(e) => update("notes", e.target.value)}
                className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/10 resize-none"
              />
            </div>
          </div>
        </div>

        {errorMsg && (
          <p className="mb-4 text-sm text-red-600 bg-red-50 border border-red-100 rounded-xl px-4 py-3">
            {errorMsg}
          </p>
        )}

        <button
          type="button"
          onClick={handleSubmit}
          disabled={status === "loading"}
          className="w-full rounded-xl bg-[#0a3d2e] text-white font-semibold py-4 text-sm hover:bg-[#0d4d3a] transition-colors disabled:opacity-60"
        >
          {status === "loading" ? "Submitting…" : "Submit pickup request →"}
        </button>

        <p className="mt-6 text-center text-sm text-gray-500">
          Outside Southern California?{" "}
          <Link href="/send-a-case/ups-pickup" className="text-green-700 font-medium hover:underline">
            Schedule UPS pickup
          </Link>
        </p>
      </section>
    </main>
  );
}
