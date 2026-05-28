import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import FeaturesImg from "@/public/assets/image/expresso.jpg";
import type { Swiper as SwiperType } from "swiper";
import FeatureCard from "@/components/cards/FeatureCard";
import EdgeUi from "../../ui/edge-ui";
import LoadingSkeleton from "../../ui/loading";
import useFeatures from "@/hooks/featuresCategory/UseFeature";
import getSliderAtributes from "@/constants/slider";

export default function FeaturesSection() {
  const { categories, loading, prevRef, nextRef } = useFeatures();
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
      {
        width: 1024,
        slidesPerView: 4,
      },
    ],
  });

  if (loading) {
    return <LoadingSkeleton />;
  }

  return (
    <section className="px-8 py-14 bg-[#E2D9C8] text-center">
      <div className="flex flex-col gap-3 mb-8">
        <h2 className="text-4xl font-playfair font-bold italic">Features</h2>
        <p className="text-lg font-medium font-lato">Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci, dolorem!</p>
      </div>

      <div className="container mx-auto">
        {categories.length === 0 && <EdgeUi message="Data features belum ditambahkan." />}
        <Swiper
          className="features-swiper"
          modules={[Pagination, Autoplay]}
          autoplay={swiperAutoPlay}
          onBeforeInit={(swiper: SwiperType) => {
            if (typeof swiper.params.navigation !== "boolean" && swiper.params.navigation) {
              swiper.params.navigation.prevEl = prevRef.current;
              swiper.params.navigation.nextEl = nextRef.current;
            }
          }}
          loop={categories.length > 4}
          grabCursor={true}
          slidesPerView={1}
          spaceBetween={20}
          breakpoints={swiperBreakPoints}
          pagination={swiperPagination}
        >
          {categories.map((feature) => (
            <SwiperSlide key={feature.id}>
              <FeatureCard title={feature.name} description={feature.description} image={FeaturesImg} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
