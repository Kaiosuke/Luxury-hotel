import { Button } from "@/components/ui/button";
import { useState } from "react";

import MotionWrapper from "@/app/_components/MotionWrapper";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { roomTypesSelector } from "@/redux/selectors/roomTypesSelector";
import { useSelector } from "react-redux";
import RoomList from "./RoomList";
import RoomTitleMb from "./RoomTitleMb";
import RoomTitlePc from "./RoomTitlePc";

const Rooms = () => {
  const [selectID, setSelectID] = useState("67b863a717957bde26aafc03");
  const [position, setPosition] = useState("Dreamer");

  const { roomTypes } = useSelector(roomTypesSelector);

  return (
    <section id="restaurants" className="text-third padding-main relative">
      <MotionWrapper>
        <div className="bg-secondary w-fit lg:hidden block">
          <DropdownMenu>
            <DropdownMenuTrigger className="border-none" asChild>
              <Button variant="secondary" className="md:text-2xl text-xl">
                {position}
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="w-56 bg-secondary">
              <DropdownMenuRadioGroup
                value={position}
                onValueChange={setPosition}
              >
                {roomTypes.length &&
                  roomTypes.map((room) => (
                    <RoomTitleMb
                      key={room._id}
                      room={room}
                      setSelectID={setSelectID}
                    />
                  ))}
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </MotionWrapper>
      <section className="flex justify-between lg:mt-0 mt-4">
        <div className="max-w-[30%] w-full lg:block hidden">
          <ul className="flex flex-col gap-10">
            {roomTypes.length &&
              roomTypes.map((room, index) => (
                <RoomTitlePc
                  key={index}
                  room={room}
                  selectID={selectID}
                  setSelectID={setSelectID}
                />
              ))}
          </ul>
        </div>
        <div className="flex-[1_0_auto] lg:max-w-[60%] max-w-[100%]">
          {roomTypes &&
            roomTypes
              .filter((room) => room._id === selectID)
              .map((room) => <RoomList key={room._id} room={room} />)}
        </div>
      </section>
    </section>
  );
};

export default Rooms;
