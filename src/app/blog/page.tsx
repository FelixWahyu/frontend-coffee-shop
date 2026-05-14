import { profileData } from "@/src/lib/profileData";
import { CardBody } from "@/src/components/ui/card-body";
import Link from "next/link";
import Image from "next/image";
import BlogBack from "@/app/asset/image/blog-background.jpg";

export default function BlogPage() {
  return (
    <main className="bg-[#E2D9C8]">
      <section className="relative h-[90vh] md:h-[80vh] bg-gray-800 flex items-center justify-center">
        <Image src={BlogBack} alt="hero-background" fill priority className="object-cover" />
        <div className="absolute inset-0 bg-linear-to-t from-[#30261C] to-[#30261C]/10"></div>
        <div className="relative z-10 container mx-auto p-4 mt-8 md:mt-10">
          <div className="text-white max-w-2xl mx-auto flex flex-col items-start md:items-center md:justify-center px-4 md:px-0 text-left md:text-center">
            <div className="px-4 py-1 bg-gray-50/30 backdrop-blur-md w-fit mb-4 border border-gray-200/15 rounded-xl">
              <p className="text-lg font-lato">Karya Blog Kami</p>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-4 leading-tight italic font-playfair">
              Blog <span className="not-italic text-[#C67C4E]">Artikel</span>
            </h1>
            <div className="flex flex-col items-start md:items-center md:justify-center">
              <p className="text-lg text-gray-200 font-lato">Hasil karya kami untuk anda penggemar kopi, karya blog dan cita rasa kopi yang kami buat.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-8">
        <div className="container mx-auto p-4">
          <h1 className="text-4xl font-bold font-playfair">My Blog Artikel</h1>
          <p className="text-md font-lato mt-6">This is the my blog.</p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-6">
            {profileData.map((profile) => (
              <Link key={profile.id} href={`/blog/${profile.id}`} className="block">
                <CardBody profiles={profile} />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
