import { NextResponse } from "next/server";

const TOKEN = process.env.INSTAGRAM_ACCESS_TOKEN;

export const revalidate = 3600; // cache 1 hour

export async function GET() {
  if (!TOKEN) {
    return NextResponse.json({ error: "No token" }, { status: 500 });
  }

  try {
    // Fetch recent media (reels + videos + images)
    const res = await fetch(
      `https://graph.instagram.com/me/media?fields=id,media_type,media_url,thumbnail_url,permalink,caption,timestamp&limit=100&access_token=${TOKEN}`,
      { next: { revalidate: 3600 } }
    );

    if (!res.ok) {
      const err = await res.json();
      console.error("Instagram API error:", err);
      return NextResponse.json({ error: "Instagram API error" }, { status: 500 });
    }

    const data = await res.json();

    // Filter only REELS and VIDEO
    const reels = (data.data || []).filter(
      (item: { media_type: string }) =>
        item.media_type === "VIDEO" || item.media_type === "REELS"
    );

    return NextResponse.json({ reels });
  } catch (err) {
    console.error("Fetch error:", err);
    return NextResponse.json({ error: "Fetch failed" }, { status: 500 });
  }
}