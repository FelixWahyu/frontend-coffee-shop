"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import LogoutService from "@/services/auth/logoutService";

export const useNavbar = () => {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    setIsAuth(!!token);
  });

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleLogout = async () => {
    try {
      const token = sessionStorage.getItem("token");
      if (!token) return;

      await LogoutService(token);

      sessionStorage.removeItem("token");
      setIsAuth(false);
      router.replace("/");

      router.replace("/");
    } catch (error) {
      if (error instanceof Error) {
        console.error(error);
      }
    }
  };

  return {
    isMenuOpen,
    isAuth,
    toggleMenu,
    closeMenu,
    handleLogout,
  };
};
