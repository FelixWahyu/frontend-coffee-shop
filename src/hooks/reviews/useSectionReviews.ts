import { useState, useEffect } from "react";
import type { Swiper as SwiperType } from "swiper";
import useReview from "@/hooks/reviews/UseReview";
import getSliderAtributes from "@/constants/slider";
import getCurrrentUser from "@/services/auth/authUser";
import { UserResponse } from "@/types/users";

export function useSectionReviews() {
  const { reviewData, isLoading, prevRef, nextRef, refetchReviews } = useReview();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [user, setUser] = useState<UserResponse | null>(null);
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const currentUser = await getCurrrentUser();
        if (currentUser && currentUser.data) {
          setUser(currentUser.data);
          setIsAuth(true);
        } else {
          setUser(null);
          setIsAuth(false);
        }
      } catch {
        setUser(null);
        setIsAuth(false);
      }
    };

    fetchUser();

    const handleAuthChange = () => {
      fetchUser();
    };

    window.addEventListener("auth-change", handleAuthChange);
    return () => window.removeEventListener("auth-change", handleAuthChange);
  }, []);

  const { swiperAutoPlay, swiperPagination, swiperBreakPoints } = getSliderAtributes({
    breakpoints: [
      {
        width: 640,
        slidesPerView: 2,
      },
      {
        width: 768,
        slidesPerView: 3,
      },
    ],
  });

  const totalReviews = reviewData.length;
  const averageRating =
    totalReviews > 0
      ? (reviewData.reduce((acc, curr) => acc + curr.rating, 0) / totalReviews).toFixed(1)
      : "5.0";

  const onBeforeInit = (swiper: SwiperType) => {
    if (typeof swiper.params.navigation !== "boolean" && swiper.params.navigation) {
      swiper.params.navigation.prevEl = prevRef.current;
      swiper.params.navigation.nextEl = nextRef.current;
    }
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const handleSuccess = () => refetchReviews();

  const isLoop = totalReviews > 3;

  return {
    reviewData,
    isLoading,
    prevRef,
    nextRef,
    isModalOpen,
    openModal,
    closeModal,
    handleSuccess,
    user,
    isAuth,
    totalReviews,
    averageRating,
    swiperAutoPlay,
    swiperPagination,
    swiperBreakPoints,
    onBeforeInit,
    isLoop,
  };
}

export default useSectionReviews;
