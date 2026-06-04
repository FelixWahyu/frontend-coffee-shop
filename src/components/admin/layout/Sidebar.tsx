"use client";

import Link from "next/link";
import { ArrowLeft, LayoutGrid, Tag, Boxes, Archive } from "lucide-react";
import { usePathname } from "next/navigation";

export default function SidebarAdmin() {
  const pathName = usePathname();

  return (
    <aside className="w-64 bg-white text-gray-800 p-6 hidden md:flex flex-col border-r border-gray-900 shadow-[6px_6px_0px_#000000]/60">
      <div className="mb-10">
        <h2 className="text-xl font-bold uppercase tracking-wider text-center">Coffe Admin</h2>
        <p className="text-xs text-gray-500 mt-1 text-center">Management System</p>
      </div>
      <nav className="flex flex-col">
        <Link href="/admin" className={`flex items-center gap-2 ${pathName === "/admin" ? "bg-gray-800 text-white" : "hover:bg-gray-800 hover:text-white"} px-4 py-1.5 transition-colors`}>
          <LayoutGrid className="w-5 h-5" />
          Dashboard
        </Link>
        <div className="mt-6 px-4 mb-2 font-semibold text-gray-500/90 text-sm">Management</div>
        <div className="flex flex-col gap-2">
          <Link href="/admin/categories" className={`flex items-center gap-2 ${pathName === "/admin/categories" ? "bg-gray-800 text-white" : "hover:bg-gray-800 hover:text-white"} px-4 py-1.5 transition-colors`}>
            <Tag className="w-5 h-5" />
            Manage Categories
          </Link>
          <Link href="/admin/products" className={`flex items-center gap-2 ${pathName === "/admin/products" ? "bg-gray-800 text-white" : "hover:bg-gray-800 hover:text-white"} px-4 py-1.5 transition-colors`}>
            <Boxes className="w-5 h-5" />
            Manage Products
          </Link>
          <Link href="/admin/blog" className={`flex items-center gap-2 ${pathName === "/admin/blog" ? "bg-gray-800 text-white" : "hover:bg-gray-800 hover:text-white"} px-4 py-1.5 transition-colors`}>
            <Archive className="w-5 h-5" />
            Manage Blog
          </Link>
        </div>
      </nav>
      <div className="mt-auto border-t border-zinc-700 pt-3">
        <Link href="/" className="text-sm text-zinc-600 hover:text-gray-500 transition-colors flex items-center justify-center gap-2">
          <ArrowLeft className="w-5 h-5 mr-1" />
          Back to Website
        </Link>
      </div>
    </aside>
  );
}
