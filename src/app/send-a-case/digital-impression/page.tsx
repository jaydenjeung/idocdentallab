"use client";

import { useState } from "react";

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
      {
        title: "Open My Favorite Laboratories",
        detail: "From the side menu, select 'My Favorite Laboratories'.",
      },
      {
        title: "Search for iDOC Dental Lab",
        detail: "Click 'Search Labs' and type 'IDOC dental lab' in the search field.",
      },
      {
        title: "Add and confirm iDOC",
        detail: "Click the + button next to IDOC dental lab in the results and confirm to add it to your favorites.",
      },
      {
        title: "Send your scan file",
        detail: "After scanning, open the CEREC Connect app, select iDOC Dental Lab as the recipient, and submit your digital impression file.",
        tip: "You'll receive a confirmation from iDOC once your case has been received.",
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
      {
        title: "Create a new case",
        detail: "Start a new case and fill in the patient information and prescription details.",
      },
      {
        title: "Select iDOC as the receiving lab",
        detail: "In the lab search field, type 'iDOC Dental Lab' and select it from the results.",
        tip: "Save iDOC as a favorite lab after your first submission to speed up future cases.",
      },
      {
        title: "Attach scan data and send",
        detail: "Attach your completed scan files to the case and click 'Send' to submit.",
      },
      {
        title: "Confirm submission",
        detail: "Check for the submission confirmation. The iDOC team will reach out as soon as your case is received.",
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
      {
        title: "Create a new prescription",
        detail: "From the dashboard, select 'New Prescription' and enter the patient information and case details.",
      },
      {
        title: "Select iDOC as the lab",
        detail: "In the lab selection field, search for 'iDOC Dental Lab' and select it.",
        tip: "If iDOC doesn't appear, lab account linking may be required — call (877) 388-4362 for quick setup.",
      },
      {
        title: "Complete scan and attach",
        detail: "Finish your scan or attach an existing scan file to the case.",
      },
      {
        title: "Submit the case",
        detail: "Click 'Submit'. The iDOC team will begin processing your case immediately upon receipt.",
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
        title: "Connect with iDOC Dental Lab",
        detail: "Under 'Partners', search for iDOC Dental Lab and send a connection request.",
        tip: "First-time users: call us at (877) 388-4362 before connecting so we can approve you right away.",
      },
      {
        title: "Create a new case",
        detail: "In Medit Link, create a new case and enter the patient information.",
      },
      {
        title: "Attach your scan file",
        detail: "Attach the completed 3D scan file (STL or PLY format) to the case.",
      },
      {
        title: "Send to iDOC",
        detail: "Select iDOC Dental Lab as the recipient and click 'Send'.",
        tip: "iDOC will confirm receipt and follow up with you shortly after.",
      },
    ],
  },
};

const scannerOrder: Scanner[] = ["cerec", "trios", "itero", "medit"];

export default function DigitalImpressionPage() {
  const [active, setActive] = useState<Scanner>("cerec");
  const [openStep, setOpenStep] = useState<number | null>(null);

  const data = scanners[active];

  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-[#0a3d2e] px-6 py-14 md:py-20">
        <div className="max-w-3xl mx-auto">
          <p className="text-[#4ade80] text-sm font-medium tracking-widest uppercase mb-3">
            Send a Case
          </p>
          <h1 className="text-white text-3xl md:text-4xl font-bold leading-tight mb-4">
            Send a Digital Impression
          </h1>
          <p className="text-white/70 text-base md:text-lg max-w-xl">
            Select your intraoral scanner below for step-by-step instructions
            on how to send files directly to iDOC.
          </p>
        </div>
      </section>

      {/* Scanner Tabs */}
      <section className="sticky top-0 z-20 bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-3xl mx-auto px-4">
          <div className="flex">
            {scannerOrder.map((key) => (
              <button
                key={key}
                onClick={() => {
                  setActive(key);
                  setOpenStep(null);
                }}
                className={`flex-1 py-4 text-sm font-semibold border-b-2 transition-all duration-150 ${
                  active === key
                    ? "border-[#16a34a] text-[#16a34a]"
                    : "border-transparent text-gray-400 hover:text-gray-700"
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
        {/* Scanner Header */}
        <div className="mb-8">
          <span className="inline-block bg-[#dcfce7] text-[#166534] text-xs font-semibold px-3 py-1 rounded-full mb-3">
            {data.label}
          </span>
          <h2 className="text-xl font-bold text-gray-900 mb-1">{data.tagline}</h2>
          <p className="text-sm text-gray-500">
            Tap each step to expand the instructions.
          </p>
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
                  isOpen
                    ? "border-[#16a34a] bg-[#f0fdf4]"
                    : isDone
                    ? "border-gray-100 bg-gray-50 opacity-50"
                    : "border-gray-200 bg-white hover:border-gray-300"
                }`}
              >
                <div className="flex items-center gap-4 px-5 py-4">
                  <div
                    className={`flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${
                      isOpen ? "bg-[#16a34a] text-white" : "bg-gray-100 text-gray-500"
                    }`}
                  >
                    {isDone ? (
                      <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
                        <path d="M3 8l3.5 3.5L13 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    ) : (
                      i + 1
                    )}
                  </div>
                  <span className={`flex-1 font-semibold text-sm md:text-base ${isOpen ? "text-[#166534]" : "text-gray-800"}`}>
                    {step.title}
                  </span>
                  <svg
                    className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                    viewBox="0 0 16 16" fill="none"
                  >
                    <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>

                {isOpen && (
                  <div className="px-5 pb-5">
                    <div className="ml-[52px]">
                      <p className="text-gray-700 text-sm leading-relaxed mb-2">{step.detail}</p>
                      {step.link && (
                        <a
                          href={step.link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="inline-flex items-center gap-1 bg-gray-100 border border-gray-200 rounded-md px-2 py-1 text-xs text-blue-600 font-medium hover:bg-gray-200 transition-colors mb-2"
                        >
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

        {/* CTA */}
        <div className="mt-8 rounded-2xl bg-[#0a3d2e] px-6 py-6 flex flex-col md:flex-row md:items-center gap-4">
          <div className="flex-1">
            <p className="text-white font-semibold text-sm mb-1">
              Send us your case details after submission
            </p>
            <p className="text-white/60 text-xs leading-relaxed">
              Once your file is sent, share the patient name, case number, and any
              special instructions via phone or email so we can get started right away.
            </p>
          </div>
          <div className="flex flex-col gap-2 flex-shrink-0">
            <a
              href="tel:+18773884362"
              className="inline-flex items-center gap-2 bg-[#16a34a] text-white text-sm font-semibold px-5 py-2.5 rounded-xl hover:bg-[#15803d] transition-colors"
            >
              (877) 388-4362
            </a>
            <a
              href="mailto:info@idocdentallab.com"
              className="inline-flex items-center gap-2 bg-white/10 text-white text-sm font-semibold px-5 py-2.5 rounded-xl hover:bg-white/20 transition-colors"
            >
              Email Us
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}