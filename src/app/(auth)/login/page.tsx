// import { useState } from "react";
import Card from "@/src/components/ui/cards";
import FormGroup from "@/src/components/ui/form/form-group";
import TextInput from "@/src/components/ui/form/text-input";
import Label from "@/src/components/ui/form/label";
import ErrorMessage from "@/src/components/ui/form/error";
import Button from "@/src/components/ui/button";
import AuthLayout from "../layout";
import CoffeeBg from "@/src/asset/image/biji-coffe-cup.jpg";
import Link from "next/link";
import Image from "next/image";

export default function LoginPage() {
  const errors = {
    username: "Username wajib di isi.",
    password: "Password wajib di isi.",
  };
  return (
    <AuthLayout>
      <section className="px-6 py-10">
        <div className="grid min-h-175 overflow-hidden bg-white shadow-lg rounded-md md:grid-cols-2">
          <div className="hidden md:block relative">
            <Image src={CoffeeBg} alt="coffee-bean" fill className="object-cover" priority />
            <div className="absolute inset-0 bg-[#30261C]/70"></div>
            <div className="absolute bottom-10 left-10 z-10 text-white">
              <h2 className="mb-4 text-4xl font-bold font-playfair">Welcome Back</h2>

              <p className="max-w-md text-sm leading-relaxed text-gray-200">Nikmati pengalaman kopi terbaik dengan suasana hangat dan modern.</p>
            </div>
          </div>
          <div className="flex items-center px-6 py-12 md:px-12 justify-center">
            <div className="w-full max-w-md">
              <div className="mb-8">
                <h2 className="text-4xl font-bold font-playfair mb-3">Login</h2>
                <p className="text-sm font-lato">Silahkan login dengan akun yang terdaftar.</p>
              </div>

              <form action="" method="post" className="space-y-5">
                <FormGroup>
                  <Label htmlFor="username">Username</Label>
                  <TextInput type="text" id="username" name="username" className="backdrop-blur-lg bg-gray-200" />
                  <ErrorMessage message={errors.username} />
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="password">Password</Label>
                  <TextInput type="password" id="password" name="password" className="bg-gray-200" />
                  <ErrorMessage message={errors.password} />
                </FormGroup>

                <div className="mt-2">
                  <Button type="submit" className="bg-[#C67C4E] w-full cursor-pointer text-white font-semibold hover:bg-[#C67C4E]/80">
                    Login
                  </Button>
                </div>
              </form>

              <div className="my-6">
                <p className="text-sm font-lato">
                  Belum punya akun?{" "}
                  <Link href={"/register"} className="font-semibold text-[#C67C4E]">
                    Daftar
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </AuthLayout>
  );
}
