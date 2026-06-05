export interface Category {
  id: number;
  name: string;
  description?: string | null;
  createdAt: Date;
}

export interface CategoryRequest {
  name: string;
  description?: string;
}

export interface CategoryApiResponse {
  success: boolean;
  message: string;
  data: Category[];
}
