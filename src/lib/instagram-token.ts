import { createAdminClient } from "@/lib/supabase-admin";

export type InstagramTokenRow = {
  id: string;
  access_token: string;
  expires_at: string;
  updated_at: string;
};

/** Most recently updated token row, or null if the table is empty / unreachable. */
export async function getLatestInstagramToken(): Promise<InstagramTokenRow | null> {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("instagram_tokens")
    .select("id, access_token, expires_at, updated_at")
    .order("updated_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error) {
    console.error("instagram_tokens read failed:", error);
    return null;
  }

  return data;
}

/**
 * Prefer DB token; fall back to INSTAGRAM_ACCESS_TOKEN env so the site keeps working
 * if Supabase is down or the table is not seeded yet.
 */
export async function getInstagramAccessToken(): Promise<string | null> {
  try {
    const row = await getLatestInstagramToken();
    if (row?.access_token) return row.access_token;
  } catch (err) {
    console.error("getInstagramAccessToken DB error:", err);
  }

  return process.env.INSTAGRAM_ACCESS_TOKEN || null;
}

/**
 * Accepts either:
 * - x-cron-secret: <CRON_SECRET> (manual curl)
 * - Authorization: Bearer <CRON_SECRET> (Vercel Cron auto-injects this)
 */
export function isAuthorizedCronRequest(request: Request): boolean {
  const secret = process.env.CRON_SECRET;
  if (!secret) return false;

  const headerSecret = request.headers.get("x-cron-secret");
  if (headerSecret && headerSecret === secret) return true;

  const auth = request.headers.get("authorization");
  if (auth === `Bearer ${secret}`) return true;

  return false;
}
