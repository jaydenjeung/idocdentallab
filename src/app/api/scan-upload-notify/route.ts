import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { getNotificationEmails } from "@/lib/notifications";

const resend = new Resend(process.env.RESEND_API_KEY!);

function row(label: string, value: string | undefined | null) {
  if (!value) return "";
  return `
    <tr style="border-bottom: 1px solid #eee;">
      <td style="padding: 10px 0; color: #666; width: 140px;">${label}</td>
      <td style="padding: 10px 0;">${value}</td>
    </tr>`;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      source = "website",
      practiceName,
      doctorName,
      patientName,
      patientInitials,
      serviceType,
      caseType,
      material,
      shade,
      toothNumbers,
      dueDate,
      notes,
      fileNames,
    } = body;

    const patient = patientName || patientInitials;
    const service = serviceType || (caseType && material ? `${caseType} — ${material}` : caseType || material);
    const practice = practiceName || "Unknown practice";
    const doctor = doctorName || "Unknown";

    if (!patient && !service && (!fileNames || fileNames.length === 0)) {
      return NextResponse.json({ error: "Missing case details" }, { status: 400 });
    }

    const filesList =
      Array.isArray(fileNames) && fileNames.length > 0
        ? fileNames.map((f: string) => `• ${f}`).join("<br/>")
        : "—";

    const sourceLabel =
      source === "digital-impression"
        ? "Digital impression upload"
        : source === "client-portal"
          ? "Client portal (dashboard)"
          : source;

    await resend.emails.send({
      from: "IDOC Portal <noreply@idocdentallab.com>",
      to: getNotificationEmails(),
      subject: `New scan upload — ${practice}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 24px;">
          <h2 style="margin: 0 0 8px; font-size: 20px;">New case submitted via website</h2>
          <p style="margin: 0 0 24px; font-size: 14px; color: #666;">
            A dentist uploaded scan files through the IDOC website (not Evident).
          </p>

          <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
            ${row("Source", sourceLabel)}
            ${row("Practice", practice)}
            ${row("Doctor", doctor)}
            ${row("Patient", patient)}
            ${row("Service / case", service)}
            ${row("Shade", shade)}
            ${row("Tooth numbers", toothNumbers)}
            ${row("Due date", dueDate)}
            ${row("Files", filesList)}
            ${row("Notes", notes)}
          </table>

          <div style="margin-top: 24px; padding: 16px; background: #f0fdf4; border-radius: 8px; font-size: 13px; color: #166534;">
            Files are in Supabase Storage (<code>clinic-uploads</code>). Check the
            <strong>scan_uploads</strong> or <strong>clinic_cases</strong> table in Supabase for full paths.
          </div>

          <div style="margin-top: 16px; padding: 16px; background: #f9fafb; border-radius: 8px; font-size: 13px; color: #666;">
            Received: ${new Date().toLocaleString("en-US", { timeZone: "America/Los_Angeles" })} (PT)
          </div>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Scan upload notify error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
