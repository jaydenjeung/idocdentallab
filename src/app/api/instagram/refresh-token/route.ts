import { NextResponse } from "next/server";
import {
  getLatestInstagramToken,
  isAuthorizedCronRequest,
} from "@/lib/instagram-token";
import { createAdminClient } from "@/lib/supabase-admin";

export const dynamic = "force-dynamic";

const MIN_AGE_MS = 24 * 60 * 60 * 1000; // Instagram requires token to be >= 24h old
const SIXTY_DAYS_MS = 60 * 24 * 60 * 60 * 1000;

type RefreshResponse = {
  access_token?: string;
  token_type?: string;
  expires_in?: number;
  error?: {
    message?: string;
    type?: string;
    code?: number;
    error_subcode?: number;
    fbtrace_id?: string;
  };
};

export async function GET(request: Request) {
  if (!isAuthorizedCronRequest(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const row = await getLatestInstagramToken();
    if (!row?.access_token) {
      console.error("Instagram token refresh aborted: no row in instagram_tokens");
      return NextResponse.json(
        { error: "No token in database. Seed instagram_tokens first." },
        { status: 404 }
      );
    }

    const updatedAt = new Date(row.updated_at).getTime();
    const expiresAt = new Date(row.expires_at).getTime();
    const now = Date.now();

    if (Number.isNaN(updatedAt) || Number.isNaN(expiresAt)) {
      console.error("Instagram token refresh aborted: invalid timestamps", {
        updated_at: row.updated_at,
        expires_at: row.expires_at,
      });
      return NextResponse.json({ error: "Invalid token timestamps" }, { status: 500 });
    }

    if (now >= expiresAt) {
      console.error("Instagram token refresh aborted: token already expired", {
        expires_at: row.expires_at,
      });
      return NextResponse.json(
        {
          error:
            "Token already expired. Refresh is impossible — generate a new long-lived token via OAuth and re-seed.",
          expiresAt: row.expires_at,
        },
        { status: 400 }
      );
    }

    const ageMs = now - updatedAt;
    if (ageMs < MIN_AGE_MS) {
      return NextResponse.json({
        skipped: true,
        reason: "Token is less than 24 hours old (Instagram requirement)",
        updatedAt: row.updated_at,
        expiresAt: row.expires_at,
      });
    }

    const refreshUrl =
      `https://graph.instagram.com/refresh_access_token` +
      `?grant_type=ig_refresh_token` +
      `&access_token=${encodeURIComponent(row.access_token)}`;

    const igRes = await fetch(refreshUrl, { cache: "no-store" });
    const body = (await igRes.json()) as RefreshResponse;

    if (!igRes.ok || !body.access_token) {
      console.error("Instagram refresh_access_token failed:", {
        status: igRes.status,
        body,
      });
      return NextResponse.json(
        { error: "Instagram refresh failed", details: body },
        { status: 502 }
      );
    }

    const expiresInMs =
      typeof body.expires_in === "number" && body.expires_in > 0
        ? body.expires_in * 1000
        : SIXTY_DAYS_MS;
    const newExpiresAt = new Date(now + expiresInMs).toISOString();
    const newUpdatedAt = new Date(now).toISOString();

    const supabase = createAdminClient();
    const { data: updated, error: updateError } = await supabase
      .from("instagram_tokens")
      .update({
        access_token: body.access_token,
        expires_at: newExpiresAt,
        updated_at: newUpdatedAt,
      })
      .eq("id", row.id)
      .select("id, expires_at, updated_at")
      .single();

    if (updateError) {
      console.error("instagram_tokens update failed after refresh:", updateError);
      return NextResponse.json(
        { error: "Refreshed with Instagram but failed to save token", details: updateError },
        { status: 500 }
      );
    }

    return NextResponse.json({
      ok: true,
      id: updated.id,
      expiresAt: updated.expires_at,
      updatedAt: updated.updated_at,
    });
  } catch (err) {
    console.error("Instagram token refresh unexpected error:", err);
    return NextResponse.json({ error: "Refresh failed" }, { status: 500 });
  }
}
