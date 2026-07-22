"use client";

import { useState } from "react";
import SidebarAdmin from "./Sidebar";
import HeaderAdmin from "./Header";
import { useAdminAuth } from "@/hooks/auth/useAdminAuth";
import { Coffee } from "lucide-react";

export default function AdminLayoutMain({ main }: Readonly<{ main: React.ReactNode }>) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { loading } = useAdminAuth();

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#E2D9C8]">
        <div className="flex flex-col items-center gap-4">
          <div className="relative flex items-center justify-center w-20 h-20">
            {/* Pulsing glow background */}
            <div className="absolute inset-0 rounded-full bg-[#C67C4E]/10 animate-ping"></div>
            {/* Spinning coffee shop theme ring */}
            <div className="absolute inset-0 rounded-full border-4 border-[#C67C4E]/20"></div>
            <div className="absolute inset-0 rounded-full border-4 border-t-[#C67C4E] animate-spin"></div>
            {/* Coffee icon pulsing in center */}
            <Coffee className="w-8 h-8 text-[#C67C4E] animate-pulse" />
          </div>
          <p className="text-stone-800 font-playfair font-bold text-lg tracking-wide animate-pulse">
            Memverifikasi Hak Akses...
          </p>
        </div>
      </div>
    );
  }

  return (
    <section className="flex h-screen bg-gray-200">
      <SidebarAdmin isOpen={isSidebarOpen} />
      {isSidebarOpen && <div className="fixed inset-0 bg-black/40 z-40 md:hidden" onClick={() => setIsSidebarOpen(false)} />}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <HeaderAdmin toggleSidebar={() => setIsSidebarOpen((prev) => !prev)} />
        <div className="flex-1 bg-white p-6 md:p-8">{main}</div>
      </main>
    </section>
  );
}
