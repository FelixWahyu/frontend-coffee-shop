import Image from "next/image";
import heroImage from "@/public/assets/image/3cup-coffe.jpg";
import Link from "next/link";

export default function HeroSection() {
  return (
    <>
      <section className="relative flex h-screen items-center justify-center bg-gray-800">
        <Image src={heroImage} fill className="object-cover" priority alt="hero-image" />
        <div className="absolute inset-0 bg-linear-to-r from-[#30261C]/90 to-[#30261C]/30"></div>
        <div className="relative z-10 container p-4 mt-8 md:mt-10">
          <div className="text-white max-w-2xl px-4 md:px-0 text-left">
            <div className="px-4 py-1 bg-gray-50/30 backdrop-blur-md w-fit mb-4 border border-gray-200/15 rounded-xl">
              <p className="text-lg font-lato">Welcome to Coffee Shop</p>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-4 leading-tight italic font-playfair">
              Nikmati Secangkir Kopi Yang Dibuat Dengan <span className="not-italic text-[#C67C4E]">Biji Kopi Pilihan</span>
            </h1>
            <div>
              <p className="text-lg text-gray-200 font-lato">Dibuat dengan biji kopi pilihan dari berbagai penjuru dunia, disajikan dengan penuh kehangatan.</p>
              <div className="flex gap-6 items-center mt-10">
                <button className="px-6 py-1.5 font-lato border border-gray-200/15 rounded-2xl bg-gray-50/30 backdrop-blur-md hover:bg-gray-50/50 transition-colors cursor-pointer duration-300">Order Now</button>
                <Link href={"/about"} className="px-6 py-1.5 font-lato rounded-2xl bg-[#C67C4E] hover:bg-[#C67C4E]/70 transition-colors cursor-pointer duration-300">
                  About Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
