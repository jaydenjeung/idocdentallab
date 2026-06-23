"use client";

import { useState } from "react";

const US_STATES = [
  "AL","AK","AZ","AR","CA","CO","CT","DE","FL","GA",
  "HI","ID","IL","IN","IA","KS","KY","LA","ME","MD",
  "MA","MI","MN","MS","MO","MT","NE","NV","NH","NJ",
  "NM","NY","NC","ND","OH","OK","OR","PA","RI","SC",
  "SD","TN","TX","UT","VT","VA","WA","WV","WI","WY",
];

type Status = "idle" | "loading" | "success" | "error";

export default function SupplyRequestForm() {
  const [form, setForm] = useState({
    practiceName: "",
    doctorName: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    state: "CA",
    zip: "",
    labSlipQty: "",
    shippingBoxQty: "",
    notes: "",
  });
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const update = (field: keyof typeof form, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = async () => {
    const labSlips = parseInt(form.labSlipQty, 10) || 0;
    const boxes = parseInt(form.shippingBoxQty, 10) || 0;

    if (!form.practiceName || !form.doctorName || !form.phone || !form.email || !form.address || !form.city || !form.zip) {
      setErrorMsg("Please fill in all required fields.");
      return;
    }

    if (labSlips < 1 && boxes < 1) {
      setErrorMsg("Please request at least one item — paper lab slips and/or shipping boxes.");
      return;
    }

    setStatus("loading");
    setErrorMsg("");

    const addressLine = `${form.address}, ${form.city}, ${form.state} ${form.zip}`;
    const items: string[] = [];
    if (labSlips > 0) items.push(`Paper lab slips: ${labSlips}`);
    if (boxes > 0) items.push(`Shipping boxes: ${boxes}`);

    const notesParts = [
      `Ship to: ${addressLine}`,
      `Items requested:\n${items.join("\n")}`,
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
          service: "Supply Request",
          scanMethod: items.join(" · "),
          notes: notesParts.join("\n\n"),
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
      <div className="rounded-2xl border border-green-200 bg-green-50 px-6 py-8 text-center">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-white">
          <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6 text-green-700">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
            <path d="M7 12l3.5 3.5L17 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h3 className="mb-2 font-serif text-[22px] text-ink">Request received</h3>
        <p className="text-[14px] leading-relaxed text-ink-3">
          We&apos;ll ship your supplies to the address you provided. Our team will reach out
          if we need any additional details.
        </p>
      </div>
    );
  }

  const inputClass =
    "w-full rounded-xl border border-surface-3 bg-white px-4 py-3 text-sm text-ink outline-none focus:border-green-700 focus:ring-2 focus:ring-green-700/10";

  return (
    <div className="rounded-2xl border border-surface-3 bg-surface p-6 md:p-8">
      <h3 className="mb-1 font-serif text-[22px] text-ink">Need supplies?</h3>
      <p className="mb-6 text-[14px] leading-relaxed text-ink-3">
        Request paper lab slips and/or shipping boxes — we&apos;ll mail them to your practice.
      </p>

      <div className="mb-6 grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-ink">
            Paper lab slips <span className="font-normal text-ink-3">(qty)</span>
          </label>
          <input
            type="number"
            min="0"
            placeholder="e.g. 50"
            value={form.labSlipQty}
            onChange={(e) => update("labSlipQty", e.target.value)}
            className={inputClass}
          />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-ink">
            Shipping boxes <span className="font-normal text-ink-3">(qty)</span>
          </label>
          <input
            type="number"
            min="0"
            placeholder="e.g. 5"
            value={form.shippingBoxQty}
            onChange={(e) => update("shippingBoxQty", e.target.value)}
            className={inputClass}
          />
        </div>
      </div>

      <p className="mb-4 text-[11px] font-medium uppercase tracking-widest text-ink-3">
        Practice &amp; shipping info
      </p>

      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label className="mb-1.5 block text-sm font-medium text-ink">
            Practice name <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            value={form.practiceName}
            onChange={(e) => update("practiceName", e.target.value)}
            className={inputClass}
          />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-ink">
            Contact name <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            value={form.doctorName}
            onChange={(e) => update("doctorName", e.target.value)}
            className={inputClass}
          />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-ink">
            Phone <span className="text-red-400">*</span>
          </label>
          <input
            type="tel"
            value={form.phone}
            onChange={(e) => update("phone", e.target.value)}
            className={inputClass}
          />
        </div>
        <div className="sm:col-span-2">
          <label className="mb-1.5 block text-sm font-medium text-ink">
            Email <span className="text-red-400">*</span>
          </label>
          <input
            type="email"
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
            className={inputClass}
          />
        </div>
        <div className="sm:col-span-2">
          <label className="mb-1.5 block text-sm font-medium text-ink">
            Street address <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            value={form.address}
            onChange={(e) => update("address", e.target.value)}
            className={inputClass}
          />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-ink">
            City <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            value={form.city}
            onChange={(e) => update("city", e.target.value)}
            className={inputClass}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-ink">State</label>
            <select
              value={form.state}
              onChange={(e) => update("state", e.target.value)}
              className={`${inputClass} bg-white`}
            >
              {US_STATES.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-ink">
              ZIP <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              value={form.zip}
              onChange={(e) => update("zip", e.target.value)}
              className={inputClass}
            />
          </div>
        </div>
        <div className="sm:col-span-2">
          <label className="mb-1.5 block text-sm font-medium text-ink">
            Notes <span className="font-normal text-ink-3">(optional)</span>
          </label>
          <textarea
            rows={2}
            placeholder="Suite #, delivery instructions, etc."
            value={form.notes}
            onChange={(e) => update("notes", e.target.value)}
            className={`${inputClass} resize-none`}
          />
        </div>
      </div>

      {errorMsg && (
        <p className="mb-4 rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-600">
          {errorMsg}
        </p>
      )}

      <button
        type="button"
        onClick={handleSubmit}
        disabled={status === "loading"}
        className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-green-700 px-7 py-3.5 text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-60 sm:w-auto"
      >
        {status === "loading" ? "Submitting…" : "Request supplies →"}
      </button>
    </div>
  );
}
