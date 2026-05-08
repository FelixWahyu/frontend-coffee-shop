import { ProductApi, ProductsData } from "@/src/lib/ProductData";
import { notFound } from "next/navigation";
import Image from "next/image";
import ProductImg from "@/src/app/asset/image/expresso.jpg";
import Link from "next/link";

export default async function DetailProduct({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const getProductId = await ProductApi.getProductById(slug);
  const getProduct = getProductId.data;
  // const getProduct = await ProductsData.find((product) => product.id === Number(slug));
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
        <div className="max-w-3xl grid grid-cols-2 items-center gap-10 px-6 py-3 bg-gray-100/50 backdrop-blur-lg shadow-md rounded-lg border border-gray-200/15 mt-10">
          <div className="aspect-square bg-muted">
            <Image src={ProductImg} width={100} height={100} alt="aqua botol" className="w-full h-full object-cover" />
          </div>
          <div>
            <h3 className="text-xl font-semibold">{getProduct.name}</h3>
            <p className="text-md">Category : {getProduct.category?.name}</p>
            <p className="text-md">Rp {getProduct.price.toLocaleString("id-ID")}</p>
            <p className="text-md">Deskripsi: {getProduct.description}</p>
          </div>
        </div>
      </div>
    </main>
  );
}
