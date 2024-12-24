"use client";
import TitleNormal from "@/app/_components/contentTitle/TitleNormal";
import HeroImage from "@/app/_components/HeroImage";
import SplideList from "@/app/_components/SplideList";
import ThumbnailImage from "@/app/_components/ThumbnailImage";
import data from "@/app/data.json";
import { IRoom } from "@/interfaces";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import RoomDetail from "./RoomDetail";

const page = () => {
  const { id } = useParams();
  const { rooms } = data;
  const [currentRoom, setCurrentRoom] = useState<IRoom | null>(null);

  useEffect(() => {
    if (id) {
      const room = rooms.find((room) => room.id === +id) || null;
      setCurrentRoom(room);
    }
  }, []);

  if (!currentRoom) {
    return <div className="text-center">Loading</div>;
  }

  return (
    <>
      <HeroImage
        image={currentRoom.thumbnail}
        title={`${currentRoom.title} - Soulful Mediterranean style`}
        linkContext="Book this room now"
        link="#!"
      />
      <div className="pd-high" />
      <RoomDetail room={currentRoom} />
      <div className="pd-medium" />
      <ThumbnailImage image={currentRoom.map} title={currentRoom.title} />
      <div className="pd-high" />
      <TitleNormal title="We have many other luxury rooms for you." />
      <div className="pd-medium" />
      <section className="padding-main">
        <SplideList
          dataList={rooms}
          id={currentRoom.id}
          splideClass="roomList"
        />
      </section>
      <div className="pd-high" />
    </>
  );
};
export default page;
