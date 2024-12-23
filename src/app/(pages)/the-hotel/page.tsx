"use client";
import TitleNormal from "@/app/_components/contentTitle/TitleNormal";
import HeroImage from "@/app/_components/HeroImage";
import SplideImage from "@/app/_components/SplideImage";
import React from "react";
import data from "@/app/data.json";
import TitleXL from "@/app/_components/contentTitle/TitleXL";
import ThumbnailImage from "@/app/_components/ThumbnailImage";
import TheHotelList from "./TheHotelList";

const pages = () => {
  const { images } = data;
  return (
    <>
      <HeroImage
        image="https://aguasdeibiza.com/wp-content/uploads/2019/09/Aguasdeibiza-2019-132-PISCINA-ALTA.jpg"
        title="Aguas de Ibiza: The gate of Ibiza sea spirit"
        linkContext="Discover more"
        link="#theHotel"
      />
      <div className="pd-medium" />
      <TitleNormal title="Introducing Aguas the Ibiza. A dream made true on Santa Eulalia." />
      <div className="pd-medium" />
      <SplideImage images={images} splideClass="theHotel" />
      <div className="pd-high" />
      <TitleXL
        title="Aguas de Ibiza is the entrance to an island vacation full of light, design, sun, views, and comfort in every one of its magnificent Feng Shui inspired rooms."
        links={[{ href: "#!", content: "Discover our rooms" }]}
      />
      <div className="pd-high" />
      <ThumbnailImage
        image="https://aguasdeibiza.com/wp-content/uploads/2019/09/Aguasdeibiza-2019-101-HABITACIONES-ALTA.jpg"
        title="thumbnail the hotel"
      />
      <div className="pd-medium" />
      <TheHotelList />
      <div className="pd-medium" />
      <ThumbnailImage
        image="https://aguasdeibiza.com/wp-content/uploads/2019/09/Aguasdeibiza-2019-128-PISCINA-ALTA.jpg"
        title="thumbnail the hotel 2"
      />
    </>
  );
};

export default pages;
