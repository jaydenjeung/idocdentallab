import { NextResponse } from "next/server";
import { getLatestInstagramToken } from "@/lib/instagram-token";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const row = await getLatestInstagramToken();

    if (!row) {
      const envFallback = Boolean(process.env.INSTAGRAM_ACCESS_TOKEN);
      return NextResponse.json(
        {
          expiresAt: null,
          daysRemaining: null,
          source: envFallback ? "env_fallback_only" : "none",
          message: envFallback
            ? "No DB token; site may still use INSTAGRAM_ACCESS_TOKEN env fallback."
            : "No token in database and no env fallback.",
        },
        { status: 404 }
      );
    }

    const expiresAt = new Date(row.expires_at);
    const msRemaining = expiresAt.getTime() - Date.now();
    const daysRemaining = Math.ceil(msRemaining / (1000 * 60 * 60 * 24));

    return NextResponse.json({
      expiresAt: expiresAt.toISOString(),
      daysRemaining,
      updatedAt: row.updated_at,
      expired: msRemaining <= 0,
    });
  } catch (err) {
    console.error("token-status error:", err);
    return NextResponse.json({ error: "Failed to read token status" }, { status: 500 });
  }
}
