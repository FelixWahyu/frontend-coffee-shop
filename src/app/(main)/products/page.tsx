import ProductImg from "@/src/asset/image/expresso.jpg";
import HeroImage from "@/src/asset/image/biji-coffe-cup.jpg";
import Image from "next/image";
import Link from "next/link";
import { ProductApi } from "@/src/lib/ProductData";
import { SearchParams } from "./searchBox";
import { Product } from "../../../types/product";
import { CategoriesSliders } from "@/src/components/CategoriesSliders";
import { Category } from "@/src/types/categories";
import { CategoriesApi } from "@/src/lib/FeaturesData";
import ProductCard from "@/src/components/cards/product-card";

// const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:5000/api";

export default async function productPage({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
  // const products = ProductsData;
  const params = await searchParams;
  const search = typeof params.search === "string" ? params.search : "";

  let products: Product[] = [];
  let categoriesData: Category[] = [];

  try {
    const result = await ProductApi.getProducts({ search });
    const categoryResult = await CategoriesApi.getCategories();

    categoriesData = categoryResult.data;
    products = result.data;

    // console.log(result);
    // return products;
  } catch (error) {
    console.error("Error fetching products:", error);
  }

  // const filtersProduct = products.filter((product) => {
  //   return product.name.toLowerCase().includes(search.toLowerCase());
  // });
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
                <button className="px-6 py-1.5 font-lato border border-gray-200/15 rounded-2xl bg-gray-50/30 backdrop-blur-md hover:bg-gray-50/50 transition-colors cursor-pointer duration-300">Order Now</button>
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
              {/* <div className="group cursor-pointer border border-gray-200 p-2 rounded-lg">
                <div className="relative aspect-square bg-muted overflow-hidden rounded-lg">
                  <Image src={ProductImg} alt="aqua botol" fill className="object-cover opacity-100 transition-all duration-500 group-hover:opacity-80 group-hover:scale-105" />
                  <div className="absolute inset-0 opcaity-100 transition-all duration-300 group-hover:opacity-80"></div>
                </div>
                <div className="mt-4">
                  <h3 className="text-xl font-semibold">{product.name}</h3>
                  <p className="text-md font-light">{product.category?.name}</p>
                  <div className="grid grid-cols-2 items-center justify-between mt-6">
                    <p className="text-md mt-4 font-semibold text-[#C67C4E]">Rp {product.price.toLocaleString("id-ID")}</p>
                    <button className="bg-[#C67C4E] px-4 py-2 cursor-pointer text-slate-100 font-semibold rounded-lg shadow-sm hover:bg-[#C67C4E]/80">Add to Chart</button>
                  </div>
                </div>
              </div> */}
              <ProductCard title={product.name} image={ProductImg} price={product.price} category={product.category?.name} />
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
