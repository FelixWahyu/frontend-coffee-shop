"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import LoginService from "@/services/auth/loginService";
import { LoginRequest } from "@/types/login";
import { ValidationLogin } from "@/validations/auth/loginValidation";
import { ErrorMsg } from "@/types/errorMessage";

export const useLogin = () => {
  const router = useRouter();
  const [form, setForm] = useState<LoginRequest>({
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<ErrorMsg>({});
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const updateForm = { ...form, [name]: value };
    setForm(updateForm);

    const validationErrors = ValidationLogin(updateForm);

    setErrors((prev) => ({
      ...prev,
      [name]: validationErrors[name as keyof LoginRequest],
      general: "",
    }));
  };

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (loading) return;

    const validationErrors = ValidationLogin(form);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      setLoading(true);
      setErrors({});

      await LoginService(form);

      setForm({
        username: "",
        password: "",
      });

      router.replace("/");
      //   console.log(response);
    } catch (error) {
      //   console.error(error);
      if (error instanceof Error) {
        setErrors({
          general: error.message || "Something went wrong, Please try again.",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return {
    form,
    loading,
    errors,
    showPassword,
    handleChange,
    handleTogglePassword,
    handleSubmit,
  };
};
