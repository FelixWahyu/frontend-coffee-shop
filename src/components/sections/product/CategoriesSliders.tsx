"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { ArrowLeft, ArrowRight, Coffee } from "lucide-react";
import { Category } from "@/types/categories";
import EdgeUi from "../../ui/edge-ui";
import Image from "next/image";
import { getImageUrl } from "@/utils/getImageUrl";
import useCategorySlider from "@/hooks/products/useCategorySlider";

interface CategoriesSlidersProps {
  categories: Category[];
}

export const CategoriesSliders = ({ categories }: CategoriesSlidersProps) => {
  const {
    selectedCategory,
    prevRef,
    nextRef,
    handleCategoryClick,
    handleResetCategory,
    onBeforeInit,
    swiperBreakPoints,
    isLoop,
  } = useCategorySlider(categories);

  if (categories.length === 0) {
    return <EdgeUi message="Data kategori belum tersedia." />;
  }

  return (
    <section className="pt-20 px-6 bg-[#E2D9C8]">
      <div className="container mx-auto relative">
        <button
          ref={prevRef}
          className="absolute cursor-pointer left-2 md:-left-10 top-1/2 z-10 -translate-y-1/2 bg-white/80 backdrop-blur-md shadow-md rounded-full p-3 hover:scale-105 transition"
        >
          <ArrowLeft size={20} />
        </button>
        <button
          ref={nextRef}
          className="absolute cursor-pointer right-2 md:-right-10 top-1/2 z-10 -translate-y-1/2 bg-white/80 backdrop-blur-md shadow-md rounded-full p-3 hover:scale-105 transition"
        >
          <ArrowRight size={20} />
        </button>

        <Swiper
          modules={[Navigation]}
          onBeforeInit={onBeforeInit}
          loop={isLoop}
          grabCursor={true}
          slidesPerView={2}
          spaceBetween={20}
          breakpoints={swiperBreakPoints}
        >
          {/* 'Semua' Category Slide to Reset Filter */}
          <SwiperSlide>
            <div 
              onClick={handleResetCategory}
              className="flex flex-col py-4 items-center gap-4 group cursor-pointer"
            >
              <div className={`aspect-square w-36 h-36 rounded-full border shadow-sm flex items-center justify-center transition-all duration-300 ${
                !selectedCategory 
                  ? "border-[#C67C4E] bg-[#F5EFE6] text-[#C67C4E] scale-105" 
                  : "border-stone-200/50 bg-[#FAF7F2] text-stone-600 hover:bg-[#F5EFE6] hover:scale-105"
              }`}>
                <Coffee className="w-14 h-14" />
              </div>
              <h3 className={`text-center font-bold font-playfair text-lg transition-colors duration-300 ${
                !selectedCategory ? "text-[#C67C4E]" : "text-stone-800 group-hover:text-[#C67C4E]"
              }`}>
                Semua
              </h3>
            </div>
          </SwiperSlide>

          {categories.map((category) => {
            const isActive = selectedCategory === category.id.toString();
            return (
              <SwiperSlide key={category.id}>
                <div 
                  onClick={() => handleCategoryClick(category.id)}
                  className="flex flex-col py-4 items-center gap-4 group cursor-pointer"
                >
                  <div className={`aspect-square w-36 h-36 rounded-full border overflow-hidden shadow-sm flex items-center justify-center transition-all duration-300 relative ${
                    isActive 
                      ? "border-[#C67C4E] bg-[#F5EFE6] text-[#C67C4E] scale-105" 
                      : "border-stone-200/50 bg-[#FAF7F2] text-stone-600 hover:bg-[#F5EFE6] hover:scale-105"
                  }`}>
                    {category.image ? (
                      <Image
                        src={getImageUrl(category.image)}
                        alt={category.name}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <Coffee className="w-14 h-14" />
                    )}
                  </div>
                  <h3 className={`text-center font-bold font-playfair text-lg transition-colors duration-300 ${
                    isActive ? "text-[#C67C4E]" : "text-stone-800 group-hover:text-[#C67C4E]"
                  }`}>
                    {category.name}
                  </h3>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </section>
  );
};
