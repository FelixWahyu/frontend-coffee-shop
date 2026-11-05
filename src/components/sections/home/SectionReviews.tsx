"use client";

import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import ReviewCard from "@/components/cards/ReviewCard";
import LoadingSkeleton from "../../ui/loading";
import { ArrowLeft, ArrowRight, MessageSquarePlus, Star, Sparkles } from "lucide-react";
import type { Swiper as SwiperType } from "swiper";
import useReview from "@/hooks/reviews/UseReview";
import getSliderAtributes from "@/constants/slider";
import ReviewModal from "./ReviewModal";
import getCurrrentUser from "@/services/auth/authUser";
import { UserResponse } from "@/types/users";

export default function ReviewSection() {
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

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  const totalReviews = reviewData.length;
  const averageRating =
    totalReviews > 0
      ? (reviewData.reduce((acc, curr) => acc + curr.rating, 0) / totalReviews).toFixed(1)
      : "5.0";

  return (
    <section className="px-6 md:px-8 py-16 bg-[#E2D9C8]">
      <div className="container mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
          <div className="text-center md:text-left space-y-2">
            <h2 className="text-3xl md:text-4xl font-playfair font-bold italic text-stone-900">
              Customers <span className="text-[#C67C4E]">Review</span>
            </h2>
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 text-stone-600 text-sm font-lato">
              <span className="flex items-center gap-1 font-bold text-stone-800 bg-white/70 px-2.5 py-1 rounded-full shadow-xs">
                <Star size={14} fill="#C67C4E" className="text-[#C67C4E]" />
                {averageRating} / 5.0
              </span>
              <span>&bull;</span>
              <span>{totalReviews} ulasan pelanggan kami</span>
            </div>
          </div>

          {/* Action Button */}
          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-[#C67C4E] hover:bg-[#b06a3d] text-white font-lato font-semibold text-sm shadow-md hover:shadow-lg active:scale-95 transition-all cursor-pointer"
          >
            <MessageSquarePlus className="w-4 h-4" />
            <span>Beri Ulasan</span>
          </button>
        </div>

        {/* Content */}
        {totalReviews === 0 ? (
          <div className="bg-white/60 backdrop-blur-md rounded-3xl p-8 md:p-12 text-center max-w-xl mx-auto border border-stone-200/50 shadow-sm space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-[#C67C4E]/10 text-[#C67C4E] flex items-center justify-center mx-auto shadow-inner">
              <Sparkles className="w-8 h-8" />
            </div>
            <h3 className="text-xl md:text-2xl font-bold font-playfair text-stone-900">
              Belum Ada Ulasan
            </h3>
            <p className="text-sm font-lato text-stone-600 leading-relaxed">
              Jadilah pelanggan pertama yang membagikan cerita dan aroma kopi favoritmu di Coffee Shop kami!
            </p>
            <div className="pt-2">
              <button
                onClick={() => setIsModalOpen(true)}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-[#C67C4E] hover:bg-[#b06a3d] text-white font-lato font-semibold text-sm shadow-md hover:shadow-lg active:scale-95 transition-all cursor-pointer"
              >
                <MessageSquarePlus className="w-4 h-4" />
                <span>Tulis Ulasan Pertama</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="container mx-auto relative pb-10">
            <button
              ref={prevRef}
              aria-label="Ulasan Sebelumnya"
              className="hidden md:flex absolute cursor-pointer -left-4 lg:-left-6 top-1/2 z-30 -translate-y-1/2 bg-white/90 backdrop-blur-md shadow-md rounded-full p-3 hover:scale-110 active:scale-95 transition border border-stone-200/60"
            >
              <ArrowLeft size={20} className="text-stone-800" />
            </button>
            <button
              ref={nextRef}
              aria-label="Ulasan Berikutnya"
              className="hidden md:flex absolute cursor-pointer -right-4 lg:-right-6 top-1/2 z-30 -translate-y-1/2 bg-white/90 backdrop-blur-md shadow-md rounded-full p-3 hover:scale-110 active:scale-95 transition border border-stone-200/60"
            >
              <ArrowRight size={20} className="text-stone-800" />
            </button>

            <Swiper
              className="review-swiper !py-4"
              modules={[Navigation, Autoplay, Pagination]}
              autoplay={swiperAutoPlay}
              onBeforeInit={(swiper: SwiperType) => {
                if (typeof swiper.params.navigation !== "boolean" && swiper.params.navigation) {
                  swiper.params.navigation.prevEl = prevRef.current;
                  swiper.params.navigation.nextEl = nextRef.current;
                }
              }}
              loop={totalReviews > 3}
              grabCursor={true}
              pagination={swiperPagination}
              slidesPerView={1}
              spaceBetween={20}
              breakpoints={swiperBreakPoints}
            >
              {reviewData.map((review) => (
                <SwiperSlide key={review.id} className="!h-auto flex items-stretch">
                  <ReviewCard
                    name={review.user?.name || review.user?.username}
                    email={review.user?.contacts?.[0]?.email}
                    username={review.user?.username}
                    rating={review.rating}
                    comment={review.comment}
                    createdAt={review.createdAt}
                  />
                </SwiperSlide>
              ))}
            </Swiper>

            <div className="md:hidden flex items-center justify-center mt-4">
              <p className="text-[#30261C] italic text-xs font-lato font-semibold">
                Geser untuk melihat ulasan lainnya
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Review Modal */}
      <ReviewModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={() => refetchReviews()}
        user={user}
        isAuth={isAuth}
      />
    </section>
  );
}
