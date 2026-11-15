import { useState, useRef, useEffect } from "react";
import { UserResponse } from "@/types/users";

interface UseNavAuthProps {
  user: UserResponse | null;
  onLogout: () => void;
  atributes?: string;
}

export function useNavAuth({ user, onLogout, atributes = "" }: UseNavAuthProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const isAdmin = user?.role === "ADMIN";
  const userInitials = user?.name
    ? user.name[0].toUpperCase()
    : user?.username
    ? user.username[0].toUpperCase()
    : "U";

  const isDesktop = atributes.includes("hidden md:flex");

  const toggleOpen = () => setIsOpen((prev) => !prev);
  const closeDropdown = () => setIsOpen(false);

  const openLogoutConfirm = () => {
    setIsOpen(false);
    setShowLogoutConfirm(true);
  };

  const closeLogoutConfirm = () => setShowLogoutConfirm(false);

  const handleConfirmLogout = () => {
    setShowLogoutConfirm(false);
    onLogout();
  };

  return {
    isOpen,
    showLogoutConfirm,
    dropdownRef,
    isAdmin,
    userInitials,
    isDesktop,
    toggleOpen,
    closeDropdown,
    openLogoutConfirm,
    closeLogoutConfirm,
    handleConfirmLogout,
  };
}

export default useNavAuth;
