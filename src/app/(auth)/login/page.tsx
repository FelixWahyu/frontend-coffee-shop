import { Suspense } from "react";
import AuthLayout from "../layout";
import Login from "@/components/auth/LoginForm";

export default function LoginPage() {
  return (
    <AuthLayout>
      <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
        <Login />
      </Suspense>
    </AuthLayout>
  );
}
