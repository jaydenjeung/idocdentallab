import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const resend = new Resend(process.env.RESEND_API_KEY!);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      practiceName,
      doctorName,
      phone,
      email,
      service,
      patientName,
      dueDate,
      scanMethod,
      notes,
    } = body;

    // 1. Supabase에 저장
    const { error: dbError } = await supabase.from("leads").insert({
      practice_name: practiceName,
      doctor_name: doctorName,
      phone,
      email,
      service,
      patient_name: patientName || null,
      due_date: dueDate || null,
      scan_method: scanMethod || null,
      notes: notes || null,
    });

    if (dbError) {
      console.error("Supabase error:", dbError);
      return NextResponse.json({ error: "DB error" }, { status: 500 });
    }

    // 2. IDOC 어드민 알림 이메일
    await resend.emails.send({
  from: "IDOC Portal <noreply@idocdentallab.com>",
  to: "info@idocdentallab.com",
      subject: `${service === "Local Pickup Request" ? "Local Pickup Request" : "New Case Request"} — ${practiceName}`,
  html: `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 24px;">
      <h2 style="margin: 0 0 24px; font-size: 20px;">New case request received</h2>

      <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
        <tr style="border-bottom: 1px solid #eee;">
          <td style="padding: 10px 0; color: #666; width: 140px;">Practice</td>
          <td style="padding: 10px 0; font-weight: 600;">${practiceName}</td>
        </tr>
        <tr style="border-bottom: 1px solid #eee;">
          <td style="padding: 10px 0; color: #666;">Doctor</td>
          <td style="padding: 10px 0;">${doctorName}</td>
        </tr>
        <tr style="border-bottom: 1px solid #eee;">
          <td style="padding: 10px 0; color: #666;">Phone</td>
          <td style="padding: 10px 0;">${phone}</td>
        </tr>
        <tr style="border-bottom: 1px solid #eee;">
          <td style="padding: 10px 0; color: #666;">Email</td>
          <td style="padding: 10px 0;">${email}</td>
        </tr>
        <tr style="border-bottom: 1px solid #eee;">
          <td style="padding: 10px 0; color: #666;">Service</td>
          <td style="padding: 10px 0;">${service}</td>
        </tr>
        ${patientName ? `
        <tr style="border-bottom: 1px solid #eee;">
          <td style="padding: 10px 0; color: #666;">Patient</td>
          <td style="padding: 10px 0;">${patientName}</td>
        </tr>` : ""}
        ${dueDate ? `
        <tr style="border-bottom: 1px solid #eee;">
          <td style="padding: 10px 0; color: #666;">Due Date</td>
          <td style="padding: 10px 0;">${dueDate}</td>
        </tr>` : ""}
        ${scanMethod ? `
        <tr style="border-bottom: 1px solid #eee;">
          <td style="padding: 10px 0; color: #666;">Submission</td>
          <td style="padding: 10px 0;">${scanMethod}</td>
        </tr>` : ""}
        ${notes ? `
        <tr>
          <td style="padding: 10px 0; color: #666; vertical-align: top;">Notes</td>
          <td style="padding: 10px 0;">${notes}</td>
        </tr>` : ""}
      </table>

      <div style="margin-top: 32px; padding: 16px; background: #f9fafb; border-radius: 8px; font-size: 13px; color: #666;">
        Received: ${new Date().toLocaleString("en-US", { timeZone: "America/Los_Angeles" })} (PT)
      </div>
    </div>
  `,
});

    // 3. 치과 확인 이메일
    await resend.emails.send({
      from: "IDOC Dental Lab <noreply@idocdentallab.com>",
      to: email,
      subject: "Case request received — IDOC Dental Lab",
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 24px;">
          <h2 style="margin: 0 0 8px; font-size: 20px;">We received your case request.</h2>
          <p style="color: #666; font-size: 14px; margin: 0 0 24px;">
            Hi ${doctorName}, we'll reach out within 1 business day to confirm pickup and case details.
          </p>

          <div style="padding: 20px; background: #f9fafb; border-radius: 8px; font-size: 14px; margin-bottom: 24px;">
            <p style="margin: 0 0 8px;"><strong>Service:</strong> ${service}</p>
            ${patientName ? `<p style="margin: 0 0 8px;"><strong>Patient:</strong> ${patientName}</p>` : ""}
            ${dueDate ? `<p style="margin: 0;"><strong>Requested due date:</strong> ${dueDate}</p>` : ""}
          </div>

          <p style="font-size: 13px; color: #999;">
            Questions? Call us at <a href="tel:+18773884362" style="color: #15803d;">(877) 388-4362</a> Mon–Fri.
          </p>

          <hr style="border: none; border-top: 1px solid #eee; margin: 24px 0;" />
          <p style="font-size: 12px; color: #bbb; margin: 0;">
            IDOC Dental Lab · Orange, CA · idocdentallab.com
          </p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Lead submission error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}