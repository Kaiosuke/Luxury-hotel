"use client";
import HeroImage from "@/app/_components/HeroImage";
import React from "react";
import RoomList from "./RoomList";
import TitleXL from "@/app/_components/contentTitle/TitleXL";
import RoomImages from "./RoomImages";
import TitleNormal from "@/app/_components/contentTitle/TitleNormal";

const Rooms = () => {
  return (
    <>
      <HeroImage
        image="https://images.unsplash.com/photo-1614505241498-80a3ec936595?q=80&w=2111&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        title="Luxurious rooms filled with Mediterranean light"
        linkContext="Book your stay now"
      />
      <div className="pd-high"></div>
      <RoomList />
      <div className="pd-high"></div>
      <TitleXL title="Full of light and overlooking the Mediterranean" />
      <div className="pd-high"></div>
      <RoomImages />
      <div className="pd-high"></div>
      <TitleNormal title="Our surroundings affect energetic, physical and mental balance, which is why at Aguas de Ibiza all the architectural elements and all the furniture are arranged seeking harmony in the space. The seashell on the ceiling is a characteristic feature of our rooms. According to Feng Shui, a seashell above the bed eliminates bad energy." />
      <div className="pd-high"></div>
    </>
  );
};

export default Rooms;
