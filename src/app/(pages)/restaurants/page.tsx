"use client";
import TitleNormal from "@/app/_components/contentTitle/TitleNormal";
import HeroImage from "@/app/_components/HeroImage";
import React from "react";
import RestaurantsSplide from "./RestaurantsSplide";
import RestaurantList from "./RestaurantList";
import MotionWrapper from "@/app/_components/MotionWrapper";
import { ParallaxBanner } from "react-scroll-parallax";

const Restaurants = () => {
  return (
    <>
      <HeroImage
        image="https://aguasdeibiza.com/wp-content/uploads/2019/09/Aguasdeibiza-2019-285-MAYMANTA-ALTA.jpg"
        title="A modern culinary tour to the best of Ibiza flavours"
        linkContext="Discover more"
      />
      <div className="pd-high" />
      <TitleNormal title="Aguas de Ibiza luxury restaurants offer a signature cuisine with a strong essence of our much admired Mediterranean cuisine." />
      <div className="pd-high" />
      <RestaurantsSplide />
      <div className="pd-medium" />
      <RestaurantList />
      <div className="overlay">
        <ParallaxBanner
          layers={[
            {
              image:
                "https://aguasdeibiza.com/wp-content/uploads/2019/09/Aguasdeibiza-2019-225-MAYMANTA-ALTA.jpg",
              speed: -20,
            },
          ]}
          className="aspect-[16/9]"
        />
      </div>
    </>
  );
};

export default Restaurants;
