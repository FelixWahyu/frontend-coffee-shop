"use client";

import Link from "next/link";
import Button from "@/components/ui/button";
import ConfirmModal from "@/components/ui/confirm-modal";
import { UserResponse } from "@/types/users";
import { ChevronDown, LogOut, LayoutGrid, Shield, User } from "lucide-react";
import useNavAuth from "@/hooks/auth/useNavAuth";

interface NavAuthProps {
  isAuth: boolean;
  user: UserResponse | null;
  onLogout: () => void;
  atributes?: string;
}

export default function NavAuth({ isAuth, user, onLogout, atributes = "" }: NavAuthProps) {
  const {
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
  } = useNavAuth({ user, onLogout, atributes });

  if (!isAuth || !user) {
    return (
      <Link
        href="/login"
        className={`text-white bg-[#C67C4E] px-5 py-2 font-lato font-semibold rounded-xl shadow-sm hover:bg-[#C67C4E]/90 active:scale-95 transition-all duration-300 cursor-pointer ${atributes}`}
      >
        Sign In
      </Link>
    );
  }

  if (isDesktop) {
    return (
      <div className={`relative ${atributes}`} ref={dropdownRef}>
        <button
          onClick={toggleOpen}
          className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-stone-200 bg-stone-50 hover:bg-stone-100 hover:border-stone-300 transition-all duration-300 cursor-pointer"
        >
          {/* User Avatar Circle */}
          <span className="inline-flex w-7 h-7 items-center justify-center rounded-full bg-[#C67C4E] text-white text-sm font-bold shadow-inner">
            {userInitials}
          </span>
          {/* User Name */}
          <span className="text-sm font-semibold text-stone-800 max-w-25 truncate font-lato">
            {user.name || user.username}
          </span>
          <ChevronDown
            size={14}
            className={`text-stone-500 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
          />
        </button>

        {/* Dropdown Menu */}
        {isOpen && (
          <div className="absolute right-0 top-full mt-3.5 w-56 bg-white border border-stone-150 rounded-2xl shadow-xl py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
            {/* Header info */}
            <div className="px-4 py-2.5 border-b border-stone-100 bg-stone-50/50">
              <p className="text-xs text-stone-400 font-lato">Signed in as</p>
              <p className="text-sm font-bold text-stone-800 truncate font-lato">{user.name}</p>
              {isAdmin && (
                <span className="inline-flex items-center gap-1 mt-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#C67C4E]/10 text-[#C67C4E] border border-[#C67C4E]/20">
                  <Shield size={10} />
                  Administrator
                </span>
              )}
            </div>

            {/* Menu Links */}
            <div className="p-1">
              <Link
                href="/profile"
                onClick={closeDropdown}
                className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-semibold text-stone-700 hover:bg-stone-50 hover:text-[#C67C4E] transition-all duration-200"
              >
                <User size={16} />
                Profil Saya
              </Link>

              {isAdmin && (
                <Link
                  href="/admin"
                  onClick={closeDropdown}
                  className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-semibold text-stone-700 hover:bg-stone-50 hover:text-[#C67C4E] transition-all duration-200"
                >
                  <LayoutGrid size={16} />
                  Dashboard
                </Link>
              )}

              <button
                onClick={openLogoutConfirm}
                className="flex w-full items-center gap-2 px-3 py-2 rounded-xl text-sm font-semibold text-stone-700 hover:bg-red-50 hover:text-red-600 transition-all duration-200 cursor-pointer"
              >
                <LogOut size={16} />
                Sign Out
              </button>
            </div>
          </div>
        )}

        {/* Logout Confirmation Modal */}
        <ConfirmModal
          open={showLogoutConfirm}
          title="Konfirmasi Keluar"
          message="Apakah Anda yakin ingin keluar dari akun Anda saat ini?"
          confirmLabel="Keluar"
          cancelLabel="Batal"
          onConfirm={handleConfirmLogout}
          onCancel={closeLogoutConfirm}
        />
      </div>
    );
  }

  // Mobile Version Layout (collapsible or static info container inside drawer)
  return (
    <div className="flex flex-col gap-4 py-4 rounded-xl bg-stone-50">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-[#C67C4E] text-white flex items-center justify-center text-lg font-bold shadow-md">
          {userInitials}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-base font-bold text-stone-800 truncate font-lato">{user.name}</p>
        </div>
        {isAdmin && (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#C67C4E]/10 text-[#C67C4E] border border-[#C67C4E]/20">
            <Shield size={10} />
            Admin
          </span>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <Link
          href="/profile"
          className="flex items-center justify-center gap-2 w-full py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 font-semibold rounded-xl text-sm transition-colors duration-200"
        >
          <User size={16} />
          Profil Saya
        </Link>
        {isAdmin && (
          <Link
            href="/admin"
            className="flex items-center justify-center gap-2 w-full py-2 bg-stone-800 hover:bg-stone-900 text-white font-semibold rounded-xl text-sm transition-colors duration-200"
          >
            <LayoutGrid size={16} />
            Dashboard
          </Link>
        )}
        <Button
          onClick={openLogoutConfirm}
          className="flex items-center justify-center gap-2 w-full py-2 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-xl text-sm transition-colors duration-200 cursor-pointer"
        >
          <LogOut size={16} />
          Sign Out
        </Button>
      </div>

      {/* Logout Confirmation Modal (Mobile) */}
      <ConfirmModal
        open={showLogoutConfirm}
        title="Konfirmasi Keluar"
        message="Apakah Anda yakin ingin keluar dari akun Anda saat ini?"
        confirmLabel="Keluar"
        cancelLabel="Batal"
        onConfirm={handleConfirmLogout}
        onCancel={closeLogoutConfirm}
      />
    </div>
  );
}
