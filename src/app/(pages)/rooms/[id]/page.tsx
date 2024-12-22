"use client";
import HeroImage from "@/app/_components/HeroImage";
import data from "@/app/data.json";
import { IRooms } from "@/interfaces";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import RoomDetail from "./RoomDetail";
import SplideList from "@/app/_components/SplideList";

const page = () => {
  const { id } = useParams();
  const { rooms } = data;
  const [currentRoom, setCurrentRoom] = useState<IRooms | null>(rooms[1]);

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
      <div className="pd-high" />

      <SplideList dataList={rooms} />
    </>
  );
};
export default page;
