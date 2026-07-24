import Link from "next/link";
import HeroSection from "@/components/sections/product/SectionHero";
import { ProductService } from "@/services/products/products";
import { FeaturesService } from "@/services/home/featureService";
import { SearchParams } from "@/components/products/SearchBox";
import { Product } from "../../../types/product";
import { CategoriesSliders } from "@/components/sections/product/CategoriesSliders";
import ProductCard from "@/components/cards/ProductCard";
import { formatCurrency } from "@/utils/formatCurrency";
import { Category } from "@/types/categories";

export default async function productPage({ 
  searchParams 
}: { 
  searchParams: Promise<{ [key: string]: string | string[] | undefined }> 
}) {
  const params = await searchParams;
  const search = typeof params.search === "string" ? params.search : "";
  const category = typeof params.category === "string" ? params.category : "";
  
  let products: Product[] = [];
  let categories: Category[] = [];

  // Fetch products and categories on the server side
  try {
    const [productResult, categoryResult] = await Promise.all([
      ProductService.getAllProducts({ search, category }),
      FeaturesService.getAllFeatures()
    ]);
    products = productResult.data;
    categories = categoryResult.data;
  } catch (error) {
    console.error("Error fetching products or categories on server:", error);
  }

  return (
    <>
      <HeroSection />
      {/* Pass preloaded server-side categories directly to client slider */}
      <CategoriesSliders categories={categories} />
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
              <ProductCard title={product.name} price={formatCurrency(product.price)} category={product.category?.name} />
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
