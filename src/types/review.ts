export interface ReviewUser {
  name: string;
  username: string;
  contacts: {
    email?: string | null;
  }[];
}

export interface Review {
  id: number;
  user: ReviewUser;
  comment: string;
  rating: number;
  createdAt?: string;
}

export interface CreateReviewInput {
  rating: number;
  comment: string;
}

export interface ReviewApiResponse {
  success: boolean;
  message: string;
  data: Review[];
  paging?: {
    size: number;
    total_page: number;
    current_page: number;
    total_item?: number;
  };
}

export interface SingleReviewApiResponse {
  success: boolean;
  message: string;
  data: Review;
}

export interface ReviewCardProps {
  name: string;
  email?: string | null;
  username?: string;
  rating: number;
  comment: string;
  createdAt?: string;
}
