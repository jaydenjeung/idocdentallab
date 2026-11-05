import { createAdminClient } from "@/lib/supabase-admin";
import { fileNameFromPath } from "@/lib/scan-files";
import AdminHomeClient, {
  type AdminCaseRow,
  type AdminClinicRow,
  type AdminLeadRow,
} from "@/components/AdminHomeClient";

function text(value: unknown) {
  if (typeof value === "string") return value;
  if (value == null) return "";
  return String(value);
}

function teeth(value: unknown) {
  if (Array.isArray(value)) return value.map(String).join(", ");
  return text(value);
}

export default async function AdminPage() {
  const admin = createAdminClient();

  const [profilesRes, casesRes, leadsRes] = await Promise.all([
    admin.from("clinic_profiles").select("*"),
    admin.from("clinic_cases").select("*").order("created_at", { ascending: false }).limit(300),
    admin.from("leads").select("*").order("created_at", { ascending: false }).limit(200),
  ]);

  const profiles = profilesRes.data || [];
  const cases = casesRes.data || [];

  const caseCount = new Map<string, number>();
  for (const row of cases) {
    const id = text(row.clinic_id);
    if (!id) continue;
    caseCount.set(id, (caseCount.get(id) || 0) + 1);
  }

  const profileById = new Map(
    profiles.map((p) => [
      text(p.id),
      {
        practice: text(p.practice_name),
        doctor: text(p.full_name),
      },
    ])
  );

  const clinics: AdminClinicRow[] = profiles
    .map((p) => {
      const id = text(p.id);
      const address = [p.address, p.city, p.state, p.zip]
        .map(text)
        .filter(Boolean)
        .join(", ");
      return {
        id,
        practiceName: text(p.practice_name) || "—",
        doctorName: text(p.full_name),
        email: text(p.email),
        phone: text(p.phone),
        address,
        npi: text(p.npi_number),
        status: text(p.status) || "active",
        caseCount: caseCount.get(id) || 0,
      };
    })
    .sort((a, b) => a.practiceName.localeCompare(b.practiceName));

  const caseRows: AdminCaseRow[] = cases.map((c) => {
    const paths = Array.isArray(c.file_paths) ? c.file_paths.map(String) : [];
    const profile = profileById.get(text(c.clinic_id));
    return {
      id: text(c.id),
      clinicId: text(c.clinic_id),
      practiceName: profile?.practice || "—",
      doctorName: profile?.doctor || text(c.signature_name),
      patient: text(c.patient_name),
      caseType: text(c.case_type),
      material: text(c.material),
      shade: text(c.shade),
      toothNumbers: teeth(c.tooth_numbers),
      dueDate: text(c.due_date),
      notes: text(c.notes),
      status: text(c.status) || "received",
      createdAt: text(c.created_at),
      filePaths: paths,
      fileNames: paths.map(fileNameFromPath),
    };
  });

  const leads: AdminLeadRow[] = (leadsRes.data || []).map((lead, index) => ({
    id: text(lead.id) || `lead-${index}`,
    practiceName: text(lead.practice_name) || "—",
    doctorName: text(lead.doctor_name),
    email: text(lead.email),
    phone: text(lead.phone),
    service: text(lead.service),
    patient: text(lead.patient_name),
    notes: text(lead.notes),
    createdAt: text(lead.created_at),
  }));

  return (
    <main className="mx-auto max-w-6xl px-6 py-10">
      <AdminHomeClient
        clinics={clinics}
        cases={caseRows}
        leads={leads}
        clinicsError={profilesRes.error?.message || ""}
        casesError={casesRes.error?.message || ""}
        leadsError={leadsRes.error?.message || ""}
      />
    </main>
  );
}
