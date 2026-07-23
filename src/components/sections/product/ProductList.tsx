import ProductCard from "@/components/cards/ProductCard";
import { Product } from "@/types/product";
import { formatCurrency } from "@/utils/formatCurrency";
import Link from "next/link";

interface ProductListProps {
  products: Product[];
}

export default async function ProductListSection({ products }: ProductListProps) {
  if (products.length === 0) {
    return (
      <div className="my-6">
        <p className="text-gray-500 font-semibold">Product tidak ditemukan.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 lg:gap-8 items-center">
      {products.map((product) => (
        <Link key={product.id} href={`/products/${product.id}`} className="block">
          <ProductCard title={product.name} price={formatCurrency(product.price)} category={product.category?.name} />
        </Link>
      ))}
    </div>
  );
}
