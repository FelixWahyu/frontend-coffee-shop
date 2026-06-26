"use client";

import { useState } from "react";
import SidebarAdmin from "./Sidebar";
import HeaderAdmin from "./Header";

export default function AdminLayoutMain({ main }: Readonly<{ main: React.ReactNode }>) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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
