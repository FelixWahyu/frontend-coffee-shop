import { useState, useEffect } from "react";
import { ReviewService } from "@/services/home/reviewService";

interface UseReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const RATING_LABELS: Record<number, string> = {
  1: "Sangat Buruk 😞",
  2: "Kurang Memuaskan 😐",
  3: "Cukup Baik 😊",
  4: "Sangat Puas 👍",
  5: "Luar Biasa / Sempurna! ☕",
};

export function useReviewModal({ isOpen, onClose, onSuccess }: UseReviewModalProps) {
  const [mounted, setMounted] = useState(false);
  const [rating, setRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  useEffect(() => {
    if (!isOpen) {
      setRating(5);
      setHoverRating(0);
      setComment("");
      setErrorMsg(null);
      setSuccessMsg(false);
      return;
    }

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  const currentDisplayRating = hoverRating || rating;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (rating < 1 || rating > 5) {
      setErrorMsg("Silakan pilih rating bintang terlebih dahulu.");
      return;
    }
    if (comment.trim().length < 3) {
      setErrorMsg("Ulasan minimal 3 karakter.");
      return;
    }
    if (comment.trim().length > 1000) {
      setErrorMsg("Ulasan maksimal 1000 karakter.");
      return;
    }

    try {
      setLoading(true);
      setErrorMsg(null);
      await ReviewService.createReview({
        rating,
        comment: comment.trim(),
      });
      setSuccessMsg(true);
      setTimeout(() => {
        onSuccess();
        onClose();
      }, 1200);
    } catch (err: any) {
      setErrorMsg(err?.message || "Gagal mengirim ulasan. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  const isSubmitDisabled = loading || comment.trim().length < 3;

  return {
    mounted,
    rating,
    setRating,
    hoverRating,
    setHoverRating,
    comment,
    setComment,
    loading,
    errorMsg,
    successMsg,
    currentDisplayRating,
    ratingLabel: RATING_LABELS[currentDisplayRating] || "",
    isSubmitDisabled,
    handleSubmit,
  };
}

export default useReviewModal;
