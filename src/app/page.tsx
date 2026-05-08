import Image from "next/image";
import heroImage from "@/src/app/asset/image/3cup-coffe.jpg";
import ImgCoffe from "@/src/app/asset/image/biji-coffe-cup.jpg";
import { CategoriesApi } from "@/src/lib/FeaturesData";
import featuresImg from "@/src/app/asset/image/expresso.jpg";
import Link from "next/link";
import { Category } from "../types/categories";
import { Reviews } from "../lib/profileData";
import ReviewCard from "../components/ui/cards-ui";

export default async function Home() {
  let categories: Category[] = [];

  try {
    const result = await CategoriesApi.getCategories();
    categories = result.data;
  } catch (error) {
    console.log("Error fetching categories:", error);
  }

  return (
    <main className="bg-[#E2D9C8]">
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

      <section className="px-8 py-14 bg-[#E2D9C8] text-center">
        <div className="flex flex-col gap-3 mb-8">
          <h2 className="text-4xl font-playfair font-bold italic">Features</h2>
          <p className="text-lg font-medium font-lato">Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci, dolorem!</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 container mx-auto">
          {categories.length === 0 && (
            <div className="my-6">
              <p className="text-gray-500 font-semibold">Data Features belum di tambahkan.</p>
            </div>
          )}
          {categories.map((feature) => (
            <div key={feature.id} className="flex flex-col h-full justify-center group bg-[#F1F0EE] border border-[#30261C]/15">
              <div className="mb-4 aspect-square relative overflow-hidden">
                <Image src={featuresImg} alt={feature.name} fill className="object-cover opacity-100 group-hover:opacity-80 group-hover:scale-105 transition-all duration-300" />
              </div>
              <div className="px-4 py-2 mb-4 flex flex-1 flex-col">
                <h3 className="text-xl font-semibold font-playfair mb-3">{feature.name}</h3>
                <p className="text-md font-lato flex-1">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="px-8 py-14 bg-[#E2D9C8]">
        <div className="flex flex-col md:flex-row items-center gap-8 container mx-auto">
          <div className="w-full flex-1">
            <h2 className="text-4xl font-playfair font-bold italic mb-4">
              Why Choose <span className="text-[#C67C4E]">Us?</span>
            </h2>
            <p className="text-lg font-medium font-lato mb-3">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci, dolorem! Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cupiditate nesciunt exercitationem aspernatur, doloribus repellendus dignissimos deleniti
              beatae ratione maiores eveniet consectetur ipsum adipisci expedita optio, voluptatum dolorum, reprehenderit similique! Assumenda.
            </p>
            <p className="text-lg font-medium font-lato mb-8">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci, dolorem! Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cupiditate nesciunt exercitationem aspernatur, doloribus repellendus dignissimos deleniti
              beatae ratione maiores eveniet consectetur ipsum adipisci expedita optio, voluptatum dolorum, reprehenderit similique! Assumenda. Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda, accusantium!
            </p>
            <div className="flex gap-8 mb-8">
              <div>
                <p className="text-3xl font-playfair font-bold text-[#30261C]">10+</p>
                <p className="text-sm font-lato text-[#30261C]/60">Tahun Pengalaman</p>
              </div>
              <div>
                <p className="text-3xl font-playfair font-bold text-[#30261C]">50+</p>
                <p className="text-sm font-lato text-[#30261C]/60">Jenis Kopi</p>
              </div>
              <div>
                <p className="text-3xl font-playfair font-bold text-[#30261C]">1K+</p>
                <p className="text-sm font-lato text-[#30261C]/60">Pelanggan Setia</p>
              </div>
            </div>
            <button className="bg-[#30261C] px-6 py-1.5 text-white font-semibold rounded-2xl shadow-sm hover:bg-[#30261C]/70 transition-colors duration-300 cursor-pointer">More Info</button>
          </div>

          <div className="aspect-square overflow-hidden relative w-full md:flex-1">
            <Image src={ImgCoffe} alt="coffe-image" fill className="object-cover rounded-md shadow-md" />
          </div>
        </div>
      </section>

      <section className="px-8 py-14 bg-[#E2D9C8]">
        <div className="container mx-auto">
          <div className="mb-10 text-center">
            <h2 className="text-3xl md:text-4xl font-playfair font-bold italic">
              Customers <span className="text-[#C67C4E]">Review</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 items-center">
            {Reviews.map((reviews) => (
              <ReviewCard key={reviews.id} review={reviews} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
