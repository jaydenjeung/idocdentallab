import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase-admin";
import { requireAdminUser } from "@/lib/require-admin";
import { fileNameFromPath } from "@/lib/scan-files";

const BUCKET = "clinic-uploads";

function isValidStoragePath(path: string): boolean {
  if (!path || path.length > 1024) return false;
  if (path.startsWith("/") || path.includes("\\") || /[\u0000-\u001f\u007f]/.test(path)) return false;
  const parts = path.split("/");
  return parts.every((part) => part.length > 0 && part !== "." && part !== "..");
}

export async function GET(req: NextRequest) {
  const user = await requireAdminUser();
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
