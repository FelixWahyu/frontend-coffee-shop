import { BASE_URL } from "@/lib/api";

export default async function LogoutService() {
  const req = await fetch(`${BASE_URL}/users/logout`, {
    method: "DELETE",
    credentials: "include",
  });

  const res = await req.json();

  if (!req.ok) {
    throw new Error(res.message || "Failed to logout");
  }

  return res;
}
