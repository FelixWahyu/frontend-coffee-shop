import Image from "next/image";
import Link from "next/link";
import Logo from "@/src/asset/logo/brand-3.jpg";
import { Mail, MapPin, MessageCircleCheck, MessagesSquare } from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-[#30261C] px-6 py-16">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        <div className="space-y-5">
          <div className="flex items-center gap-4">
            <Image src={Logo} width={52} height={52} alt="coffee shop logo" className="rounded-full border border-gray-300" />
            <span className="text-2xl font-bold text-white font-playfair">
              <span className="text-[#C67C4E]">Coffee</span> Shop
            </span>
          </div>
          <p className="text-slate-300 leading-relaxed text-sm font-lato">Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem asperiores nulla mollitia aut laborum sapiente.</p>
        </div>

        <div className="text-white space-y-4">
          <h3 className="font-semibold uppercase tracking-wide">Navigasi</h3>
          <div className="flex flex-col gap-3">
            <Link href={"/"} className="text-md hover:text-slate-200 hover:underline">
              Home
            </Link>
            <Link href={"/about"} className="text-md hover:text-slate-200 hover:underline">
              About
            </Link>
            <Link href={"/products"} className="text-md hover:text-slate-200 hover:underline">
              Products
            </Link>
            <Link href={"/blog"} className="text-md hover:text-slate-200 hover:underline">
              Blog
            </Link>
          </div>
        </div>

        <div className="space-y-4 text-white">
          <h3 className="font-semibold uppercase tracking-wide">Kontak</h3>
          <div className="flex flex-col gap-4">
            <div className="flex items-start gap-3">
              <Mail size={18} className="mt-1 shrink-0" />
              <span className="text-sm font-lato text-slate-300">example@gmail.com</span>
            </div>
            <div className="flex items-start gap-3">
              <MessagesSquare size={18} className="mt-1 shrink-0" />
              <span className="text-sm font-lato text-slate-300">+62865-87656-9867</span>
            </div>
            <div className="flex items-start gap-3">
              <MapPin size={18} className="mt-1 shrink-0" />
              <span className="text-sm text-slate-300 font-lato leading-relaxed">Jl.Pandawa No.19, Purwokerto</span>
            </div>
          </div>
        </div>

        <div className="space-y-4 text-white">
          <h3 className="font-semibold uppercase">Sosial Media</h3>
          <div className="flex items-center gap-4">
            <button className="p-3 rounded-full cursor-pointer bg-white/10 hover:bg-[#C67C4E] transition-colors">
              <MessageCircleCheck size={20} />
            </button>
            <button className="p-3 rounded-full cursor-pointer bg-white/10 hover:bg-[#C67C4E] transition-colors">
              <Mail size={20} />
            </button>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 mt-14 pt-6 text-center text-sm text-slate-300">© {year} Coffee Shop. All rights reserved.</div>
    </footer>
  );
}
