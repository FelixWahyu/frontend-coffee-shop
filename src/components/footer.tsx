import Image from "next/image";
import Link from "next/link";
import Logo from "@/app/asset/logo/brand-3.jpg";
import { Mail, MapPin, MessageCircleCheck, MessagesSquare } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#30261C] px-6 py-16">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 items-center">
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-4">
            <Image src={Logo} width={52} height={52} alt="aqua botol" className="rounded-full border border-gray-300" />
            <span className="text-2xl font-bold text-white font-playfair">
              <span className="text-[#C67C4E]">Coffee</span> Shop
            </span>
          </div>
          <p className="text-slate-100">Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem asperiores nulla mollitia aut laborum sapiente.</p>
        </div>
        <div className="text-white grid grid-cols-1 gap-2 ml-16">
          <h3 className="font-semibold uppercase">Navigasi</h3>
          <Link href={"/"} className="text-md hover:text-slate-200">
            Home
          </Link>
          <Link href={"/about"} className="text-md hover:text-slate-200">
            About
          </Link>
          <Link href={"/products"} className="text-md hover:text-slate-200">
            Products
          </Link>
          <Link href={"/blog"} className="text-md hover:text-slate-200">
            Blog
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-4 text-white">
          <h3 className="font-semibold uppercase">Kontak</h3>
          <div className="flex flex-row items-center gap-4">
            <Mail size={18} />
            <span>example@gmail.com</span>
          </div>
          <div className="flex flex-row items-center gap-4">
            <MessagesSquare size={18} />
            <span>+62865-87656-9867</span>
          </div>
          <div className="flex flex-row items-center gap-4">
            <MapPin size={18} />
            <span>Jl.Pandawa No.19, Purwokerto</span>
          </div>
        </div>
        <div className="flex flex-col gap-4 text-white">
          <h3 className="font-semibold uppercase">Sosial Media</h3>
          <div className="flex flex-row flex-wrap items-center gap-4">
            <MessageCircleCheck size={28} />
            <Mail size={28} />
          </div>
        </div>
      </div>
    </footer>
  );
}
