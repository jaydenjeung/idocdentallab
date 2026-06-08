import { NextRequest, NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase-server";
import { createAdminClient } from "@/lib/supabase-admin";
import { isAdminEmail } from "@/lib/admin";
import { fileNameFromPath } from "@/lib/scan-files";

const BUCKET = "clinic-uploads";

function isValidStoragePath(path: string): boolean {
  if (!path || path.includes("..") || path.startsWith("/")) return false;
  return /^[a-zA-Z0-9_\-./]+$/.test(path);
}

async function requireAdmin() {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user || !isAdminEmail(user.email)) return null;
  return user;
}

export async function GET(req: NextRequest) {
  const user = await requireAdmin();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const path = req.nextUrl.searchParams.get("path");
  if (!path || !isValidStoragePath(path)) {
    return NextResponse.json({ error: "Invalid path" }, { status: 400 });
  }

  const admin = createAdminClient();
  const { data, error } = await admin.storage
    .from(BUCKET)
    .createSignedUrl(path, 3600, {
      download: fileNameFromPath(path),
    });

  if (error || !data?.signedUrl) {
    console.error("Signed URL error:", error);
    return NextResponse.json({ error: "File not found" }, { status: 404 });
  }

  return NextResponse.json({ url: data.signedUrl });
}
