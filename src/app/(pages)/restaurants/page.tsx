"use client";
import TitleNormal from "@/app/_components/contentTitle/TitleNormal";
import HeroImage from "@/app/_components/HeroImage";
import SplideImage from "@/app/_components/SplideImage";
import ThumbnailImage from "@/app/_components/ThumbnailImage";
import data from "@/app/data.json";
import RestaurantList from "./RestaurantList";

const page = () => {
  const { images } = data;
  return (
    <>
      <HeroImage
        image="https://aguasdeibiza.com/wp-content/uploads/2019/09/Aguasdeibiza-2019-285-MAYMANTA-ALTA.jpg"
        title="A modern culinary tour to the best of Ibiza flavours"
        link="#restaurants"
        linkContext="Discover more"
      />
      <div className="pd-high" />
      <TitleNormal title="Aguas de Ibiza luxury restaurants offer a signature cuisine with a strong essence of our much admired Mediterranean cuisine." />
      <div className="pd-high" />
      <section id="restaurants" className="text-third padding-main">
        <SplideImage images={images} splideClass="restaurants" />
      </section>
      <div className="pd-medium" />
      <RestaurantList />
      <ThumbnailImage
        image="https://aguasdeibiza.com/wp-content/uploads/2019/09/Aguasdeibiza-2019-225-MAYMANTA-ALTA.jpg"
        title="Food"
      />
    </>
  );
};

export default page;
