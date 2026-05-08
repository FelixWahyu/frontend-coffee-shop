"use client";

import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import ProductImg from "@/src/app/asset/image/expresso.jpg";
import Image from "next/image";
import { Category } from "../types/categories";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { Swiper as SwiperType } from "swiper";

export const CategoriesSliders = ({ categories }: { categories: Category[] }) => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  if (categories.length === 0) {
    return (
      <div className="my-6">
        <p className="text-gray-500 font-semibold font-lato">Data category belum tersedia.</p>
      </div>
    );
  }

  return (
    <section className="mt-16 px-6">
      <div className="container mx-auto relative">
        <button ref={prevRef} className="absolute left-0 top-1/2 z-10 -translate-y-1/2 bg-white/80 backdrop-blur-md shadow-md rounded-full p-3 hover:scale-105 transition">
          <ArrowLeft size={20} />
        </button>
        <button ref={nextRef} className="absolute right-0 top-1/2 z-10 -translate-y-1/2 bg-white/80 backdrop-blur-md shadow-md rounded-full p-3 hover:scale-105 transition">
          <ArrowRight size={20} />
        </button>

        <Swiper
          modules={[Navigation, Autoplay]}
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
          loop={categories.length > 5}
          grabCursor={true}
          slidesPerView={2}
          spaceBetween={20}
          breakpoints={{
            640: {
              slidesPerView: 3,
            },
            768: {
              slidesPerView: 4,
            },
            1024: {
              slidesPerView: 5,
            },
          }}
        >
          {categories.map((category) => (
            <SwiperSlide key={category.id}>
              <div className="flex flex-col items-center gap-4 group cursor-pointer">
                <div className="aspect-square overflow-hidden relative w-36 h-36 rounded-full">
                  <Image src={ProductImg} alt={category.name} fill className="object-cover group-hover:scale-105 transition-transform duration-300 opacity-100 group-hover:opacity-80" />
                </div>
                <h3 className="text-center font-semibold font-playfair text-lg">{category.name}</h3>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};
