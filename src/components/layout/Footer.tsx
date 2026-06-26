import Image from "next/image";
import Link from "next/link";
import Logo from "@/public/assets/logo/brand-3.jpg";
import { Mail, MapPin, MessageCircle, Camera, Send } from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-[#30261C] px-6 pt-16 pb-6">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
        <div className="space-y-5">
          <div className="flex items-center gap-4">
            <Image src={Logo} width={52} height={52} alt="coffee shop logo" className="rounded-full border border-gray-300" />
            <span className="text-2xl font-bold text-white font-playfair">
              <span className="text-[#C67C4E]">Coffee</span> Shop
            </span>
          </div>
          <p className="text-slate-300 leading-relaxed text-base font-lato">Nikmati kopi pilihan dari biji terbaik Nusantara, diracik oleh barista profesional dalam setiap cangkir.</p>
        </div>

        <div className="text-white space-y-4">
          <h3 className="font-semibold uppercase tracking-wide">Navigasi</h3>
          <div className="flex flex-col gap-3">
            <Link href="/" className="text-base text-slate-300 font-lato hover:text-[#C67C4E] hover:translate-x-1 transition-all duration-300">
              Home
            </Link>
            <Link href="/about" className="text-base text-slate-300 font-lato hover:text-[#C67C4E] hover:translate-x-1 transition-all duration-300">
              About
            </Link>
            <Link href="/products" className="text-base text-slate-300 font-lato hover:text-[#C67C4E] hover:translate-x-1 transition-all duration-300">
              Products
            </Link>
            <Link href="/blog" className="text-base text-slate-300 font-lato hover:text-[#C67C4E] hover:translate-x-1 transition-all duration-300">
              Blog
            </Link>
          </div>
        </div>

        <div className="space-y-4 text-white">
          <h3 className="font-semibold uppercase tracking-wide">Kontak</h3>
          <div className="flex flex-col gap-4">
            <div className="flex items-start gap-3">
              <Mail size={18} className="mt-0.5 shrink-0 text-[#C67C4E]" />
              <span className="text-base font-lato text-slate-300">example@gmail.com</span>
            </div>
            <div className="flex items-start gap-3">
              <MessageCircle size={18} className="mt-0.5 shrink-0 text-[#C67C4E]" />
              <span className="text-base font-lato text-slate-300">+62865-87656-9867</span>
            </div>
            <div className="flex items-start gap-3">
              <MapPin size={18} className="mt-0.5 shrink-0 text-[#C67C4E]" />
              <span className="text-base text-slate-300 font-lato leading-relaxed">Griya Tegal Sari Indah Jl. Gatramas Raya, Tegalmulya, Ledug, Kec. Kembaran, Kabupaten Banyumas, Jawa Tengah 53182</span>
            </div>
          </div>
        </div>

        <div className="space-y-4 text-white lg:col-span-2">
          <h3 className="font-semibold uppercase tracking-wide">Sosial Media</h3>
          <div className="flex items-center gap-3">
            <a href="https://wa.me/6281282829298" target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-white/10 hover:bg-[#C67C4E] hover:scale-110 transition-all duration-300">
              <MessageCircle size={20} />
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-white/10 hover:bg-[#C67C4E] hover:scale-110 transition-all duration-300">
              <Camera size={20} />
            </a>
          </div>
          <div className="flex gap-2">
            <input
              type="email"
              placeholder="Masukkan email Anda"
              className="flex-1 min-w-0 px-4 py-2 text-base rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-slate-400 focus:outline-none focus:border-[#C67C4E] transition"
            />
            <button className="flex items-center gap-1.5 px-4 py-2 text-base font-semibold rounded-xl bg-[#C67C4E] text-white hover:bg-[#C67C4E]/70 transition-colors cursor-pointer shrink-0">
              <Send size={16} />
              Subscribe
            </button>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 mt-14 pt-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-sm text-slate-300">
        <p>&copy; {year} Coffee Shop. All rights reserved.</p>
        <div className="flex items-center gap-4">
          <Link href="#" className="hover:text-[#C67C4E] transition-colors">
            Privacy Policy
          </Link>
          <Link href="#" className="hover:text-[#C67C4E] transition-colors">
            Terms of Service
          </Link>
        </div>
      </div>
    </footer>
  );
}
