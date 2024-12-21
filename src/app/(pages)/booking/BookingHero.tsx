"use client";

import Link from "next/link";

import { FaArrowDownLong } from "react-icons/fa6";
import { BannerLayer, ParallaxBanner } from "react-scroll-parallax";

const BookingHero = () => {
  const background: BannerLayer = {
    image: "//aguasdeibiza.com/wp-content/uploads/2019/01/aguasdeibiza-404.jpg",
    translateY: [0, 10],
    opacity: [1, 0.3],
    className: "overlay",
    scale: [1.05, 1, "easeOutCubic"],
    shouldAlwaysCompleteAnimation: true,
  };

  const headline: BannerLayer = {
    translateY: [0, 30],
    scale: [1, 1.05, "easeOutCubic"],
    shouldAlwaysCompleteAnimation: true,
    expanded: false,
    children: (
      <div className="absolute inset-0">
        <div className="absolute lg:bottom-[140px] bottom-[80px] padding-main">
          <h1 className="text-size-7xl max-w-[90%] lg:max-w-[60%] break-words bg-animate">
            Slip your body and mind into the spirit of Ibiza.
          </h1>
          <Link
            href={"#!"}
            className="text-base mt-6 md:text-lg flex items-center gap-4"
          >
            A Five Star Grand Luxe Hotel to get inspired
            <FaArrowDownLong />
          </Link>
        </div>
      </div>
    ),
  };

  return (
    <section className="text-primary">
      <div className="relative">
        <ParallaxBanner
          layers={[background, headline]}
          className="h-screen bg-gray-900"
        />
      </div>
    </section>
  );
};

export default BookingHero;
