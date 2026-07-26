export interface Product {
  id: number;
  name: string;
  category: {
    id: number;
    name: string;
  } | null;
  price: number;
  description: string;
  image?: string | null;
}

export interface ProductRequest {
  name: string;
  description?: string | null;
  price: number;
  category_id: number;
  image?: string | null;
}

export interface ProductApiResponse {
  success: boolean;
  message: string;
  data: Product[];
  search?: string;
  paging?: {
    size: number;
    total_page: number;
    current_page: number;
  };
}

export interface SingleProductApiResponse {
  success: boolean;
  message: string;
  data: Product;
}
