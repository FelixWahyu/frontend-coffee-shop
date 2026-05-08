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

export interface ProductApiResponse {
  success: boolean;
  message: string;
  data: Product[];
  search?: string;
}
