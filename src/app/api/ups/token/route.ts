// app/api/ups/token/route.ts
// Caches token in memory and refreshes dynamically using expires_in

let cachedToken: { value: string; expiresAt: number } | null = null;

export async function getUPSToken(): Promise<string> {
  const now = Date.now();

  // Return cached token if still valid (with 60s buffer)
  if (cachedToken && now < cachedToken.expiresAt - 60_000) {
    return cachedToken.value;
  }

  const clientId     = process.env.UPS_CLIENT_ID!;
  const clientSecret = process.env.UPS_CLIENT_SECRET!;
  const credentials  = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");

  const res = await fetch("https://onlinetools.ups.com/security/v1/oauth/token", {
    method: "POST",
    headers: {
      "Content-Type":  "application/x-www-form-urlencoded",
      "Authorization": `Basic ${credentials}`,
    },
    body: "grant_type=client_credentials",
  });

  if (!res.ok) {
  const err = await res.text();
  console.error("UPS token failed:", res.status, err);
  throw new Error(`UPS token error ${res.status}: ${err}`);
}

  const data = await res.json();

  cachedToken = {
    value:     data.access_token,
    expiresAt: now + parseInt(data.expires_in) * 1000, // dynamic — never hardcoded
  };

  return cachedToken.value;
}