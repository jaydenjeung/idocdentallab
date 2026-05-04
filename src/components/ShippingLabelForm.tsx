"use client";

import { useState } from "react";

const US_STATES = [
  "AL","AK","AZ","AR","CA","CO","CT","DE","FL","GA",
  "HI","ID","IL","IN","IA","KS","KY","LA","ME","MD",
  "MA","MI","MN","MS","MO","MT","NE","NV","NH","NJ",
  "NM","NY","NC","ND","OH","OK","OR","PA","RI","SC",
  "SD","TN","TX","UT","VT","VA","WA","WV","WI","WY",
];

interface FormData {
  contactName:  string;
  practiceName: string;
  phone:        string;
  address:      string;
  city:         string;
  state:        string;
  zip:          string;
}

interface PrefillData {
  full_name?:     string;
  practice_name?: string;
  phone?:         string;
  address?:       string;
  city?:          string;
  state?:         string;
  zip?:           string;
}

type Status = "idle" | "loading" | "success" | "error";

export default function ShippingLabelForm({ prefill }: { prefill: PrefillData | null }) {
  const [form, setForm] = useState<FormData>({
    contactName:  prefill?.full_name     || "",
    practiceName: prefill?.practice_name || "",
    phone:        prefill?.phone         || "",
    address:      prefill?.address       || "",
    city:         prefill?.city          || "",
    state:        prefill?.state         || "CA",
    zip:          prefill?.zip           || "",
  });

  const [status,         setStatus]         = useState<Status>("idle");
  const [trackingNumber, setTrackingNumber] = useState<string>("");
  const [labelBase64,    setLabelBase64]    = useState<string>("");
  const [errorMsg,       setErrorMsg]       = useState<string>("");

  const update = (field: keyof FormData, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = async () => {
    if (!form.contactName || !form.phone || !form.address || !form.city || !form.zip) {
      setErrorMsg("Please fill in all required fields.");
      return;
    }
    setStatus("loading");
    setErrorMsg("");
    try {
      const res = await fetch("/api/ups/label", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.error || "Label generation failed.");
      setTrackingNumber(data.trackingNumber || "");
      setLabelBase64(data.labelBase64 || "");
      console.log('labelBase64 length:', data.labelBase64?.length);  // 추가
      setStatus("success");
    } catch (err: unknown) {
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong.");
      setStatus("error");
    }
  };

 const handlePrint = () => {
  if (!labelBase64) return;
  try {
    const byteChars = atob(labelBase64);
    const byteArr = new Uint8Array(byteChars.length);
    for (let i = 0; i < byteChars.length; i++) {
      byteArr[i] = byteChars.charCodeAt(i);
    }
    const blob = new Blob([byteArr], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `IDOC-label-${trackingNumber || 'label'}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(() => URL.revokeObjectURL(url), 5000);
  } catch (err) {
    console.error('Print error:', err);
  }
};

  if (status === "success") {
    return (
      <main className="min-h-screen bg-white flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-green-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 6L9 17l-5-5"/>
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Label Ready!</h1>
          <p className="text-gray-500 text-sm mb-4">Your UPS 2nd Day Air label has been generated.</p>
          {trackingNumber && (
            <div className="bg-gray-50 border border-gray-200 rounded-xl px-5 py-4 mb-6">
              <p className="text-xs text-gray-400 mb-1">Tracking Number</p>
              <p className="text-lg font-mono font-bold text-gray-900">{trackingNumber}</p>
            </div>
          )}
          <button
            onClick={handlePrint}
            className="w-full rounded-2xl bg-[#16a34a] px-6 py-4 text-sm font-semibold text-white hover:bg-[#15803d] transition-colors mb-3 flex items-center justify-center gap-2"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
              <polyline points="7 10 12 15 17 10"/>
              <line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
            Download & Print Label (PDF)
          </button>
          <p className="text-xs text-gray-400 mb-6">Print and attach the label securely to your package before UPS pickup.</p>
          <button
            onClick={() => { setStatus("idle"); setTrackingNumber(""); setLabelBase64(""); }}
            className="text-sm text-green-700 font-medium hover:underline"
          >
            Generate another label →
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white">
      <section className="bg-[#0a3d2e] px-6 py-14 md:py-20">
        <div className="max-w-2xl mx-auto">
          <p className="text-[#4ade80] text-sm font-medium tracking-widest uppercase mb-3">Send a Case</p>
          <h1 className="text-white text-3xl md:text-4xl font-bold leading-tight mb-4">Print Shipping Label</h1>
          <p className="text-white/70 text-base max-w-lg">Generate a free UPS 2nd Day Air label. Download, print, and attach it to your case package.</p>
          <div className="mt-5 inline-flex items-center gap-2 bg-white/10 border border-white/15 rounded-full px-4 py-2">
            <svg className="w-4 h-4 text-[#4ade80]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 6L9 17l-5-5"/>
            </svg>
            <span className="text-white/80 text-xs font-medium">UPS 2nd Day Air · Free · Billed to IDOC</span>
          </div>
        </div>
      </section>

      <section className="max-w-2xl mx-auto px-4 py-10">
        {prefill && (
          <div className="mb-6 p-3 bg-blue-50 border border-blue-100 rounded-xl text-xs text-blue-600">
            ✓ Your practice information has been pre-filled from your account.
          </div>
        )}

        <div className="mb-8 rounded-2xl bg-gray-50 border border-gray-100 px-5 py-4 flex items-start gap-4">
          <div className="flex-shrink-0 w-9 h-9 rounded-xl bg-[#dcfce7] flex items-center justify-center text-[#16a34a]">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
              <circle cx="12" cy="10" r="3"/>
            </svg>
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-800 mb-0.5">Shipping to IDOC Dental Lab</p>
            <p className="text-xs text-gray-400">1097 N Batavia St, Orange, CA 92867</p>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-4">Your Practice Information</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Practice Name</label>
              <input
                type="text"
                placeholder="Orange Dental Group"
                value={form.practiceName}
                onChange={(e) => update("practiceName", e.target.value)}
                className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/10 transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Contact Name <span className="text-red-400">*</span></label>
              <input
                type="text"
                placeholder="Dr. Smith"
                value={form.contactName}
                onChange={(e) => update("contactName", e.target.value)}
                className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/10 transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Phone <span className="text-red-400">*</span></label>
              <input
                type="tel"
                placeholder="(714) 000-0000"
                value={form.phone}
                onChange={(e) => update("phone", e.target.value)}
                className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/10 transition-colors"
              />
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-4">Pickup Address</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Street Address <span className="text-red-400">*</span></label>
              <input
                type="text"
                placeholder="1234 Main St, Suite 100"
                value={form.address}
                onChange={(e) => update("address", e.target.value)}
                className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/10 transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">City <span className="text-red-400">*</span></label>
              <input
                type="text"
                placeholder="Anaheim"
                value={form.city}
                onChange={(e) => update("city", e.target.value)}
                className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/10 transition-colors"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">State</label>
                <select
                  value={form.state}
                  onChange={(e) => update("state", e.target.value)}
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/10 transition-colors bg-white"
                >
                  {US_STATES.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">ZIP <span className="text-red-400">*</span></label>
                <input
                  type="text"
                  placeholder="92868"
                  maxLength={5}
                  value={form.zip}
                  onChange={(e) => update("zip", e.target.value)}
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/10 transition-colors"
                />
              </div>
            </div>
          </div>
        </div>

        {(status === "error" || errorMsg) && (
          <div className="mb-4 flex gap-3 bg-red-50 border border-red-200 rounded-xl px-4 py-3">
            <span className="text-red-500 text-sm">⚠️</span>
            <p className="text-red-700 text-sm">{errorMsg || "Something went wrong. Please try again or call (877) 388-4362."}</p>
          </div>
        )}

        <button
          onClick={handleSubmit}
          disabled={status === "loading"}
          className="w-full rounded-2xl bg-[#16a34a] px-6 py-4 text-sm font-semibold text-white hover:bg-[#15803d] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {status === "loading" ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="white" strokeWidth="4"/>
                <path className="opacity-75" fill="white" d="M4 12a8 8 0 018-8v8z"/>
              </svg>
              Generating label...
            </span>
          ) : "Generate Shipping Label →"}
        </button>

        <p className="mt-4 text-center text-xs text-gray-400">
          Need help? Call us at{" "}
          <a href="tel:+18773884362" className="text-green-700 font-medium hover:underline">(877) 388-4362</a>
        </p>
      </section>
    </main>
  );
}