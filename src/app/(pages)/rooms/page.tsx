"use client";
import HeroImage from "@/app/_components/HeroImage";
import React from "react";
import RoomList from "./RoomList";

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
    </>
  );
};

export default Rooms;
