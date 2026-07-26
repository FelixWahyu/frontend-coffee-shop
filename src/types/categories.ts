export interface Category {
  id: number;
  name: string;
  description?: string | null;
  image?: string | null;
  createdAt: Date;
}

export interface CategoryRequest {
  name: string;
  description?: string;
  image?: string | null;
}

export interface CategoryApiResponse {
  success: boolean;
  message: string;
  data: Category[];
  paging?: {
    size: number;
    total_page: number;
    current_page: number;
  };
}
