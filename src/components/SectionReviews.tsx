"use client";

import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import ReviewCard from "../components/ui/cards-ui";
import { Reviews } from "../lib/profileData";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { Swiper as SwiperType } from "swiper";

export default function ReviewSection() {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  if (Reviews.length === 0) {
    return (
      <div className="my-6">
        <p className="text-gray-500 font-semibold font-lato">Data review belum tersedia.</p>
      </div>
    );
  }

  return (
    <section className="px-8 py-14 bg-[#E2D9C8]">
      <div className="container mx-auto">
        <div className="mb-10 text-center">
          <h2 className="text-3xl md:text-4xl font-playfair font-bold italic">
            Customers <span className="text-[#C67C4E]">Review</span>
          </h2>
        </div>

        <div className="container mx-auto relative pb-10">
          <button ref={prevRef} className="hidden md:flex absolute cursor-pointer md:-left-12 left-4 top-1/2 z-30 -translate-y-1/2 bg-white/80 backdrop-blur-md shadow-md rounded-full p-3 hover:scale-105 transition">
            <ArrowLeft size={20} />
          </button>
          <button ref={nextRef} className="hidden md:flex absolute cursor-pointer md:-right-12 right-4 top-1/2 z-30 -translate-y-1/2 bg-white/80 backdrop-blur-md shadow-md rounded-full p-3 hover:scale-105 transition">
            <ArrowRight size={20} />
          </button>
          <Swiper
            className="review-swiper"
            modules={[Navigation, Autoplay, Pagination]}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            onBeforeInit={(swiper: SwiperType) => {
              if (typeof swiper.params.navigation !== "boolean" && swiper.params.navigation) {
                swiper.params.navigation.prevEl = prevRef.current;
                swiper.params.navigation.nextEl = nextRef.current;
              }
            }}
            loop={Reviews.length > 3}
            grabCursor={true}
            pagination={{
              dynamicBullets: true,
              clickable: true,
            }}
            slidesPerView={1}
            spaceBetween={20}
            breakpoints={{
              640: {
                slidesPerView: 2,
              },
              768: {
                slidesPerView: 3,
              },
            }}
          >
            {Reviews.map((review) => (
              <SwiperSlide key={review.id}>
                <ReviewCard review={review} />
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="md:hidden flex items-center justify-center mt-4">
            <p className="text-[#30261C] italic text-sm font-lato font-semibold">Geser untuk melihat lebih lanjut</p>
          </div>
        </div>
      </div>
    </section>
  );
}
