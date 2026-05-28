import ProductImg from "@/public/assets/image/expresso.jpg";
import HeroImage from "@/public/assets/image/biji-coffe-cup.jpg";
import Image from "next/image";
import Link from "next/link";
import { ProductApi } from "@/constants/products";
import { SearchParams } from "@/components/products/SearchBox";
import { Product } from "../../../types/product";
import { CategoriesSliders } from "@/components/sections/product/CategoriesSliders";
import { Category } from "@/types/categories";
import { FeaturesService } from "@/src/services/home/featureService";
import ProductCard from "@/components/cards/ProductCard";

export default async function productPage({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
  const params = await searchParams;
  const search = typeof params.search === "string" ? params.search : "";

  let products: Product[] = [];
  let categoriesData: Category[] = [];

  try {
    const result = await ProductApi.getProducts({ search });
    const categoryResult = await FeaturesService.getAllFeatures();

    categoriesData = categoryResult.data;
    products = result.data;

    // console.log(result);
    // return products;
  } catch (error) {
    console.error("Error fetching products:", error);
  }

  return (
    <>
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

      <CategoriesSliders categories={categoriesData} />

      <section className="container mx-auto px-6 py-14">
        <div className="mb-10">
          <h1 className="text-4xl font-bold font-playfair mb-3">Our Menus</h1>
          <p className="text-md font-lato">This is the our menus we offer you.</p>
          <SearchParams />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 items-center">
          {products.length === 0 && (
            <div className="my-6">
              <p className="text-gray-500 font-semibold">Product tidak ditemukan.</p>
            </div>
          )}
          {products.map((product) => (
            <Link key={product.id} href={`/products/${product.id}`} className="block">
              <ProductCard title={product.name} image={ProductImg} price={product.price} category={product.category?.name} />
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
