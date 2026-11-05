import { NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase-server";
import { isAdminEmail } from "@/lib/admin";

/** Where a signed-in user should land. Admins go to the lab console. */
export async function GET() {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ path: "/login", role: null });
  }

  const admin = isAdminEmail(user.email);
  return NextResponse.json({
    path: admin ? "/admin" : "/dashboard",
    role: admin ? "admin" : "clinic",
  });
}
