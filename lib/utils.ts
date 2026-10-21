export { cn } from "cn";

export function normalizeGoogleDriveUrl(url?: string | null, defaultSize = "w1000"): string {
  if (!url || typeof url !== "string") return "";
  const trimmed = url.trim();
  if (!trimmed) return "";

  // If already a direct Google CDN link
  if (trimmed.includes("googleusercontent.com/d/")) {
    return trimmed;
  }

  const sizeMatch = trimmed.match(/[?&]sz=([a-zA-Z0-9]+)/i);
  const size = sizeMatch ? sizeMatch[1] : defaultSize;

  const driveRegex = /(?:drive\.google\.com\/(?:file\/d\/|open\?(?:.*&)?id=|uc\?(?:.*&)?id=|thumbnail\?(?:.*&)?id=)|docs\.google\.com\/uc\?(?:.*&)?id=)([a-zA-Z0-9_-]+)/i;
  const match = trimmed.match(driveRegex);

  if (match && match[1]) {
    return `https://lh3.googleusercontent.com/d/${match[1]}=${size}`;
  }

  return trimmed;
}
