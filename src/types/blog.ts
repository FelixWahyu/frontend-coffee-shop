export interface BlogArticle {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  category: string;
  author: string;
  tags: string[];
  readingTime: number;
  date?: string;
  createdAt: string;
  updatedAt: string;
}

export interface BlogRequest {
  title: string;
  excerpt: string;
  content: string;
  image: string;
  category: string;
  author: string;
  tags: string[];
  readingTime: number;
}

export interface BlogApiResponse {
  success: boolean;
  message: string;
  data: BlogArticle[];
}
