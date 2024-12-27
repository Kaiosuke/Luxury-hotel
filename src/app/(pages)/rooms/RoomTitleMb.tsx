import { DropdownMenuRadioItem } from "@/components/ui/dropdown-menu";
import { IRoomTypes } from "@/interfaces";
import React from "react";

interface IRoomTitleMb {
  room: IRoomTypes;
  setSelectID: (value: string) => void;
}

const RoomTitleMb = ({ room, setSelectID }: IRoomTitleMb) => {
  return (
    <DropdownMenuRadioItem
      value={room.title}
      onClick={() => setSelectID(room.id)}
      className="text-white hover:text-third cursor-pointer text-xl"
    >
      {room.title}
    </DropdownMenuRadioItem>
  );
};

export default RoomTitleMb;
