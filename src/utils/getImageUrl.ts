import { BASE_URL } from "@/lib/api";

export function getImageUrl(path?: string | null): string {
  if (!path) return "/assets/placeholder.jpg";
  if (path.startsWith("http://") || path.startsWith("https://") || path.startsWith("data:")) {
    return path;
  }
  const baseHost = BASE_URL.replace("/api", "");
  return `${baseHost}${path.startsWith("/") ? "" : "/"}${path}`;
}
