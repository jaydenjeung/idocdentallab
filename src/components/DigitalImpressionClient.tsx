"use client";

import { useState, useRef } from "react";
import { createClient } from "@/lib/supabase";

type Scanner = "cerec" | "trios" | "itero" | "medit";

interface Step {
  title: string;
  detail: string;
  link?: { text: string; href: string };
  tip?: string;
}

interface ScannerData {
  label: string;
  tagline: string;
  steps: Step[];
}

const scanners: Record<Scanner, ScannerData> = {
  cerec: {
    label: "CEREC",
    tagline: "Send via CEREC Connect",
    steps: [
      {
        title: "Go to Connect Case Center",
        detail: "Visit customer.connectcasecenter.com and log in or create a new account.",
        link: { text: "connectcasecenter.com", href: "https://customer.connectcasecenter.com/" },
        tip: "Registration is free — you just need an email address to get started.",
      },
      { title: "Open My Favorite Laboratories", detail: "From the side menu, select 'My Favorite Laboratories'." },
      { title: "Search for IDOC Dental Lab", detail: "Click 'Search Labs' and type 'IDOC dental lab' in the search field." },
      { title: "Add and confirm IDOC", detail: "Click the + button next to IDOC dental lab in the results and confirm to add it to your favorites." },
      {
        title: "Send your scan file",
        detail: "After scanning, open the CEREC Connect app, select IDOC Dental Lab as the recipient, and submit your digital impression file.",
        tip: "You'll receive a confirmation from IDOC once your case has been received.",
      },
    ],
  },
  trios: {
    label: "Trios",
    tagline: "Send via 3Shape Communicate",
    steps: [
      {
        title: "Open 3Shape Communicate",
        detail: "Go to communicate.3shape.com or open the Communicate tab inside your TRIOS software.",
        link: { text: "communicate.3shape.com", href: "https://communicate.3shape.com/" },
        tip: "No account yet? Register for free at the 3Shape website.",
      },
      { title: "Create a new case", detail: "Start a new case and fill in the patient information and prescription details." },
      {
        title: "Select IDOC as the receiving lab",
        detail: "In the lab search field, type 'IDOC Dental Lab' and select it from the results.",
        tip: "Save IDOC as a favorite lab after your first submission to speed up future cases.",
      },
      { title: "Attach scan data and send", detail: "Attach your completed scan files to the case and click 'Send' to submit." },
      {
        title: "Confirm submission",
        detail: "Check for the submission confirmation. The IDOC team will reach out as soon as your case is received.",
        tip: "If you don't receive confirmation, call us at (877) 388-4362.",
      },
    ],
  },
  itero: {
    label: "iTero",
    tagline: "Send via the iTero Portal",
    steps: [
      {
        title: "Launch iTero software",
        detail: "Open your iTero scanner software and sign in to your My iTero account.",
        link: { text: "my.itero.com", href: "https://my.itero.com/" },
        tip: "No account? Register at my.itero.com — it's free.",
      },
      { title: "Create a new prescription", detail: "From the dashboard, select 'New Prescription' and enter the patient information and case details." },
      {
        title: "Select IDOC as the lab",
        detail: "In the lab selection field, search for 'IDOC Dental Lab' and select it.",
        tip: "If IDOC doesn't appear, lab account linking may be required — call (877) 388-4362 for quick setup.",
      },
      { title: "Complete scan and attach", detail: "Finish your scan or attach an existing scan file to the case." },
      {
        title: "Submit the case",
        detail: "Click 'Submit'. The IDOC team will begin processing your case immediately upon receipt.",
        tip: "A confirmation email will be sent to you automatically after submission.",
      },
    ],
  },
  medit: {
    label: "Medit",
    tagline: "Send via Medit Link",
    steps: [
      {
        title: "Open Medit Link",
        detail: "Go to meditlink.com or open the Link tab in your Medit scanner software.",
        link: { text: "meditlink.com", href: "https://www.meditlink.com/" },
        tip: "No account yet? Create one for free at meditlink.com.",
      },
      {
        title: "Connect with IDOC Dental Lab",
        detail: "Under 'Partners', search for IDOC Dental Lab and send a connection request.",
        tip: "First-time users: call us at (877) 388-4362 before connecting so we can approve you right away.",
      },
      { title: "Create a new case", detail: "In Medit Link, create a new case and enter the patient information." },
      { title: "Attach your scan file", detail: "Attach the completed 3D scan file (STL or PLY format) to the case." },
      {
        title: "Send to IDOC",
        detail: "Select IDOC Dental Lab as the recipient and click 'Send'.",
        tip: "IDOC will confirm receipt and follow up with you shortly after.",
      },
    ],
  },
};

const scannerOrder: Scanner[] = ["cerec", "trios", "itero", "medit"];

interface Profile {
  full_name?: string
  practice_name?: string
}

export default function DigitalImpressionClient({ userId, profile }: { userId: string | null, profile: Profile | null }) {
  const [active, setActive] = useState<Scanner>("cerec");
  const [openStep, setOpenStep] = useState<number | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);
  const [uploadError, setUploadError] = useState('');
  const [uploadSuccess, setUploadSuccess] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const data = scanners[active];

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0 || !userId) return;

    setUploading(true);
    setUploadError('');
    setUploadSuccess('');
    const supabase = createClient();
    const names: string[] = [];

    for (const file of Array.from(files)) {
      const path = `${userId}/${Date.now()}_${file.name}`;
      const { error } = await supabase.storage
        .from('clinic-uploads')
        .upload(path, file);
      if (error) { setUploadError(error.message); continue; }
      names.push(file.name);
    }

    if (names.length > 0) {
      setUploadedFiles(prev => [...prev, ...names]);
      setUploadSuccess(`${names.length} file(s) uploaded. Our team will follow up shortly.`);
    }
    setUploading(false);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-[#0a3d2e] px-6 py-14 md:py-20">
        <div className="max-w-3xl mx-auto">
          <p className="text-[#4ade80] text-sm font-medium tracking-widest uppercase mb-3">Send a Case</p>
          <h1 className="text-white text-3xl md:text-4xl font-bold leading-tight mb-4">Send a Digital Impression</h1>
          <p className="text-white/70 text-base md:text-lg max-w-xl">
            Select your intraoral scanner below for step-by-step instructions on how to send files directly to IDOC.
          </p>
          {userId && profile && (
            <div className="mt-4 inline-flex items-center gap-2 bg-white/10 border border-white/15 rounded-full px-4 py-2">
              <span className="text-[#4ade80] text-xs">✓</span>
              <span className="text-white/80 text-xs font-medium">Logged in as Dr. {profile.full_name}</span>
            </div>
          )}
        </div>
      </section>

      {/* Scanner Tabs */}
      <section className="sticky top-0 z-20 bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-3xl mx-auto px-4">
          <div className="flex">
            {scannerOrder.map((key) => (
              <button
                key={key}
                onClick={() => { setActive(key); setOpenStep(null); }}
                className={`flex-1 py-4 text-sm font-semibold border-b-2 transition-all duration-150 ${
                  active === key ? "border-[#16a34a] text-[#16a34a]" : "border-transparent text-gray-400 hover:text-gray-700"
                }`}
              >
                {scanners[key].label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-3xl mx-auto px-4 py-10">
        <div className="mb-8">
          <span className="inline-block bg-[#dcfce7] text-[#166534] text-xs font-semibold px-3 py-1 rounded-full mb-3">{data.label}</span>
          <h2 className="text-xl font-bold text-gray-900 mb-1">{data.tagline}</h2>
          <p className="text-sm text-gray-500">Tap each step to expand the instructions.</p>
        </div>

        {/* Steps */}
        <div className="space-y-3">
          {data.steps.map((step, i) => {
            const isOpen = openStep === i;
            const isDone = openStep !== null && i < openStep;
            return (
              <button
                key={i}
                onClick={() => setOpenStep(isOpen ? null : i)}
                className={`w-full text-left rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isOpen ? "border-[#16a34a] bg-[#f0fdf4]" : isDone ? "border-gray-100 bg-gray-50 opacity-50" : "border-gray-200 bg-white hover:border-gray-300"
                }`}
              >
                <div className="flex items-center gap-4 px-5 py-4">
                  <div className={`flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${isOpen ? "bg-[#16a34a] text-white" : "bg-gray-100 text-gray-500"}`}>
                    {isDone ? (
                      <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
                        <path d="M3 8l3.5 3.5L13 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    ) : i + 1}
                  </div>
                  <span className={`flex-1 font-semibold text-sm md:text-base ${isOpen ? "text-[#166534]" : "text-gray-800"}`}>{step.title}</span>
                  <svg className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} viewBox="0 0 16 16" fill="none">
                    <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                {isOpen && (
                  <div className="px-5 pb-5">
                    <div className="ml-[52px]">
                      <p className="text-gray-700 text-sm leading-relaxed mb-2">{step.detail}</p>
                      {step.link && (
                        <a href={step.link.href} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}
                          className="inline-flex items-center gap-1 bg-gray-100 border border-gray-200 rounded-md px-2 py-1 text-xs text-blue-600 font-medium hover:bg-gray-200 transition-colors mb-2">
                          ↗ {step.link.text}
                        </a>
                      )}
                      {step.tip && (
                        <div className="flex gap-2 bg-yellow-50 border border-yellow-200 rounded-xl px-4 py-3 mt-2">
                          <span className="text-yellow-500 text-sm mt-0.5">💡</span>
                          <p className="text-yellow-800 text-xs leading-relaxed">{step.tip}</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* 로그인 상태 — 직접 업로드 */}
        {userId ? (
          <div className="mt-8 rounded-2xl border border-[#16a34a]/30 bg-[#f0fdf4] p-6">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-[#16a34a] text-lg">📁</span>
              <p className="text-sm font-semibold text-[#166534]">Upload scan files directly to IDOC</p>
            </div>
            {uploadSuccess && (
              <div className="mb-3 p-3 bg-green-100 border border-green-200 rounded-lg text-xs text-green-700">
                ✓ {uploadSuccess}
              </div>
            )}
            {uploadError && (
              <div className="mb-3 p-3 bg-red-50 border border-red-100 rounded-lg text-xs text-red-600">
                {uploadError}
              </div>
            )}
            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-[#16a34a]/30 rounded-xl p-6 text-center cursor-pointer hover:border-[#16a34a] hover:bg-[#dcfce7]/30 transition-colors"
            >
              <p className="text-sm text-[#166534]">
                {uploading ? 'Uploading...' : 'Click to upload STL · DCM · ZIP · PLY'}
              </p>
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept=".stl,.dcm,.zip,.ply,.obj,.3ds"
                onChange={handleFileUpload}
                className="hidden"
              />
            </div>
            {uploadedFiles.length > 0 && (
              <div className="mt-3 space-y-1">
                {uploadedFiles.map((name, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-[#166534]">
                    <span>✓</span> {name}
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          /* 비로그인 상태 — 기존 teaser */
          <div className="mt-8 rounded-2xl border border-dashed border-[#16a34a]/40 bg-[#f0fdf4] px-6 py-5 flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="flex items-start gap-4 flex-1">
              <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-[#dcfce7] flex items-center justify-center text-[#16a34a]">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
                  <polyline points="17 8 12 3 7 8"/>
                  <line x1="12" y1="3" x2="12" y2="15"/>
                </svg>
              </div>
              <div>
                <p className="text-sm font-semibold text-[#166534] mb-0.5">Want to upload files directly?</p>
                <p className="text-xs text-[#166534]/70 leading-relaxed">
                  Log in to your IDOC portal to upload STL, PLY, or scan files directly — no email needed. New to IDOC? Create an account in seconds.
                </p>
              </div>
            </div>
            <div className="flex gap-2 flex-shrink-0 sm:flex-col">
              <a href="/login" className="inline-flex items-center justify-center gap-1.5 bg-[#16a34a] text-white text-xs font-semibold px-4 py-2.5 rounded-xl hover:bg-[#15803d] transition-colors whitespace-nowrap">
                Log in
              </a>
              <a href="/register" className="inline-flex items-center justify-center gap-1.5 border border-[#16a34a]/30 text-[#16a34a] text-xs font-semibold px-4 py-2.5 rounded-xl hover:bg-[#dcfce7] transition-colors whitespace-nowrap">
                Sign up free
              </a>
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="mt-4 rounded-2xl bg-[#0a3d2e] px-6 py-6 flex flex-col md:flex-row md:items-center gap-4">
          <div className="flex-1">
            <p className="text-white font-semibold text-sm mb-1">Send us your case details after submission</p>
            <p className="text-white/60 text-xs leading-relaxed">
              Once your file is sent, share the patient name, case number, and any special instructions via phone or email so we can get started right away.
            </p>
          </div>
          <div className="flex flex-col gap-2 flex-shrink-0">
            <a href="tel:+18773884362" className="inline-flex items-center gap-2 bg-[#16a34a] text-white text-sm font-semibold px-5 py-2.5 rounded-xl hover:bg-[#15803d] transition-colors">
              (877) 388-4362
            </a>
            <a href="mailto:info@IDOCdentallab.com" className="inline-flex items-center gap-2 bg-white/10 text-white text-sm font-semibold px-5 py-2.5 rounded-xl hover:bg-white/20 transition-colors">
              Email Us
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}