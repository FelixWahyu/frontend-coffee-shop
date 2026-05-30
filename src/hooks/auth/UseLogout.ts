"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import getCurrrentUser from "@/services/auth/authUser";
import LogoutService from "@/services/auth/logoutService";

export const useNavbar = () => {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const getUser = async () => {
      try {
        const user = await getCurrrentUser();
        setIsAuth(!!user);
      } catch (error) {
        setIsAuth(false);
        if (error instanceof Error) {
          console.error(error);
        }
      }
    };

    getUser();
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleLogout = async () => {
    try {
      await LogoutService();

      setIsAuth(false);
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
