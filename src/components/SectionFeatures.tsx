"use client";

import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import Image from "next/image";
import FeaturesImg from "@/src/app/asset/image/expresso.jpg";
import type { Swiper as SwiperType } from "swiper";
import { Category } from "../types/categories";

export default function FeaturesSection({ features }: { features: Category[] }) {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  if (features.length === 0) {
    return (
      <div className="m-6">
        <p className="text-gray-500 font-semibold font-lato">Data features belum tersedia.</p>
      </div>
    );
  }

  return (
    <section className="px-8 py-14 bg-[#E2D9C8] text-center">
      <div className="flex flex-col gap-3 mb-8">
        <h2 className="text-4xl font-playfair font-bold italic">Features</h2>
        <p className="text-lg font-medium font-lato">Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci, dolorem!</p>
      </div>

      <div className="container mx-auto">
        {features.length === 0 && (
          <div className="my-6">
            <p className="text-gray-500 font-semibold">Data Features belum di tambahkan.</p>
          </div>
        )}
        <Swiper
          className="features-swiper"
          modules={[Pagination, Autoplay]}
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
          loop={features.length > 4}
          grabCursor={true}
          slidesPerView={1}
          spaceBetween={20}
          breakpoints={{
            640: {
              slidesPerView: 2,
            },
            768: {
              slidesPerView: 3,
            },
            1024: {
              slidesPerView: 4,
            },
          }}
          pagination={{
            clickable: true,
            dynamicBullets: true,
          }}
        >
          {features.map((feature) => (
            <SwiperSlide key={feature.id}>
              <div className="flex flex-col h-full justify-center group bg-[#F1F0EE] border border-[#30261C]/15">
                <div className="mb-4 aspect-4/3 relative overflow-hidden">
                  <Image src={FeaturesImg} alt={feature.name} fill className="object-cover opacity-100 group-hover:opacity-80 group-hover:scale-105 transition-all duration-300" />
                </div>
                <div className="p-4 flex-1 flex-col justify-between">
                  <h3 className="text-xl font-semibold font-playfair mb-3">{feature.name}</h3>
                  <p className="text-md font-lato flex-1">{feature.description}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
