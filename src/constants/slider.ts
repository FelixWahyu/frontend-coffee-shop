import type { SwiperOptions } from "swiper/types";

interface BreakPoint {
  width: number;
  slidesPerView: number;
}

interface GetSliderAtributesProps {
  timer?: number;
  breakpoints?: BreakPoint[];
}

export default function getSliderAtributes({ timer = 3000, breakpoints = [] }: GetSliderAtributesProps) {
  const swiperAutoPlay = {
    delay: timer,
    disableOnInteraction: false,
  };

  const swiperPagination = {
    clickable: true,
    dynamicBullets: true,
  };

  const swiperBreakPoints = breakpoints.reduce(
    (acc, item) => {
      acc[item.width] = {
        slidesPerView: item.slidesPerView,
      };
      return acc;
    },
    {} as Record<number, SwiperOptions>,
  );

  return {
    swiperAutoPlay,
    swiperPagination,
    swiperBreakPoints,
  };
}
