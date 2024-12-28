"use client";

import Link from "next/link";

import { FaArrowDownLong } from "react-icons/fa6";
import { BannerLayer, ParallaxBanner } from "react-scroll-parallax";
import BookingCalendar from "./BookingCalendar";

interface IHeroImage {
  isBook?: boolean;
  image: string;
  title: string;
  linkContext: string;
  link?: string;
}

const HeroImage = ({ image, title, linkContext, link, isBook }: IHeroImage) => {
  const background: BannerLayer = {
    image: image,
    translateY: [0, 0],
    opacity: [1, 0.3],
    className: "overlay",
    scale: [1.05, 1, "easeOutCubic"],
    shouldAlwaysCompleteAnimation: true,
  };

  const headline: BannerLayer = {
    translateY: [0, 0],
    scale: [1, 1.05, "easeOutCubic"],
    shouldAlwaysCompleteAnimation: true,
    expanded: false,
    children: (
      <div className="absolute inset-0">
        <div className="absolute lg:bottom-[140px] bottom-[80px] padding-main">
          <h1 className="text-size-7xl max-w-[90%] lg:max-w-[60%] break-words bg-animate">
            {title}
          </h1>
          <Link
            href={link ? link : "#!"}
            className="text-base mt-6 md:text-lg flex items-center gap-4"
          >
            {linkContext}
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
        {!isBook && <BookingCalendar color="text-primary" />}
      </div>
    </section>
  );
};

export default HeroImage;
