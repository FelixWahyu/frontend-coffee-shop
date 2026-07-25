"use client";

import FormProduct from "@/components/admin/products/FormProduct";
import { ProductAdminService } from "@/services/admin/products";
import { Product } from "@/types/product";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function EditProductPage() {
  const params = useParams();
  const id = Number(params.id);

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      if (isNaN(id)) return;
      try {
        setLoading(true);
        const data = await ProductAdminService.getById(id);
        setProduct(data);
      } catch (error) {
        console.error("Failed to load product:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) {
    return <p className="text-gray-500">Loading product details...</p>;
  }

  if (!product) {
    return <p className="text-red-500">Product not found.</p>;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-1">Edit Product</h2>
      <p className="text-gray-500 mb-6">Update product catalog item</p>
      <FormProduct product={product} />
    </div>
  );
}
