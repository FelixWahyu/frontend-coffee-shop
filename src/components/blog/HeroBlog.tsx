import Image from "next/image";
import BlogBack from "@/public/assets/image/blog-background.jpg";

export default function HeroBlog() {
  return (
    <section className="relative h-[80vh] bg-gray-800 flex items-center justify-center">
      <Image src={BlogBack} alt="hero-background" fill priority className="object-cover" />
      <div className="absolute inset-0 bg-linear-to-t from-[#30261C] to-[#30261C]/10"></div>
      <div className="relative z-10 container mx-auto p-4 mt-8 md:mt-10">
        <div className="text-white max-w-2xl mx-auto flex flex-col items-start md:items-center md:justify-center px-4 md:px-0 text-left md:text-center">
          <div className="px-4 py-1 bg-gray-50/30 backdrop-blur-md w-fit mb-4 border border-gray-200/15 rounded-xl">
            <p className="text-lg font-lato">Artikel & Berita Kopi</p>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-4 leading-tight italic font-playfair">
            Artikel <span className="not-italic text-[#C67C4E]">Kopi</span>
          </h1>
          <div className="w-20 h-1 bg-[#C67C4E] rounded-full mb-4"></div>
          <div className="flex flex-col items-start md:items-center md:justify-center">
            <p className="text-lg text-gray-200 font-lato">Temukan berbagai artikel, tips, dan berita terbaru seputar kopi dari para ahli kami.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
