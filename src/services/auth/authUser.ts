import { BASE_URL } from "@/lib/api";

export default async function getCurrrentUser() {
  const res = await fetch(`${BASE_URL}/users/current`, {
    method: "GET",
    credentials: "include",
  });

  const user = await res.json();

  if (!res.ok) {
    // throw new Error(user.message || "Failed to get current user");
    return null;
  }

  return user;
}
