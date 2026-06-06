"use client";

import { useState } from "react";
import SidebarAdmin from "./Sidebar";
import HeaderAdmin from "./Header";

export default function AdminLayoutMain({ main }: Readonly<{ main: React.ReactNode }>) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <section className="flex min-h-screen bg-gray-50">
      <SidebarAdmin isOpen={isSidebarOpen} />
      {isSidebarOpen && <div className="fixed inset-0 bg-black/40 z-40 md:hidden" onClick={() => setIsSidebarOpen(false)} />}
      <main className="flex-1 overflow-y-auto">
        <HeaderAdmin toggleSidebar={() => setIsSidebarOpen((prev) => !prev)} />
        <div className="bg-white p-8 w-full">{main}</div>
      </main>
    </section>
  );
}
