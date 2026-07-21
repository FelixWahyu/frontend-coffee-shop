import { ProductApi } from "@/constants/products";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Coffee, ArrowLeft } from "lucide-react";
import { ProductService } from "@/services/products/products";
import ProductCard from "@/components/cards/ProductCard";
import { formatCurrency } from "@/utils/formatCurrency";
import AddToCartSection from "@/components/products/AddToCartSection";

export default async function DetailProduct({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const getProductId = await ProductApi.getProductById(slug);
  const getProduct = getProductId.data;
  if (!getProduct) {
    notFound();
    return;
  }

  // Fetch similar products based on the category ID
  let similarProducts: any[] = [];
  try {
    const categoryId = getProduct.category?.id;
    const similarRes = await ProductService.getAllProducts({
      category: categoryId?.toString(),
    });
    // Filter out current product and limit to 4
    similarProducts = similarRes.data.filter((p) => p.id !== getProduct.id).slice(0, 4);

    // Fallback if no similar products in same category
    if (similarProducts.length === 0) {
      const fallbackRes = await ProductService.getAllProducts();
      similarProducts = fallbackRes.data.filter((p) => p.id !== getProduct.id).slice(0, 4);
    }
  } catch (error) {
    console.error("Error fetching similar products:", error);
  }

  return (
    <main className="container mx-auto min-h-screen pb-20 pt-36 px-6 text-stone-800 bg-[#E2D9C8]">
      {/* Navigation */}
      <Link href="/products" className="inline-flex items-center gap-2 text-stone-500 hover:text-[#C67C4E] font-bold font-lato transition-colors mb-8 group">
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        Kembali ke Menu
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Product Image/Icon */}
        <div className="lg:col-span-6 aspect-square w-full bg-[#FAF7F2] border border-stone-200/50 shadow-md rounded-3xl flex items-center justify-center text-[#C67C4E] p-16">
          <Coffee className="w-36 h-36 animate-pulse duration-3000" />
        </div>

        {/* Right Column: Info */}
        <div className="lg:col-span-6 lg:aspect-square flex flex-col justify-between bg-white/60 backdrop-blur-md border border-stone-200/40 p-8 rounded-3xl shadow-sm">
          <div className="space-y-6">
            <div className="space-y-3">
              {getProduct.category && <span className="text-xs font-bold px-3 py-1 rounded-full bg-stone-100 text-stone-500 border border-stone-200/50 uppercase tracking-wider font-lato inline-block">{getProduct.category.name}</span>}
              <h1 className="text-3xl md:text-4xl font-bold font-playfair text-stone-900 leading-tight">{getProduct.name}</h1>
              <p className="text-2xl font-bold text-[#C67C4E] font-lato">{formatCurrency(getProduct.price)}</p>
            </div>

            <div className="space-y-2 pt-4 border-t border-stone-200">
              <h3 className="font-bold text-stone-700 font-playfair">Deskripsi</h3>
              <p className="text-sm text-stone-600 font-lato leading-relaxed">{getProduct.description || "Tidak ada deskripsi yang tersedia untuk produk ini."}</p>
            </div>
          </div>

          {/* Interactive add to cart - pushed to bottom */}
          <div className="mt-auto pt-6">
            <AddToCartSection price={getProduct.price} />
          </div>
        </div>
      </div>

      {/* Similar Products */}
      {similarProducts.length > 0 && (
        <section className="mt-20 pt-12 border-t border-stone-300/40 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <h2 className="text-2xl font-bold font-playfair text-stone-900 mb-8">Produk Serupa</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {similarProducts.map((similar) => (
              <Link key={similar.id} href={`/products/${similar.id}`} className="block">
                <ProductCard title={similar.name} price={formatCurrency(similar.price)} category={similar.category?.name} />
              </Link>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
