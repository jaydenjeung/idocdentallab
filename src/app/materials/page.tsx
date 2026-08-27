import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Material Information",
  description:
    "General information about dental alloys, zirconia, ceramics, and other materials used at IDOC Dental Lab. Request case-specific composition, SDS, and manufacturer documentation.",
};

const jumpLinks = [
  { href: "#alloys", label: "Alloys" },
  { href: "#pfm", label: "PFM" },
  { href: "#rpd", label: "RPD frameworks" },
  { href: "#titanium", label: "Titanium" },
  { href: "#zirconia", label: "Zirconia" },
  { href: "#ceramics", label: "Ceramics" },
  { href: "#denture-bases", label: "Denture bases" },
  { href: "#flexible", label: "Flexible partials" },
  { href: "#appliances", label: "Night guards" },
  { href: "#allergies", label: "Allergies" },
  { href: "#documentation", label: "Documentation" },
  { href: "#request", label: "Request case info" },
];

const alloyElements = [
  "Nickel",
  "Beryllium",
  "Cobalt",
  "Chromium",
  "Titanium",
  "Palladium",
  "Gold",
  "Other alloying elements",
];

const zirconiaFactors = [
  "Restoration design",
  "Strength requirements",
  "Esthetic requirements",
  "Translucency",
  "Clinical indication",
];

const dentureBaseMaterials = [
  "Dental acrylic",
  "PMMA-based materials",
  "Digital denture materials",
  "Validated 3D-printed dental resins",
];

const applianceMaterials = [
  "Thermoplastic dental materials",
  "Acrylic materials",
  "PMMA-based materials",
  "Validated dental resins",
];

const allergyExamples = [
  "Nickel",
  "Cobalt",
  "Chromium",
  "Acrylic components",
  "Resin components",
  "Other metals or dental materials",
];

const documentationTypes = [
  "Manufacturer name",
  "Product name",
  "Material composition",
  "Alloy composition",
  "Safety Data Sheet (SDS)",
  "Technical Data Sheet (TDS)",
  "Instructions for Use (IFU)",
  "Manufacturer specifications",
];

const requestItems = [
  "Patient name and/or case number",
  "Restoration or appliance type",
  "Material information requested",
  "Specific element or material of concern, if applicable",
];

function CheckList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3">
          <svg viewBox="0 0 16 16" fill="none" className="mt-0.5 h-4 w-4 shrink-0 text-green-700">
            <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1" fill="#EDF7F2" />
            <path d="M5 8l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="text-[14px] text-ink-2">{item}</span>
        </li>
      ))}
    </ul>
  );
}

function SectionCard({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <article
      id={id}
      className="scroll-mt-24 rounded-3xl border border-surface-3 bg-white p-8 md:p-10"
    >
      <h2 className="mb-4 font-serif text-[26px] leading-tight text-ink md:text-[32px]">
        {title}
      </h2>
      <div className="space-y-4 text-[14px] leading-relaxed text-ink-3">{children}</div>
    </article>
  );
}

export default function MaterialsPage() {
  return (
    <>
      <section className="bg-white px-5 py-20 md:px-8 md:py-28">
        <div className="mx-auto max-w-6xl">
          <p className="mb-4 text-[10px] font-medium uppercase tracking-widest text-ink-3">
            For dental professionals
          </p>
          <h1 className="mb-6 font-serif text-[40px] leading-[1.05] tracking-[-1px] text-ink md:text-[56px]">
            Materials &amp; alloy<br />information.
          </h1>
          <p className="max-w-2xl text-[15px] leading-relaxed text-ink-3">
            Dentists and dental staff may have questions about the materials used
            in restorations and appliances. This page provides general information
            about commonly used dental materials and explains how to request
            case-specific documentation when needed.
          </p>

          <div className="mt-8 flex flex-wrap gap-2">
            {jumpLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="rounded-full border border-surface-3 px-4 py-1.5 text-[12px] text-ink-3 hover:border-green-700 hover:text-green-700 transition-colors"
              >
                {l.label}
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-surface px-5 pb-24 pt-2 md:px-8">
        <div className="mx-auto max-w-6xl space-y-6">
          <SectionCard id="alloys" title="Dental Alloys">
            <p>
              Different dental alloys may be used depending on the restoration type,
              prescription, manufacturing process, and clinical requirements.
            </p>
            <p>Dental alloy categories may include:</p>
            <CheckList
              items={[
                "Noble and high-noble alloys",
                "Base metal alloys",
                "Cobalt-chromium alloys",
                "Titanium and titanium alloys",
              ]}
            />
            <p>
              Because the exact elemental composition varies by product and
              manufacturer, alloy composition should be confirmed using the
              applicable manufacturer&apos;s current product documentation.
            </p>
            <div className="rounded-2xl border border-surface-3 bg-surface p-6">
              <p className="mb-3 text-[13px] font-medium text-ink">
                Need to know if an alloy contains a specific metal?
              </p>
              <p className="mb-4 text-[13px] leading-relaxed text-ink-3">
                If you need information regarding the presence or concentration of a
                particular element, please contact IDOC Dental Lab with the
                applicable case number. We will review the case information and,
                when available, provide the applicable manufacturer or product
                documentation.
              </p>
              <CheckList items={alloyElements} />
            </div>
          </SectionCard>

          <SectionCard id="pfm" title="PFM Restorations">
            <p>
              Porcelain-fused-to-metal (PFM) restorations use a dental alloy
              substructure with a ceramic veneering material.
            </p>
            <p>
              The alloy selected may vary depending on the prescribed restoration
              and material requirements.
            </p>
            <p>
              If you require the exact alloy name or composition for a particular
              PFM case, please contact us with the case number.
            </p>
          </SectionCard>

          <SectionCard id="rpd" title="Removable Partial Denture Frameworks">
            <p>
              Cobalt-chromium and other dental alloys may be used in the
              fabrication of removable partial denture frameworks depending on the
              prescribed appliance and manufacturing process.
            </p>
            <p>Exact composition varies by product and manufacturer.</p>
            <p>
              For case-specific composition or manufacturer information, please
              contact our laboratory.
            </p>
          </SectionCard>

          <SectionCard id="titanium" title="Titanium &amp; Implant Components">
            <p>
              Titanium or titanium alloys may be used in certain implant-related
              restorations and prosthetic components.
            </p>
            <p>
              The specific titanium material, grade, alloy, or component
              manufacturer may vary depending on the restoration and component
              selected.
            </p>
            <p>
              If specific titanium information is required, please provide the
              case number or component information so that we can identify the
              applicable documentation.
            </p>
          </SectionCard>

          <SectionCard id="zirconia" title="Zirconia">
            <p>
              Dental zirconia is a ceramic restorative material commonly used for
              crowns, bridges, implant-supported restorations, and other fixed
              prosthetic applications.
            </p>
            <p>
              Different zirconia products may be selected depending on factors such
              as:
            </p>
            <CheckList items={zirconiaFactors} />
            <p>
              Product specifications vary between manufacturers and zirconia
              formulations. For information regarding the zirconia used in a
              specific case, please contact our laboratory with the case number.
            </p>
          </SectionCard>

          <SectionCard id="ceramics" title="Lithium Disilicate &amp; Other Dental Ceramics">
            <p>
              Lithium disilicate and other dental ceramics may be used for crowns,
              veneers, inlays, onlays, and other prescribed restorations.
            </p>
            <p>
              The exact ceramic material and manufacturer may vary according to the
              restoration and fabrication process.
            </p>
            <p>
              Manufacturer information and applicable product documentation may be
              available upon request.
            </p>
          </SectionCard>

          <SectionCard id="denture-bases" title="Denture Base Materials">
            <p>
              Depending on the prescribed appliance and manufacturing process,
              denture bases may be fabricated using materials such as:
            </p>
            <CheckList items={dentureBaseMaterials} />
            <p>
              Material formulation and properties vary by manufacturer. For
              information regarding the material used in a particular denture case,
              please contact IDOC Dental Lab.
            </p>
          </SectionCard>

          <SectionCard id="flexible" title="Flexible Partial Materials">
            <p>
              Flexible partial dentures may be fabricated using thermoplastic
              dental materials designed for removable prosthetic applications.
            </p>
            <p>
              The exact material used may vary depending on the prescribed
              appliance and manufacturing process.
            </p>
            <p>
              For product-specific material information, please contact us with the
              applicable case information.
            </p>
          </SectionCard>

          <SectionCard id="appliances" title="Night Guards, Splints &amp; Retainers">
            <p>
              Night guards, occlusal splints, retainers, and similar appliances may
              be fabricated from different dental materials depending on the
              appliance design and manufacturing method. These may include:
            </p>
            <CheckList items={applianceMaterials} />
            <p>
              Please contact our laboratory if material identification is required
              for a particular case.
            </p>
          </SectionCard>

          <article
            id="allergies"
            className="scroll-mt-24 rounded-3xl border border-green-700 bg-green-900 p-8 md:p-10"
          >
            <h2 className="mb-4 font-serif text-[26px] leading-tight text-white md:text-[32px]">
              Patient Allergies or Material Sensitivities
            </h2>
            <div className="space-y-4 text-[14px] leading-relaxed text-white/70">
              <p>
                If a patient has a known or suspected allergy, sensitivity, or
                material restriction, please notify IDOC Dental Lab on the
                laboratory prescription before fabrication.
              </p>
              <p>Examples may include concerns regarding:</p>
              <ul className="space-y-3">
                {allergyExamples.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <svg viewBox="0 0 16 16" fill="none" className="mt-0.5 h-4 w-4 shrink-0 text-green-400">
                      <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1" fill="none" />
                      <path d="M5 8l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span className="text-[14px] text-white/85">{item}</span>
                  </li>
                ))}
              </ul>
              <p>
                IDOC Dental Lab can provide available material information to assist
                the prescribing clinician in reviewing material options.
              </p>
              <p>
                Selection of a material for an individual patient should be made by
                the prescribing clinician based on the patient&apos;s clinical
                history, treatment requirements, and other relevant considerations.
              </p>
              <p className="text-white/90">
                IDOC Dental Lab does not diagnose material allergies or determine
                whether a particular material is medically appropriate for an
                individual patient.
              </p>
            </div>
          </article>

          <div
            id="documentation"
            className="scroll-mt-24 grid gap-6 md:grid-cols-2"
          >
            <article className="rounded-3xl border border-surface-3 bg-white p-8 md:p-10">
              <h2 className="mb-4 font-serif text-[26px] leading-tight text-ink md:text-[32px]">
                Material Documentation
              </h2>
              <p className="mb-5 text-[14px] leading-relaxed text-ink-3">
                Depending on the material and manufacturer, available documentation
                may include:
              </p>
              <CheckList items={documentationTypes} />
              <p className="mt-5 text-[14px] leading-relaxed text-ink-3">
                Documentation availability may vary by product and manufacturer.
              </p>
            </article>

            <article
              id="sds"
              className="scroll-mt-24 rounded-3xl border border-surface-3 bg-white p-8 md:p-10"
            >
              <h2 className="mb-4 font-serif text-[26px] leading-tight text-ink md:text-[32px]">
                Safety Data Sheets (SDS)
              </h2>
              <p className="text-[14px] leading-relaxed text-ink-3">
                Safety Data Sheets primarily contain information relating to
                occupational handling, storage, exposure, and other safety
                considerations associated with a material or chemical product.
              </p>
              <p className="mt-4 text-[14px] leading-relaxed text-ink-3">
                An SDS should not be considered a substitute for the
                manufacturer&apos;s Instructions for Use, product labeling,
                technical documentation, or clinical evaluation of a completed
                dental restoration or appliance.
              </p>
            </article>
          </div>

          <SectionCard id="request" title="Need Information About a Specific Case?">
            <p>
              For the most accurate material information, please provide:
            </p>
            <CheckList items={requestItems} />
            <p>
              Our team will review the available case and product information and
              provide applicable documentation when available.
            </p>
            <div className="flex flex-col gap-3 pt-2 sm:flex-row">
              <a
                href="tel:+1-877-388-4362"
                className="inline-flex items-center justify-center rounded-full bg-green-700 px-6 py-3 text-[13px] font-medium text-white transition-opacity hover:opacity-90"
              >
                Call (877) 388-4362
              </a>
              <a
                href="mailto:info@idocdentallab.com"
                className="inline-flex items-center justify-center rounded-full border border-surface-3 px-6 py-3 text-[13px] font-medium text-ink-2 transition-colors hover:border-green-700 hover:text-green-700"
              >
                Email info@idocdentallab.com
              </a>
            </div>
          </SectionCard>

          <article
            id="notice"
            className="rounded-3xl border border-surface-3 bg-white p-8 md:p-10"
          >
            <p className="mb-3 text-[10px] font-medium uppercase tracking-widest text-ink-4">
              Important notice
            </p>
            <h2 className="mb-4 font-serif text-[26px] leading-tight text-ink md:text-[32px]">
              Material Information Notice
            </h2>
            <div className="space-y-4 text-[14px] leading-relaxed text-ink-3">
              <p>
                The information provided on this website is intended for general
                informational purposes for dental professionals.
              </p>
              <p>
                Dental materials, formulations, manufacturers, specifications, and
                product availability may change from time to time. General
                descriptions on this website should not be relied upon to determine
                the exact composition of a material used in a specific patient case.
              </p>
              <p>
                Case-specific material information should be verified using
                applicable case records and the manufacturer&apos;s current product
                documentation.
              </p>
              <p>
                Information provided by IDOC Dental Lab does not replace the
                manufacturer&apos;s product labeling, Instructions for Use (IFU),
                Safety Data Sheet (SDS), Technical Data Sheet (TDS), or other
                applicable manufacturer documentation.
              </p>
              <p>
                Nothing on this page is intended to constitute medical advice,
                diagnose a material allergy or sensitivity, or determine the
                clinical suitability of a material for a particular patient.
              </p>
              <p>
                Clinical treatment decisions and material selection for an
                individual patient remain the responsibility of the prescribing
                licensed dental professional.
              </p>
              <p>
                For case-specific material questions, please contact IDOC Dental Lab
                directly.
              </p>
            </div>
          </article>
        </div>
      </section>

      <section className="bg-green-900 px-5 py-20 md:px-8">
        <div className="mx-auto max-w-6xl flex flex-col items-center text-center gap-6 md:flex-row md:justify-between md:text-left">
          <div>
            <h2 className="font-serif text-[28px] text-white md:text-[36px]">
              Have a case-specific material question?
            </h2>
            <p className="mt-2 text-[14px] text-white/50">
              Include the case number and we&apos;ll send available manufacturer
              documentation.
            </p>
          </div>
          <a
            href="tel:+1-877-388-4362"
            className="shrink-0 rounded-full bg-white px-8 py-3.5 text-sm font-medium text-green-900 transition-opacity hover:opacity-90"
          >
            Call (877) 388-4362
          </a>
        </div>
      </section>
    </>
  );
}
