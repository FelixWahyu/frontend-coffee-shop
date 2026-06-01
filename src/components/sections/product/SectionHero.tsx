import Image from "next/image";
import HeroImage from "@/public/assets/image/biji-coffe-cup.jpg";

export default function HeroSection() {
  return (
    <section className="relative h-screen bg-gray-800 flex items-center justify-center">
      <Image src={HeroImage} alt="hero-background" fill priority className="object-cover" />
      <div className="absolute inset-0 bg-linear-to-t from-[#30261C] to-[#30261C]/10"></div>
      <div className="relative z-10 container mx-auto p-4 mt-8 md:mt-10">
        <div className="text-white max-w-2xl mx-auto flex flex-col items-start md:items-center md:justify-center px-4 md:px-0 text-left md:text-center">
          <div className="px-4 py-1 bg-gray-50/30 backdrop-blur-md w-fit mb-4 border border-gray-200/15 rounded-xl">
            <p className="text-lg font-lato">Coffee Shop Menus</p>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-4 leading-tight italic font-playfair">
            Our Menus And <span className="not-italic text-[#C67C4E]">Coffee</span>
          </h1>
          <div className="flex flex-col items-start md:items-center md:justify-center">
            <p className="text-lg text-gray-200 font-lato">Dibuat dengan cinta dan biji kopi pilihan dari berbagai penjuru dunia, disajikan dengan penuh kehangatan.</p>
            <div className="mt-10">
              <button className="px-6 py-1.5 font-lato border-none rounded-2xl bg-[#C67C4E] hover:bg-[#C67C4E]/70 transition-colors cursor-pointer duration-300">Order Now</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
