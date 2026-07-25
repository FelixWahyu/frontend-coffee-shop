export interface Product {
  id: number;
  name: string;
  category: {
    id: number;
    name: string;
  } | null;
  price: number;
  description: string;
}

export interface ProductRequest {
  name: string;
  description?: string | null;
  price: number;
  category_id: number;
}

export interface ProductApiResponse {
  success: boolean;
  message: string;
  data: Product[];
  search?: string;
}

export interface SingleProductApiResponse {
  success: boolean;
  message: string;
  data: Product;
}
