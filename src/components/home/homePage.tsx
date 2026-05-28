"use client";

import HeroSection from "@/components/sections/home/SectionHero";
import ReviewSection from "@/components/sections/home/SectionReviews";
import FeaturesSection from "@/components/sections/home/SectionFeatures";
import WhyUsSection from "@/components/sections/home/SectionWhyUs";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <WhyUsSection />
      <ReviewSection />
    </>
  );
}
