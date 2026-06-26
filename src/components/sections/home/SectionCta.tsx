import Image from "next/image";
import ctaImage from "@/public/assets/image/cafe-front.jpg";

export default function CtaSection() {
  return (
    <section className="relative mb-8 flex items-center justify-center py-20 md:py-28 bg-gray-800">
      <Image src={ctaImage} fill className="object-cover" alt="Suasana coffee shop" />
      <div className="absolute inset-0 bg-linear-to-r from-[#30261C]/90 to-[#30261C]/40" />
      <div className="relative z-10 container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center text-white">
          <h2 className="text-4xl md:text-5xl font-playfair font-bold italic mb-4">Siap Menikmati Kopi Terbaik Hari Ini?</h2>
          <p className="text-lg font-lato text-gray-200 mb-8 max-w-lg mx-auto">Pesan sekarang dan nikmati setiap tegukan kopi pilihan kami yang diseduh dengan penuh cinta oleh barista profesional.</p>
          <a
            href="https://wa.me/6281282829298"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-[#C67C4E] px-8 py-2.5 text-white font-semibold rounded-2xl hover:bg-[#C67C4E]/70 transition-colors duration-300 cursor-pointer"
          >
            Pesan Sekarang
          </a>
        </div>
      </div>
    </section>
  );
}
