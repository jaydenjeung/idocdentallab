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

// Get tomorrow's date as default
function getTomorrow() {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return d.toISOString().split("T")[0];
}

// Get min date (tomorrow)
function getMinDate() {
  return getTomorrow();
}

interface FormData {
  contactName:  string;
  practiceName: string;
  phone:        string;
  address:      string;
  city:         string;
  state:        string;
  zip:          string;
  pickupDate:   string;
  readyTime:    string;
  closeTime:    string;
  packageCount: string;
  notes:        string;
}

type Status = "idle" | "loading" | "success" | "error";

export default function UPSPickupPage() {
  const [form, setForm] = useState<FormData>({
    contactName:  "",
    practiceName: "",
    phone:        "",
    address:      "",
    city:         "",
    state:        "CA",
    zip:          "",
    pickupDate:   getTomorrow(),
    readyTime:    "14:00",
    closeTime:    "18:00",
    packageCount: "1",
    notes:        "",
  });

  const [status,        setStatus]        = useState<Status>("idle");
  const [confirmNumber, setConfirmNumber] = useState<string>("");
  const [errorMsg,      setErrorMsg]      = useState<string>("");

  const update = (field: keyof FormData, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = async () => {
    // Basic validation
    if (!form.contactName || !form.phone || !form.address || !form.city || !form.zip) {
      setErrorMsg("Please fill in all required fields.");
      return;
    }

    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/ups/pickup", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error?.response?.errors?.[0]?.message || "Pickup request failed.");
      }

      const prn = data.data?.PickupCreationResponse?.PRN || "Confirmed";
      setConfirmNumber(prn);
      setStatus("success");
    } catch (err: unknown) {
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong.");
      setStatus("error");
    }
  };

  // ── Success Screen ──────────────────────────────────────────────
  if (status === "success") {
    return (
      <main className="min-h-screen bg-white flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-green-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 6L9 17l-5-5"/>
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Pickup Scheduled!</h1>
          <p className="text-gray-500 text-sm mb-4">
            Your UPS pickup has been confirmed for <strong>{form.pickupDate}</strong>.
          </p>
          {confirmNumber && (
            <div className="bg-gray-50 border border-gray-200 rounded-xl px-5 py-4 mb-6">
              <p className="text-xs text-gray-400 mb-1">Confirmation Number (PRN)</p>
              <p className="text-lg font-mono font-bold text-gray-900">{confirmNumber}</p>
            </div>
          )}
          <p className="text-xs text-gray-400 mb-6">
            Please have your case(s) packaged and ready by <strong>{form.readyTime}</strong>. UPS will pick up before <strong>{form.closeTime}</strong>.
          </p>
          <button
            onClick={() => {
              setStatus("idle");
              setConfirmNumber("");
              setForm({ ...form, notes: "", packageCount: "1" });
            }}
            className="text-sm text-green-700 font-medium hover:underline"
          >
            Schedule another pickup →
          </button>
        </div>
      </main>
    );
  }

  // ── Form ────────────────────────────────────────────────────────
  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
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
            Schedule UPS pickup
          </h1>
          <p className="text-white/70 text-base max-w-lg">
            Free UPS pickup nationwide. Fill out the form below to schedule online.
          </p>
        </div>
      </section>

      {/* Form */}
      <section className="max-w-2xl mx-auto px-4 py-10">

        {/* Practice Info */}
        <div className="mb-8">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-4">
            Practice Information
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Practice Name
              </label>
              <input
                type="text"
                placeholder="Orange Dental Group"
                value={form.practiceName}
                onChange={(e) => update("practiceName", e.target.value)}
                className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/10 transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Contact Name <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                placeholder="Dr. Smith"
                value={form.contactName}
                onChange={(e) => update("contactName", e.target.value)}
                className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/10 transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Phone <span className="text-red-400">*</span>
              </label>
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

        {/* Pickup Address */}
        <div className="mb-8">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-4">
            Pickup Address
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Street Address <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                placeholder="1234 Main St, Suite 100"
                value={form.address}
                onChange={(e) => update("address", e.target.value)}
                className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/10 transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                City <span className="text-red-400">*</span>
              </label>
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

        {/* Pickup Details */}
        <div className="mb-8">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-4">
            Pickup Details
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Pickup Date <span className="text-red-400">*</span>
              </label>
              <input
                type="date"
                min={getMinDate()}
                value={form.pickupDate}
                onChange={(e) => update("pickupDate", e.target.value)}
                className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/10 transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Number of Packages
              </label>
              <select
                value={form.packageCount}
                onChange={(e) => update("packageCount", e.target.value)}
                className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/10 transition-colors bg-white"
              >
                {[1,2,3,4,5].map((n) => (
                  <option key={n} value={n}>{n} package{n > 1 ? "s" : ""}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Ready Time
              </label>
              <select
                value={form.readyTime}
                onChange={(e) => update("readyTime", e.target.value)}
                className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/10 transition-colors bg-white"
              >
                <option value="09:00">9:00 AM</option>
                <option value="10:00">10:00 AM</option>
                <option value="11:00">11:00 AM</option>
                <option value="12:00">12:00 PM</option>
                <option value="13:00">1:00 PM</option>
                <option value="14:00">2:00 PM</option>
                <option value="15:00">3:00 PM</option>
                <option value="16:00">4:00 PM</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Office Closing Time
              </label>
              <select
                value={form.closeTime}
                onChange={(e) => update("closeTime", e.target.value)}
                className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/10 transition-colors bg-white"
              >
                <option value="16:00">4:00 PM</option>
                <option value="17:00">5:00 PM</option>
                <option value="18:00">6:00 PM</option>
                <option value="19:00">7:00 PM</option>
                <option value="20:00">8:00 PM</option>
              </select>
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Special Instructions
              </label>
              <textarea
                rows={3}
                placeholder="e.g. Ring doorbell, cases are at the front desk..."
                value={form.notes}
                onChange={(e) => update("notes", e.target.value)}
                className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/10 transition-colors resize-none"
              />
            </div>
          </div>
        </div>

        {/* Error */}
        {(status === "error" || errorMsg) && (
          <div className="mb-4 flex gap-3 bg-red-50 border border-red-200 rounded-xl px-4 py-3">
            <span className="text-red-500 text-sm">⚠️</span>
            <p className="text-red-700 text-sm">{errorMsg || "Something went wrong. Please try again or call (877) 388-4362."}</p>
          </div>
        )}

        {/* Submit */}
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
              Scheduling pickup...
            </span>
          ) : (
            "Schedule Pickup →"
          )}
        </button>

        <p className="mt-4 text-center text-sm text-gray-500">
          In Southern California?{" "}
          <Link href="/send-a-case/local-pickup" className="text-green-700 font-medium hover:underline">
            Request local pickup
          </Link>
        </p>

        <p className="mt-2 text-center text-xs text-gray-400">
          Need help? Call us at{" "}
          <a href="tel:+18773884362" className="text-green-700 font-medium hover:underline">
            (877) 388-4362
          </a>
        </p>
      </section>
    </main>
  );
}