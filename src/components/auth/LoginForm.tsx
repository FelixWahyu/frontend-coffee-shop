"use client";

import FormGroup from "@/components/ui/form/form-group";
import TextInput from "@/components/ui/form/text-input";
import Label from "@/components/ui/form/label";
import ErrorMessage from "@/components/ui/form/error";
import Button from "@/components/ui/button";
import CoffeeBg from "@/public/assets/image/biji-coffe-cup.jpg";
import Link from "next/link";
import Image from "next/image";
import { Eye, EyeOff } from "lucide-react";
import { useLogin } from "@/hooks/auth/UseLogin";

export default function Login() {
  const { form, loading, errors, showPassword, handleChange, handleTogglePassword, handleSubmit } = useLogin();

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
                  <Button type="button" aria-label="Toggle password visibility" onClick={handleTogglePassword} className="absolute cursor-pointer right-3 top-1/2 -translate-y-1/2 text-gray-500 transition hover:text-gray-700">
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </Button>
                </div>
                <ErrorMessage message={errors.password} />
              </FormGroup>

              <Button
                type="submit"
                disabled={loading}
                className="bg-[#C67C4E] mt-4 w-full px-4 py-1.5 rounded-lg cursor-pointer shadow-sm text-white font-semibold transition-all duration-300 hover:bg-[#b86d3e] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-[#C67C4E]"
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
