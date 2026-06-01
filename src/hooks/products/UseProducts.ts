import { ProductService } from "@/services/products/products";
import { useState, useEffect } from "react";
import { Product } from "@/types/product";

export default function useProducts({ search = "" }: { search?: string }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const res = await ProductService.getAllProducts({ search });
        setProducts(res.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, [search]);

  return {
    products,
    isLoading,
  };
}
