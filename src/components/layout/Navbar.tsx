"use client";

import Image from "next/image";
import Logo from "@/public/assets/logo/brand-3.jpg";
import Link from "next/link";
import { Search, Menu, ShoppingBag, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { navLinks } from "@/constants/navLinks";
import NavbarLinks from "@/components/ui/nav-links/navbar-links";
import { useNavbar } from "@/hooks/auth/UseLogout";

export default function Navbar() {
  const pathName = usePathname();
  const { isMenuOpen, isAuth, toggleMenu, closeMenu, handleLogout } = useNavbar();

  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-4rem)] max-w-6xl">
      <div className="flex px-4 md:px-6 py-2 items-center justify-between rounded-2xl border border-white shadow-md bg-white">
        <div className="flex items-center gap-3">
          <button onClick={toggleMenu} className="text-gray-800 rounded-md p-1 flex md:hidden cursor-pointer hover:bg-gray-50 hover:text-gray-700">
            {isMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
          <div className="flex gap-2 items-center">
            <Image src={Logo} width={40} height={40} className="rounded-full" alt="aqua botol" />
            <span className="text-xl font-bold text-gray-800 font-playfair">
              <span className="text-[#C67C4E]">Coffee</span> Shop
            </span>
          </div>
        </div>
        <div className="hidden items-center gap-6 md:flex">
          <NavbarLinks pathName={pathName} links={navLinks} />
        </div>
        <div className="flex gap-8 items-center">
          <div className="flex gap-3 items-center">
            <button className="p-1 cursor-pointer text-gray-700 font-semibold hover:text-[#C67C4E] transition-colors duration-300">
              <Search size={18} />
            </button>
            <button className="p-1 cursor-pointer text-gray-700 font-semibold hover:text-[#C67C4E] transition-colors duration-300">
              <ShoppingBag size={18} />
            </button>
          </div>
          {isAuth ? (
            <button onClick={handleLogout} className="text-white hidden md:flex bg-red-500 px-4 py-1.5 font-lato font-semibold rounded-xl shadow-sm hover:bg-red-600 transition-colors duration-300">
              Sign Out
            </button>
          ) : (
            <Link href={"/login"} className="text-white hidden md:flex bg-[#C67C4E] px-4 py-1.5 font-lato font-semibold rounded-xl shadow-sm hover:bg-[#C67C4E]/70 transition-colors duration-300">
              Sign In
            </Link>
          )}
        </div>
      </div>

      {isMenuOpen && (
        <div className="bg-white md:hidden flex flex-col gap-4 px-4 py-2 rounded-xl shadow-md mt-2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={closeMenu}
              className={`${pathName === link.href ? "text-[#C67C4E] bg-[#30261C]/10" : "text-gray-800"} px-3 py-1 rounded-lg font-lato font-semibold hover:bg-[#30261C]/10 hover:text-[#C67C4E] transition-all duration-300`}
            >
              {link.label}
            </Link>
          ))}
          <div className="mt-8 p-4 border-t border-gray-500">
            {isAuth ? (
              <button onClick={handleLogout} className="text-white bg-red-500 px-4 py-1.5 font-lato font-semibold rounded-xl shadow-sm hover:bg-red-600 transition-colors duration-300">
                Sign Out
              </button>
            ) : (
              <Link href={"/login"} className="text-white bg-[#C67C4E] px-4 py-1.5 font-lato font-semibold rounded-xl shadow-sm hover:bg-[#C67C4E]/70 transition-colors duration-300">
                Sign In
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
