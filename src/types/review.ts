export interface Review {
  id: number;
  user: {
    name: string;
    username: string;
    contacts: {
      email?: string | null;
    }[];
  };
  comment: string;
  rating: number;
}

export interface ReviewApiResponse {
  success: boolean;
  message: string;
  data: Review[];
}

export interface ReviewCardProps {
  review: Review;
}
