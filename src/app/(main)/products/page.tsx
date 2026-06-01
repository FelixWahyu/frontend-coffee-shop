import ProductImg from "@/public/assets/image/expresso.jpg";
import Link from "next/link";
import HeroSection from "@/components/sections/product/SectionHero";
import { ProductService } from "@/services/products/products";
import { SearchParams } from "@/components/products/SearchBox";
import { Product } from "../../../types/product";
import { CategoriesSliders } from "@/components/sections/product/CategoriesSliders";
import ProductCard from "@/components/cards/ProductCard";
// import useProducts from "@/hooks/products/UseProducts";

export default async function productPage({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
  const params = await searchParams;
  const search = typeof params.search === "string" ? params.search : "";
  let products: Product[] = [];

  try {
    const result = await ProductService.getAllProducts({ search });
    products = result.data;
  } catch (error) {
    console.error("Error fetching products:", error);
  }

  return (
    <>
      <HeroSection />
      <CategoriesSliders />
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
              <ProductCard title={product.name} image={ProductImg} price={product.price.toLocaleString("id-ID")} category={product.category?.name} />
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
