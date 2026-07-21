import { ProductApi } from "@/constants/products";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Coffee } from "lucide-react";

export default async function DetailProduct({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const getProductId = await ProductApi.getProductById(slug);
  const getProduct = getProductId.data;
  if (!getProduct) {
    console.log("product tidak ada.");
    notFound();
    return;
  }

  return (
    <main className="container mx-auto h-screen">
      <div className="mt-38">
        <Link href={"/products"} className="text-slate-500 hover:text-slate-400 mb-6 underline">
          Kembali
        </Link>
        <div className="mt-4">
          <h1 className="text-3xl font-bold">Detail Page</h1>
          <h3 className="text-xl">This is the detail page for {getProduct.name}</h3>
        </div>
        <div className="max-w-3xl grid grid-cols-1 md:grid-cols-2 items-center gap-10 px-6 py-6 bg-white/70 backdrop-blur-lg shadow-lg rounded-2xl border border-stone-200/50 mt-10">
          <div className="aspect-square bg-[#F5EFE6] rounded-xl flex items-center justify-center text-[#C67C4E]">
            <Coffee className="w-24 h-24" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-stone-800 font-playfair">{getProduct.name}</h3>
            <p className="text-sm font-semibold px-2 py-0.5 mt-2 inline-block rounded-full bg-stone-100 text-stone-500 border border-stone-200/50 uppercase tracking-wider font-lato">Category : {getProduct.category?.name || "Uncategorized"}</p>
            <p className="text-xl font-bold text-[#C67C4E] mt-4 font-lato">Rp {getProduct.price.toLocaleString("id-ID")}</p>
            <p className="text-sm text-stone-600 mt-4 font-lato leading-relaxed"><span className="font-bold text-stone-700">Deskripsi:</span> {getProduct.description || "No description available."}</p>
          </div>
        </div>
      </div>
    </main>
  );
}
