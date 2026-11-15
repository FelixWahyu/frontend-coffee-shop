import { useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import type { Swiper as SwiperType } from "swiper";
import getSliderAtributes from "@/constants/slider";
import { Category } from "@/types/categories";

export function useCategorySlider(categories: Category[]) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedCategory = searchParams.get("category");

  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

  const handleCategoryClick = (categoryId: number) => {
    const params = new URLSearchParams(searchParams.toString());
    if (params.get("category") === categoryId.toString()) {
      params.delete("category");
    } else {
      params.set("category", categoryId.toString());
    }
    router.push(`/products?${params.toString()}`, { scroll: false });
  };

  const handleResetCategory = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("category");
    router.push(`/products?${params.toString()}`, { scroll: false });
  };

  const onBeforeInit = (swiper: SwiperType) => {
    if (typeof swiper.params.navigation !== "boolean" && swiper.params.navigation) {
      swiper.params.navigation.prevEl = prevRef.current;
      swiper.params.navigation.nextEl = nextRef.current;
    }
  };

  const { swiperBreakPoints } = getSliderAtributes({
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

  const isLoop = (categories.length + 1) > 5;

  return {
    selectedCategory,
    prevRef,
    nextRef,
    handleCategoryClick,
    handleResetCategory,
    onBeforeInit,
    swiperBreakPoints,
    isLoop,
  };
}

export default useCategorySlider;
