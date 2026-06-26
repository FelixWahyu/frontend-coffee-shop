"use client";

import FormGroup from "@/components/ui/form/form-group";
import TextInput from "@/components/ui/form/text-input";
import Label from "@/components/ui/form/label";
import ErrorMessage from "@/components/ui/form/error";
import Button from "@/components/ui/button";
import CoffeeBg from "@/public/assets/image/biji-coffe-cup.jpg";
import Link from "next/link";
import Image from "next/image";
import { Eye, EyeOff, User, Lock } from "lucide-react";
import { useLogin } from "@/hooks/auth/UseLogin";

export default function Login() {
  const { form, loading, errors, showPassword, handleChange, handleTogglePassword, handleSubmit } = useLogin();

  return (
    <section className="min-h-screen">
      <div className="grid min-h-screen w-full md:grid-cols-2">
        <div className="hidden md:relative md:block">
          <Image src={CoffeeBg} alt="coffee-bean" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-linear-to-r from-[#30261C]/80 to-[#30261C]/20" />
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <div className="text-center text-white px-8">
              <h2 className="mb-4 text-4xl font-bold font-playfair">Welcome Back</h2>
              <p className="max-w-md text-md leading-relaxed text-gray-200 mx-auto">Nikmati pengalaman kopi terbaik dengan suasana hangat dan modern.</p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center px-6 py-12 md:px-16 lg:px-24 bg-white">
          <div className="w-full max-w-sm">
            <div className="mb-8">
              <h2 className="text-4xl font-bold font-playfair mb-3">Login</h2>
              <p className="text-md font-lato text-gray-600">Silahkan login dengan akun yang terdaftar.</p>
            </div>

            {errors.general && (
              <div className="mb-4">
                <ErrorMessage message={errors.general} />
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <FormGroup>
                <Label htmlFor="username">Username</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <TextInput
                    onChange={handleChange}
                    value={form.username}
                    type="text"
                    id="username"
                    name="username"
                    autoComplete="username"
                    className="bg-gray-50 border border-gray-200 focus:border-[#C67C4E] focus:ring-2 focus:ring-[#C67C4E]/20 rounded-xl transition pl-10"
                  />
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
                    autoComplete="current-password"
                    className="bg-gray-50 border border-gray-200 focus:border-[#C67C4E] focus:ring-2 focus:ring-[#C67C4E]/20 rounded-xl transition w-full pl-10"
                  />
                  <Button
                    type="button"
                    aria-label="Toggle password visibility"
                    onClick={handleTogglePassword}
                    className="absolute cursor-pointer right-3 top-1/2 -translate-y-1/2 text-gray-500 transition hover:text-gray-700"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </Button>
                </div>
                <div className="flex items-center justify-between mt-1">
                  <ErrorMessage message={errors.password} />
                  <Link href="/forgot-password" className="text-sm font-lato text-[#C67C4E] hover:underline ml-auto">
                    Lupa Password?
                  </Link>
                </div>
              </FormGroup>

              <Button
                type="submit"
                disabled={loading}
                className="bg-[#C67C4E] w-full px-4 py-2 rounded-xl cursor-pointer shadow-sm text-white font-semibold transition-all duration-300 hover:bg-[#b86d3e] hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-[#C67C4E]"
              >
                {loading ? "Loading..." : "Login"}
              </Button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-sm font-lato text-gray-600">
                Belum punya akun?{" "}
                <Link href="/register" className="font-semibold text-[#C67C4E] hover:underline">
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
