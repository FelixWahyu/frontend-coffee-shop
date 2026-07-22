"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, LayoutGrid, Tag, Boxes, Archive, LogOut } from "lucide-react";
import { usePathname } from "next/navigation";
import { useNavbar } from "@/hooks/auth/UseLogout";
import Image from "next/image";
import Button from "@/components/ui/button";
import ConfirmModal from "@/components/ui/confirm-modal";

interface SidebarAdminProps {
  isOpen: boolean;
}

export default function SidebarAdmin({ isOpen }: SidebarAdminProps) {
  const pathName = usePathname();
  const { isAuth, handleLogout } = useNavbar();
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const handleConfirmLogout = () => {
    setShowLogoutConfirm(false);
    handleLogout();
  };

  return (
    <aside
      className={`fixed md:relative top-0 left-0 z-50 h-screen md:h-full p-4 transition-all duration-300 bg-gray-100 text-gray-900 flex flex-col min-w-0 overflow-hidden ${isOpen ? "md:w-64" : "md:w-0 md:p-0"} ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
    >
      <div className="shrink-0 mb-6 flex flex-col items-center justify-center gap-2">
        <div className="w-18 h-18 p-0.5 flex items-center justify-center bg-white rounded-full border border-black shadow-[3px_3px_0px_#000000]/50">
          <Image src="/assets/logo/brand-3.jpg" alt="Logo Cafe" width={64} height={64} className="rounded-full object-cover" />
        </div>
        <h2 className="text-xl font-bold uppercase tracking-wider text-center">Cafe Admin</h2>
        <p className="text-xs text-gray-500 text-center">Management System</p>
      </div>
      <nav className="flex-1">
        <Link
          href="/admin"
          className={`flex items-center gap-2 ${pathName === "/admin" ? "bg-gray-900 text-white translate-y-1 translate-x-1 shadow-none" : "hover:bg-gray-900 hover:text-white hover:translate-y-1 hover:translate-x-1 hover:shadow-none"} shadow-[4px_4px_0px_#000000]/50 border border-black px-4 py-1.5 transition-all`}
        >
          <LayoutGrid className="w-5 h-5" />
          Dashboard
        </Link>
        <div className="mt-6 px-4 mb-2 font-semibold text-gray-500/90 text-md tracking-wider">Management</div>
        <div className="flex flex-col gap-2">
          <Link
            href="/admin/categories"
            className={`flex items-center gap-2 ${pathName === "/admin/categories" ? "bg-gray-900 text-white translate-y-1 translate-x-1 shadow-none" : "hover:bg-gray-900 hover:text-white hover:translate-y-1 hover:translate-x-1 hover:shadow-none"} shadow-[4px_4px_0px_#000000]/50 border border-black px-4 py-1.5 transition-all`}
          >
            <Tag className="w-5 h-5" />
            Manage Categories
          </Link>
          <Link
            href="/admin/products"
            className={`flex items-center gap-2 ${pathName === "/admin/products" ? "bg-gray-900 text-white translate-y-1 translate-x-1 shadow-none" : "hover:bg-gray-900 hover:text-white hover:translate-y-1 hover:translate-x-1 hover:shadow-none"} shadow-[4px_4px_0px_#000000]/50 border border-black px-4 py-1.5 transition-all`}
          >
            <Boxes className="w-5 h-5" />
            Manage Products
          </Link>
          <Link
            href="/admin/blog"
            className={`flex items-center gap-2 ${pathName.startsWith("/admin/blog") ? "bg-gray-900 text-white translate-y-1 translate-x-1 shadow-none" : "hover:bg-gray-900 hover:text-white hover:translate-y-1 hover:translate-x-1 hover:shadow-none"} shadow-[4px_4px_0px_#000000]/50 border border-black px-4 py-1.5 transition-all`}
          >
            <Archive className="w-5 h-5" />
            Manage Blog
          </Link>
        </div>
      </nav>
      <div className="shrink-0 space-y-2">
        {isAuth && (
          <Button
            onClick={() => setShowLogoutConfirm(true)}
            className="flex items-center justify-center w-full gap-2 text-md text-gray-900 bg-red-50 border border-black cursor-pointer px-4 py-1.5 font-lato shadow-[4px_4px_0px_#000000]/50 hover:bg-red-700 hover:text-white hover:translate-y-1 hover:translate-x-1 hover:shadow-none transition-all"
          >
            <LogOut className="w-5 h-5" />
            Sign Out
          </Button>
        )}
        <Link
          href="/"
          className="flex items-center justify-center gap-2 cursor-pointer text-md text-gray-900 border border-black px-4 py-1.5 shadow-[4px_4px_0px_#000000]/50 hover:text-white hover:bg-gray-900 hover:translate-y-1 hover:translate-x-1 hover:shadow-none transition-all"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Website
        </Link>
      </div>

      <ConfirmModal
        open={showLogoutConfirm}
        title="Konfirmasi Keluar"
        message="Apakah Anda yakin ingin keluar dari halaman dashboard admin ini?"
        confirmLabel="Keluar"
        cancelLabel="Batal"
        onConfirm={handleConfirmLogout}
        onCancel={() => setShowLogoutConfirm(false)}
      />
    </aside>
  );
}
