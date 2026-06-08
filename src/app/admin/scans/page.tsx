import { redirect } from "next/navigation";
import Link from "next/link";
import { createServerSupabaseClient } from "@/lib/supabase-server";
import { createAdminClient } from "@/lib/supabase-admin";
import { isAdminEmail } from "@/lib/admin";
import { fileNameFromPath } from "@/lib/scan-files";
import AdminScansClient, { type AdminScanRow } from "@/components/AdminScansClient";

export default async function AdminScansPage() {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login?next=/admin/scans");
  if (!isAdminEmail(user.email)) redirect("/dashboard");

  const admin = createAdminClient();

  const [{ data: scanUploads }, { data: clinicCases }, { data: profiles }] =
    await Promise.all([
      admin
        .from("scan_uploads")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(200),
      admin
        .from("clinic_cases")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(200),
      admin.from("clinic_profiles").select("id, practice_name, full_name"),
    ]);

  const profileMap = new Map(
    (profiles || []).map((p) => [
      p.id,
      { practice: p.practice_name as string, doctor: p.full_name as string },
    ])
  );

  const rows: AdminScanRow[] = [];

  for (const s of scanUploads || []) {
    const paths = (s.file_paths as string[]) || [];
    const names = (s.file_names as string[]) || paths.map(fileNameFromPath);
    rows.push({
      id: s.id,
      source: "digital-impression",
      createdAt: s.created_at || "",
      practiceName: s.practice_name || "—",
      doctorName: s.doctor_name || "",
      patient: s.patient_initials || "",
      caseSummary: s.service_type || "",
      toothNumbers: s.tooth_numbers || "",
      dueDate: s.due_date || "",
      notes: s.notes || "",
      status: s.status || "pending",
      filePaths: paths,
      fileNames: names,
    });
  }

  for (const c of clinicCases || []) {
    const paths = (c.file_paths as string[]) || [];
    if (paths.length === 0) continue;

    const profile = profileMap.get(c.clinic_id);
    const teeth = Array.isArray(c.tooth_numbers)
      ? c.tooth_numbers.join(", ")
      : String(c.tooth_numbers || "");

    rows.push({
      id: c.id,
      source: "client-portal",
      createdAt: c.created_at || "",
      practiceName: profile?.practice || "—",
      doctorName: profile?.doctor || c.signature_name || "",
      patient: c.patient_name || "",
      caseSummary: [c.case_type, c.material].filter(Boolean).join(" · "),
      toothNumbers: teeth,
      dueDate: c.due_date || "",
      notes: c.notes || "",
      status: c.status || "received",
      filePaths: paths,
      fileNames: paths.map(fileNameFromPath),
    });
  }

  rows.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="border-b border-gray-200 bg-white px-6 py-4">
        <div className="mx-auto flex max-w-5xl items-center justify-between">
          <div>
            <p className="text-[10px] font-medium uppercase tracking-widest text-gray-400">
              Admin
            </p>
            <h1 className="text-lg font-bold text-gray-900">Scan uploads</h1>
          </div>
          <Link
            href="/dashboard"
            className="text-sm font-medium text-gray-500 hover:text-gray-900"
          >
            ← Dashboard
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-10">
        <p className="mb-6 text-sm text-gray-500">
          Download STL and scan files submitted through the website (not Evident).
          Signed in as <span className="font-medium text-gray-700">{user.email}</span>.
        </p>
        <AdminScansClient rows={rows} />
      </main>
    </div>
  );
}
