"use client";
import TitleNormal from "@/app/_components/contentTitle/TitleNormal";
import TitleXL from "@/app/_components/contentTitle/TitleXL";
import HeroImage from "@/app/_components/HeroImage";
import SplideImage from "@/app/_components/SplideImage";
import data from "@/app/data.json";
import RoomList from "./RoomList";

const Rooms = () => {
  const { images } = data;
  return (
    <>
      <HeroImage
        image="https://images.unsplash.com/photo-1614505241498-80a3ec936595?q=80&w=2111&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        title="Luxurious rooms filled with Mediterranean light"
        linkContext="Book your stay now"
        link="#rooms"
      />
      <div className="pd-high" />
      <section id="rooms" className="text-black padding-main">
        <SplideImage
          images={images}
          title="roomSection"
          splideClass="roomSection"
        />
      </section>
      <div className="pd-high" />
      <TitleXL title="Full of light and overlooking the Mediterranean" />
      <div className="pd-high" />
      <RoomList />
      <div className="pd-high" />
      <TitleNormal title="Our surroundings affect energetic, physical and mental balance, which is why at Aguas de Ibiza all the architectural elements and all the furniture are arranged seeking harmony in the space. The seashell on the ceiling is a characteristic feature of our rooms. According to Feng Shui, a seashell above the bed eliminates bad energy." />
      <div className="pd-high" />
    </>
  );
};

export default Rooms;
