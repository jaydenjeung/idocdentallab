import { NextRequest, NextResponse } from "next/server";
import { requireAdminUser } from "@/lib/require-admin";
import { createAdminClient } from "@/lib/supabase-admin";

const STATUSES = ["received", "in_progress", "completed", "shipped"] as const;

export async function PATCH(req: NextRequest) {
  const user = await requireAdminUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json().catch(() => null);
  const id = body?.id;
  const status = body?.status;

  if (
    typeof id !== "string" ||
    !id ||
    typeof status !== "string" ||
    !STATUSES.includes(status as (typeof STATUSES)[number])
  ) {
    return NextResponse.json({ error: "Invalid update" }, { status: 400 });
  }

  const admin = createAdminClient();
  const { error } = await admin.from("clinic_cases").update({ status }).eq("id", id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
