export function getImageUrl(path) {
  // if (!path) return null;
  if (!path) return "/images/fallback.png";
  if (path.startsWith("http")) return path;

  const baseUrl =
    process.env.NEXT_PUBLIC_BE_BASE_URL || "https://api.smokify.se";

  return `${baseUrl}${path}`;
}

export function getFileUrl(path) {
  if (!path?.trim()) return null;

  // Already an absolute URL
  if (/^https?:\/\//.test(path)) return path;

  const baseUrl =
    process.env.NEXT_PUBLIC_BE_BASE_URL || "https://api.smokify.se";

  try {
    // URL constructor handles trailing/leading slashes correctly
    return new URL(path, baseUrl).toString();
  } catch {
    console.warn(`Invalid PDF path: ${path}`);
    return null;
  }
}
