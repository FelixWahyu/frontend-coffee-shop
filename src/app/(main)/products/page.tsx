import HeroSection from "@/components/sections/product/SectionHero";
import { ProductService } from "@/services/products/products";
import { SearchParams } from "@/components/products/SearchBox";
import { Product } from "../../../types/product";
import { CategoriesSliders } from "@/components/sections/product/CategoriesSliders";
import ProductListSection from "@/components/sections/product/ProductList";

export default async function productPage({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
  const params = await searchParams;
  const search = typeof params.search === "string" ? params.search : "";
  const category = typeof params.category === "string" ? params.category : "";
  let products: Product[] = [];

  try {
    const result = await ProductService.getAllProducts({ search, category });
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
        <ProductListSection products={products} />
      </section>
    </>
  );
}
