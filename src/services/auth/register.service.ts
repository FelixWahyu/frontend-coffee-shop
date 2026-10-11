import { RegisterRequest } from "@/types/login";
import { BASE_URL } from "@/lib/api";

export default async function RegisterService(data: RegisterRequest) {
  const request = await fetch(`${BASE_URL}/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const response = await request.json();

  if (!request.ok) {
    throw new Error(response.message || "Username is already taken.");
  }

  return response;
}
