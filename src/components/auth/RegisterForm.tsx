"use client";

import { useState } from "react";
import CoffeeBg from "@/public/assets/image/biji-coffe-cup.jpg";
import Image from "next/image";
import Link from "next/link";
import FormGroup from "@/components/ui/form/form-group";
import TextInput from "@/components/ui/form/text-input";
import Label from "@/components/ui/form/label";
import ErrorMessage from "@/components/ui/form/error";
import Button from "@/components/ui/button";
import { ErrorMsg } from "@/types/errorMessage";
import { RegisterRequest } from "@/types/login";
import { BASE_URL } from "@/lib/api";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, User, Lock, KeyRound } from "lucide-react";

const validate = (values: RegisterRequest): ErrorMsg => {
  const errors: ErrorMsg = {};

  if (!values.name) {
    errors.name = "Name is required";
  } else if (values.name.length < 3) {
    errors.name = "Name must be at least 3 characters";
  }

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

  if (!values.confirmPassword) {
    errors.confirmPassword = "Confirm password is required";
  } else if (values.confirmPassword !== values.password) {
    errors.confirmPassword = "Password does not match";
  }

  return errors;
};

export default function Register() {
  const [form, setForm] = useState<RegisterRequest>({
    name: "",
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<ErrorMsg>({});
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
      [name]: validationErrors[name as keyof RegisterRequest],
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
      const request = await fetch(`${BASE_URL}/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const response = await request.json();

      if (!request.ok) {
        setErrors({
          general: response.message || "Username is already taken.",
        });
        return;
      }

      setForm({
        name: "",
        username: "",
        password: "",
        confirmPassword: "",
      });
      router.replace("/login");
    } catch (error) {
      console.error(error);
      setErrors({
        general: "Terjadi kesalahan saat registrasi.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen">
      <div className="grid min-h-screen w-full md:grid-cols-2">
        <div className="hidden md:relative md:block">
          <Image src={CoffeeBg} alt="coffee-bean" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-linear-to-r from-[#30261C]/80 to-[#30261C]/20" />
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <div className="text-center text-white px-8">
              <h2 className="mb-4 text-4xl font-bold font-playfair">Daftarkan Akun Anda</h2>
              <p className="max-w-md text-md leading-relaxed text-gray-200 mx-auto">Nikmati pengalaman kopi terbaik dengan suasana hangat dan modern.</p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center px-6 py-12 md:px-16 lg:px-24 bg-white">
          <div className="w-full max-w-sm">
            <div className="mb-8">
              <h2 className="text-4xl font-bold font-playfair mb-3">Daftar</h2>
              <p className="text-md font-lato text-gray-600">Silahkan membuat akun baru untuk mendaftar.</p>
            </div>

            {errors.general && (
              <div className="mb-4">
                <ErrorMessage message={errors.general} />
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <FormGroup>
                <Label htmlFor="name">Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <TextInput onChange={handleChange} value={form.name} type="text" id="name" name="name" className="bg-gray-50 border border-gray-200 focus:border-[#C67C4E] focus:ring-2 focus:ring-[#C67C4E]/20 rounded-xl transition pl-10" />
                </div>
                <ErrorMessage message={errors.name} />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="username">Username</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <TextInput onChange={handleChange} value={form.username} type="text" id="username" name="username" autoComplete="username" className="bg-gray-50 border border-gray-200 focus:border-[#C67C4E] focus:ring-2 focus:ring-[#C67C4E]/20 rounded-xl transition pl-10" />
                </div>
                <ErrorMessage message={errors.username} />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <TextInput
                    onChange={handleChange}
                    value={form.password}
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    autoComplete="new-password"
                    className="bg-gray-50 border border-gray-200 focus:border-[#C67C4E] focus:ring-2 focus:ring-[#C67C4E]/20 rounded-xl transition w-full pl-10"
                  />
                  <Button
                    type="button"
                    aria-label="Toggle password visibility"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute cursor-pointer right-3 top-1/2 -translate-y-1/2 text-gray-500 transition hover:text-gray-700"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </Button>
                </div>
                <ErrorMessage message={errors.password} />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <div className="relative">
                  <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <TextInput
                    onChange={handleChange}
                    value={form.confirmPassword}
                    type={showPassword ? "text" : "password"}
                    id="confirmPassword"
                    name="confirmPassword"
                    autoComplete="new-password"
                    className="bg-gray-50 border border-gray-200 focus:border-[#C67C4E] focus:ring-2 focus:ring-[#C67C4E]/20 rounded-xl transition w-full pl-10"
                  />
                </div>
                <ErrorMessage message={errors.confirmPassword} />
              </FormGroup>

              <Button
                type="submit"
                disabled={loading}
                className="bg-[#C67C4E] w-full px-4 py-2 rounded-xl cursor-pointer shadow-sm text-white font-semibold transition-all duration-300 hover:bg-[#b86d3e] hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-[#C67C4E]"
              >
                {loading ? "Loading..." : "Daftar"}
              </Button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-sm font-lato text-gray-600">
                Sudah memiliki akun?{" "}
                <Link href="/login" className="font-semibold text-[#C67C4E] hover:underline">
                  Login
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
