"use client";

import { useState } from "react";
import Image from "next/image";
import Logo from "@/public/assets/logo/brand-3.jpg";
import { Search, Menu, ShoppingBag, X } from "lucide-react";
import Button from "@/components/ui/button";
import { usePathname } from "next/navigation";
import { navLinks } from "@/constants/navLinks";
import NavbarLinks from "@/components/ui/nav-links/navbar-links";
import MobileNav from "@/components/ui/nav-links/mobile-nav";
import NavbarAuth from "@/components/ui/nav-links/navbar-auth";
import { useNavbar } from "@/hooks/auth/UseLogout";
import SearchModal from "@/components/layout/SearchModal";

export default function Navbar() {
  const pathName = usePathname();
  const { isMenuOpen, isAuth, toggleMenu, closeMenu, handleLogout } = useNavbar();
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-4rem)] max-w-6xl">
      <div className="flex px-4 md:px-6 py-2 items-center justify-between rounded-2xl border border-white shadow-md bg-white">
        <div className="flex items-center gap-3">
          <Button onClick={toggleMenu} className="text-gray-800 rounded-md p-1 flex md:hidden cursor-pointer hover:bg-gray-50 hover:text-gray-700">
            {isMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </Button>
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
            <Button
              onClick={() => setIsSearchOpen(true)}
              className="p-1 cursor-pointer text-gray-700 font-semibold hover:text-[#C67C4E] transition-colors duration-300"
            >
              <Search size={18} />
            </Button>
            <Button className="p-1 cursor-pointer text-gray-700 font-semibold hover:text-[#C67C4E] transition-colors duration-300">
              <ShoppingBag size={18} />
            </Button>
          </div>
          <NavbarAuth isAuth={isAuth} onLogout={handleLogout} atributes="hidden md:flex" />
        </div>
      </div>

      {isMenuOpen && (
        <div className="bg-white md:hidden flex flex-col gap-4 px-4 py-2 rounded-xl shadow-md mt-2">
          <MobileNav pathName={pathName} links={navLinks} closeMenu={closeMenu} />
          <div className="mt-8 p-4 border-t border-gray-500">
            <NavbarAuth isAuth={isAuth} onLogout={handleLogout} />
          </div>
        </div>
      )}

      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </nav>
  );
}
