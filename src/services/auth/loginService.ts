import { BASE_URL } from "@/lib/api";
import { LoginRequest } from "@/types/login";

export default async function LoginService(data: LoginRequest) {
  const req = await fetch(`${BASE_URL}/users/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const res = await req.json();

  if (!req.ok) {
    throw new Error(res.message || "Failed to login");
  }

  return res;
}
