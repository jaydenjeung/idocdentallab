import { createClient } from "@supabase/supabase-js";
import { readFileSync } from "fs";

const env = Object.fromEntries(
  readFileSync(".env.local", "utf8")
    .split(/\r?\n/)
    .filter((l) => l && !l.startsWith("#"))
    .map((l) => {
      const i = l.indexOf("=");
      return [l.slice(0, i), l.slice(i + 1)];
    })
);

const token = (env.INSTAGRAM_ACCESS_TOKEN || "").trim();
if (!token.startsWith("IGAA") || token.length < 50) {
  console.error("Refusing to seed: INSTAGRAM_ACCESS_TOKEN looks invalid");
  process.exit(1);
}

// Verify token works before writing
const meRes = await fetch(
  "https://graph.instagram.com/me?fields=id,username&access_token=" +
    encodeURIComponent(token)
);
const me = await meRes.json();
if (!meRes.ok || me.error) {
  console.error("Refusing to seed: Graph API rejected token", me.error || me);
  process.exit(1);
}
console.log("token_ok_for", me.username, me.id);

const sb = createClient(
  env.NEXT_PUBLIC_SUPABASE_URL,
  env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { persistSession: false } }
);

const expiresAt = new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString();
const updatedAt = new Date().toISOString();

const { data: existing } = await sb
  .from("instagram_tokens")
  .select("id, access_token")
  .order("updated_at", { ascending: false })
  .limit(1)
  .maybeSingle();

let result;
if (existing?.id) {
  result = await sb
    .from("instagram_tokens")
    .update({
      access_token: token,
      expires_at: expiresAt,
      updated_at: updatedAt,
    })
    .eq("id", existing.id)
    .select("id, expires_at, updated_at")
    .single();
} else {
  result = await sb
    .from("instagram_tokens")
    .insert({
      access_token: token,
      expires_at: expiresAt,
      updated_at: updatedAt,
    })
    .select("id, expires_at, updated_at")
    .single();
}

if (result.error) {
  console.error("DB write failed", result.error);
  process.exit(1);
}

console.log("seeded", {
  id: result.data.id,
  expires_at: result.data.expires_at,
  updated_at: result.data.updated_at,
  token_len: token.length,
});
