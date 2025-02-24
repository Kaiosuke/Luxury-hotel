import MotionWrapper from "@/app/_components/MotionWrapper";
import { IRoomType } from "@/interfaces";
import React from "react";

interface IRoomTitlePc {
  room: IRoomType;
  selectID: string;
  setSelectID: (value: string) => void;
}

const RoomTitlePc = ({ room, selectID, setSelectID }: IRoomTitlePc) => {
  return (
    <li
      className={`text-size-4xl cursor-pointer ${
        room._id === selectID ? "text-third" : "opacity-50"
      }`}
      onClick={() => setSelectID(room._id)}
    >
      <MotionWrapper>
        <div>{room.title}</div>
      </MotionWrapper>
    </li>
  );
};

export default RoomTitlePc;
