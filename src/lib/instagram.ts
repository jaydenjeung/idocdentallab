export const INSTAGRAM_PROFILE_URL = "https://www.instagram.com/idocdentallab";

/** Append to internal links from the Instagram landing page for analytics. */
export const IG_UTM = "utm_source=instagram&utm_medium=social&utm_campaign=ig_landing";

export function withIgUtm(path: string): string {
  const separator = path.includes("?") ? "&" : "?";
  return `${path}${separator}${IG_UTM}`;
}
