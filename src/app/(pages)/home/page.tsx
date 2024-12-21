"use client";
import TitleNormal from "@/app/_components/contentTitle/TitleNormal";
import TitleXL from "@/app/_components/contentTitle/TitleXL";
import HeroImage from "@/app/_components/HeroImage";
import Link from "next/link";
import { ParallaxBanner } from "react-scroll-parallax";
import Album from "./Album";
import Luxury from "./Luxury";
import Offers from "./Offers";
import Restaurants from "./Restaurants";
import Rooms from "./Rooms";
import SpaWellnessSection from "./SpaWellness";

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
      <div className="pd-high"></div>
      <SpaWellnessSection />
      <div className="pd-medium"></div>
      <div className="pd-medium"></div>
      <TitleNormal
        title="This is the gate of Mediterranean spirit. A new hospitality concept
          where inspiration and privacy come as the luxury of staying by the
          luminous sea at the vibrant Santa Eulalia."
      />
      <div className="pd-medium"></div>
      <div className="pd-medium"></div>
      <Rooms />
      <div className="pd-high"></div>
      <TitleXL
        title="Soulful Mediterranean style featuring sleek and modern design full of
          Ibiza magic light"
        links={[{ href: "#!", content: "View all our rooms" }]}
      />
      <div className="pd-high"></div>
      <div className="pd-medium"></div>
      <Restaurants />
      <div className="pd-medium"></div>
      <div className="pd-medium"></div>
      <TitleNormal
        title="Everything you need to live an unforgettable eco-luxury experience of
          health and well-being in the new gate to Mediterranean soul."
      />
      <div className="pd-medium"></div>
      <div className="pd-medium"></div>
      <Luxury />
      <div className="pd-medium"></div>
      <div className="pd-medium"></div>
      <div className="text-center">
        <Link href="#!" className="text-size-4xl underline">
          Navigate the joys of staying at Aguas de Ibiza
        </Link>
      </div>
      <div className="pd-medium"></div>
      <div className="pd-medium"></div>
      <div className="pd-high"></div>
      <TitleXL
        title="Enjoy and join the handful of guests who already sent their best photographic memories of their stay."
        links={[
          { href: "#!", content: "FaceBook" },
          { href: "#!", content: "Instagram" },
          { href: "#!", content: "#homeFantasy" },
        ]}
      />
      <div className="pd-high"></div>
      <Album />
      <div className="pd-medium"></div>
      <div className="pd-medium"></div>
      <TitleNormal title="Aguas de Ibiza represents a new concept in hospitality. Water, light and textures come together at this hotel in Santa Eulalia in Ibiza. Here you will find all you need to experience an unforgettable holiday." />
      <div className="pd-medium"></div>
      <div className="pd-medium"></div>
      <Offers />
      <div className="pd-medium"></div>
      <div className="relative overlay">
        <ParallaxBanner
          layers={[
            {
              children: (
                <img
                  src="https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Relaxing spa view"
                  className="w-full h-[full] object-cover"
                />
              ),
              speed: -30,
            },
            {
              image:
                "https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
              speed: -30,
            },
          ]}
          className="aspect-[16/9]"
        />
        <div className="absolute inset-0 flex items-center justify-center z-[10]">
          <Link href="#!" className="text-size-4xl underline text-white">
            See all offers
          </Link>
        </div>
      </div>
      <div className="pd-medium"></div>
    </>
  );
};

export default Home;