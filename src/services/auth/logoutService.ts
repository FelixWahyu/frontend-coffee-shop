import { BASE_URL } from "@/lib/api";

export default async function LogoutService(token: string) {
  const req = await fetch(`${BASE_URL}/users/logout`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const res = await req.json();

  if (!req.ok) {
    throw new Error(res.message || "Failed to logout");
  }

  return res;
}
