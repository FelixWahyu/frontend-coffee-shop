"use client";

import { useState } from "react";
import FormGroup from "@/src/components/ui/form/form-group";
import TextInput from "@/src/components/ui/form/text-input";
import Label from "@/src/components/ui/form/label";
import ErrorMessage from "@/src/components/ui/form/error";
import Button from "@/src/components/ui/button";
import CoffeeBg from "@/public/assets/image/biji-coffe-cup.jpg";
import Link from "next/link";
import Image from "next/image";
import { ErrorMsg } from "@/src/types/errorMessage";
import { LoginRequest } from "@/types/login";
import { BASE_URL } from "@/lib/api";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";

const validate = (values: LoginRequest): ErrorMsg => {
  const errors: ErrorMsg = {};

  if (!values.username) {
    errors.username = "Username is required";
  } else if (values.username.length < 3) {
    errors.username = "Username must be at least 3 characters";
  }

  if (!values.password) {
    errors.password = "Password is required";
  } else if (values.password.length < 6) {
    errors.password = "Password must be at least 6 characters";
  }

  return errors;
};

export default function Login() {
  const [errors, setErrors] = useState<ErrorMsg>({});
  const [form, setForm] = useState<LoginRequest>({
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const updateForm = {
      ...form,
      [name]: value,
    };
    setForm(updateForm);

    const validationErrors = validate(updateForm);

    setErrors((prev) => ({
      ...prev,
      [name]: validationErrors[name as keyof LoginRequest],
      general: "",
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (loading) {
      return;
    }

    const validationErrors = validate(form);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    setErrors({});

    try {
      const request = await fetch(`${BASE_URL}/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const response = await request.json();

      if (!request.ok) {
        setErrors({
          general: response.message || "Username atau Password salah.",
        });
        return;
      }
      setForm({
        username: "",
        password: "",
      });
      router.replace("/");
      //   console.log(response);
    } catch (error) {
      console.error(error);
      setErrors({
        general: "Terjadi kesalahan saat login.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="px-4 py-10">
      <div className="grid md:min-h-175 w-full md:min-w-6xl md:overflow-hidden bg-white shadow-lg rounded-md md:grid-cols-2">
        <div className="hidden md:block relative">
          <Image src={CoffeeBg} alt="coffee-bean" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-[#30261C]/70"></div>
          <div className="absolute top-1/2 left-14 text-center z-10 text-white">
            <h2 className="mb-4 text-4xl font-bold font-playfair">Welcome Back</h2>

            <p className="max-w-md text-sm leading-relaxed text-gray-200">Nikmati pengalaman kopi terbaik dengan suasana hangat dan modern.</p>
          </div>
        </div>
        <div className="flex items-center px-6 py-12 md:px-12 justify-center">
          <div className="w-full max-w-sm">
            <div className="mb-8">
              <h2 className="text-4xl font-bold font-playfair mb-3">Login</h2>
              <p className="text-sm font-lato">Silahkan login dengan akun yang terdaftar.</p>
            </div>

            {errors.general && (
              <div className="mb-4">
                <ErrorMessage message={errors.general} />
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <FormGroup>
                <Label htmlFor="username">Username</Label>
                <TextInput onChange={handleChange} value={form.username} type="text" id="username" name="username" autoComplete="username" className="bg-gray-100" />
                <ErrorMessage message={errors.username} />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <TextInput onChange={handleChange} value={form.password} type={showPassword ? "text" : "password"} id="password" name="password" autoComplete="current-password" className="bg-gray-100" />
                  <button
                    type="button"
                    aria-label="Toggle password visibility"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute cursor-pointer right-3 top-1/2 -translate-y-1/2 text-gray-500 transition hover:text-gray-700"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                <ErrorMessage message={errors.password} />
              </FormGroup>

              <Button
                type="submit"
                disabled={loading}
                className="bg-[#C67C4E] mt-4 w-full cursor-pointer text-white font-semibold transition-all duration-300 hover:bg-[#b86d3e] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-[#C67C4E]"
              >
                {loading ? "Loading..." : "Login"}
              </Button>
            </form>

            <div className="my-6 text-center">
              <p className="text-sm font-lato text-gray-600">
                Belum punya akun?{" "}
                <Link href={"/register"} className="font-semibold text-[#C67C4E] hover:underline">
                  Daftar
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
