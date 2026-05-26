import { useState, useEffect, useRef } from "react";
import { Review } from "@/types/review";
import { ReviewService } from "@/services/home/reviewService";

export default function useReview() {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  const [ReviewData, setReviewData] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await ReviewService.getReviews();
        setReviewData(result.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return { ReviewData, isLoading, prevRef, nextRef };
}
