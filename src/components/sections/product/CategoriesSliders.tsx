"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { ArrowLeft, ArrowRight, Coffee } from "lucide-react";
import type { Swiper as SwiperType } from "swiper";
import LoadingSkeleton from "../../ui/loading";
import EdgeUi from "../../ui/edge-ui";
import useFeatures from "@/hooks/featuresCategory/UseFeature";
import getSliderAtributes from "@/constants/slider";

export const CategoriesSliders = () => {
  const { categories, loading, prevRef, nextRef } = useFeatures();
  const { swiperAutoPlay, swiperBreakPoints } = getSliderAtributes({
    breakpoints: [
      {
        width: 640,
        slidesPerView: 3,
      },
      {
        width: 768,
        slidesPerView: 4,
      },
      {
        width: 1024,
        slidesPerView: 5,
      },
    ],
  });

  if (loading) {
    return <LoadingSkeleton />;
  }

  if (categories.length === 0) {
    return <EdgeUi message="Data kategori belum tersedia." />;
  }

  return (
    <section className="pt-20 px-6 bg-[#E2D9C8]">
      <div className="container mx-auto relative">
        <button ref={prevRef} className="absolute cursor-pointer left-2 md:-left-10 top-1/2 z-10 -translate-y-1/2 bg-white/80 backdrop-blur-md shadow-md rounded-full p-3 hover:scale-105 transition">
          <ArrowLeft size={20} />
        </button>
        <button ref={nextRef} className="absolute cursor-pointer right-2 md:-right-10 top-1/2 z-10 -translate-y-1/2 bg-white/80 backdrop-blur-md shadow-md rounded-full p-3 hover:scale-105 transition">
          <ArrowRight size={20} />
        </button>

        <Swiper
          modules={[Navigation, Autoplay]}
          autoplay={swiperAutoPlay}
          onBeforeInit={(swiper: SwiperType) => {
            if (typeof swiper.params.navigation !== "boolean" && swiper.params.navigation) {
              swiper.params.navigation.prevEl = prevRef.current;
              swiper.params.navigation.nextEl = nextRef.current;
            }
          }}
          loop={categories.length > 5}
          grabCursor={true}
          slidesPerView={2}
          spaceBetween={20}
          breakpoints={swiperBreakPoints}
        >
          {categories.map((category) => (
            <SwiperSlide key={category.id}>
              <div className="flex flex-col py-4 items-center gap-4 group cursor-pointer">
                <div className="aspect-square w-36 h-36 rounded-full bg-[#FAF7F2] border border-stone-200/50 shadow-sm flex items-center justify-center text-[#C67C4E] group-hover:bg-[#F5EFE6] group-hover:scale-105 transition-all duration-300">
                  <Coffee className="w-14 h-14" />
                </div>
                <h3 className="text-center font-bold font-playfair text-stone-800 text-lg group-hover:text-[#C67C4E] transition-colors">{category.name}</h3>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};
