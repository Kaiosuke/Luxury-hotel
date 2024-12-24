"use client";
import TitleNormal from "@/app/_components/contentTitle/TitleNormal";
import TitleXL from "@/app/_components/contentTitle/TitleXL";
import HeroImage from "@/app/_components/HeroImage";
import ThumbnailImage from "@/app/_components/ThumbnailImage";
import Link from "next/link";
import Album from "./Album";
import Luxury from "./Luxury";
import Offers from "./Offers";
import Restaurants from "./Restaurants";
import Rooms from "./Rooms";
import SpaWellnessSection from "./SpaWellness";
import MotionWrapper from "@/app/_components/MotionWrapper";

const Home = () => {
  return (
    <>
      <HeroImage
        image="//aguasdeibiza.com/wp-content/uploads/2019/01/aguasdeibiza-404.jpg"
        title="Slip your body and mind
            into the spirit of Ibiza."
        linkContext=" A Five Star Grand Luxe Hotel to get inspired"
        link="#spaWellnes"
      />
      <div className="pd-high" />
      <SpaWellnessSection />
      <div className="pd-medium" />
      <div className="pd-medium" />
      <TitleNormal
        title="This is the gate of Mediterranean spirit. A new hospitality concept
          where inspiration and privacy come as the luxury of staying by the
          luminous sea at the vibrant Santa Eulalia."
      />
      <div className="pd-medium" />
      <div className="pd-medium" />
      <Rooms />
      <div className="pd-high" />
      <TitleXL
        title="Soulful Mediterranean style featuring sleek and modern design full of
          Ibiza magic light"
        links={[{ href: "#!", content: "View all our rooms" }]}
      />
      <div className="pd-high" />
      <div className="pd-medium" />
      <Restaurants />
      <div className="pd-medium" />
      <div className="pd-medium" />
      <TitleNormal
        title="Everything you need to live an unforgettable eco-luxury experience of
          health and well-being in the new gate to Mediterranean soul."
      />
      <div className="pd-medium" />
      <div className="pd-medium" />
      <Luxury />
      <div className="pd-medium" />
      <div className="pd-medium" />
      <MotionWrapper>
        <div className="text-center">
          <Link href="#!" className="text-size-4xl underline">
            Navigate the joys of staying at Aguas de Ibiza
          </Link>
        </div>
      </MotionWrapper>
      <div className="pd-medium" />
      <div className="pd-medium" />
      <div className="pd-high" />
      <TitleXL
        title="Enjoy and join the handful of guests who already sent their best photographic memories of their stay."
        links={[
          { href: "#!", content: "FaceBook" },
          { href: "#!", content: "Instagram" },
          { href: "#!", content: "#homeFantasy" },
        ]}
      />
      <div className="pd-high" />
      <Album />
      <div className="pd-medium" />
      <div className="pd-medium" />
      <TitleNormal title="Aguas de Ibiza represents a new concept in hospitality. Water, light and textures come together at this hotel in Santa Eulalia in Ibiza. Here you will find all you need to experience an unforgettable holiday." />
      <div className="pd-medium" />
      <div className="pd-medium" />
      <Offers />
      <div className="pd-medium" />
      <ThumbnailImage
        image="https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        title="Beach"
        link="#!"
        linkContent="See all offers"
      />
    </>
  );
};

export default Home;
