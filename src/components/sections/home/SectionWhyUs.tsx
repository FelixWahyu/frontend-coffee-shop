import Image from "next/image";
import Link from "next/link";
import ImgCoffe from "@/public/assets/image/biji-coffe-cup.jpg";
import { Clock, Coffee, Heart } from "lucide-react";

export default function WhyUsSection() {
  return (
    <section className="px-8 py-14 bg-[#E2D9C8]">
      <div className="flex flex-col md:flex-row items-stretch gap-8 md:gap-12 container mx-auto">
        <div className="w-full flex-1 space-y-6">
          <h2 className="text-4xl font-playfair font-bold italic">
            Why Choose <span className="text-[#C67C4E]">Us?</span>
          </h2>

          <div className="space-y-3">
            <p className="text-lg font-medium font-lato text-[#30261C]/80 leading-relaxed">
              Kami hanya menggunakan biji kopi pilihan dari petani lokal terbaik yang di-roasting dengan sempurna untuk menghasilkan cita rasa kaya dan autentik di setiap cangkir.
            </p>
            <p className="text-lg font-medium font-lato text-[#30261C]/80 leading-relaxed">Didukung oleh barista profesional dan suasana yang nyaman, setiap kunjungan Anda adalah pengalaman yang tak terlupakan.</p>
          </div>

          <div className="flex flex-wrap gap-4 pt-2">
            <div className="flex items-center gap-4">
              <Clock className="text-[#C67C4E] size-7 shrink-0" />
              <div>
                <p className="text-3xl font-playfair font-bold text-[#30261C]">10+</p>
                <p className="text-sm font-lato text-[#30261C]/60">Tahun Pengalaman</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Coffee className="text-[#C67C4E] size-7 shrink-0" />
              <div>
                <p className="text-3xl font-playfair font-bold text-[#30261C]">50+</p>
                <p className="text-sm font-lato text-[#30261C]/60">Jenis Kopi</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Heart className="text-[#C67C4E] size-7 shrink-0" />
              <div>
                <p className="text-3xl font-playfair font-bold text-[#30261C]">1K+</p>
                <p className="text-sm font-lato text-[#30261C]/60">Pelanggan Setia</p>
              </div>
            </div>
          </div>

          <Link href="/about" className="inline-block bg-[#30261C] px-6 py-1.5 text-white font-semibold rounded-2xl shadow-sm hover:bg-[#30261C]/70 transition-colors duration-300 cursor-pointer">
            More Info
          </Link>
        </div>

        <div className="overflow-hidden relative w-full md:flex-1 h-72 md:h-auto">
          <Image src={ImgCoffe} alt="Biji kopi pilihan dalam cangkir" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover rounded-md shadow-md" />
        </div>
      </div>
    </section>
  );
}
