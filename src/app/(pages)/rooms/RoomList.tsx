import data from "@/app/data.json";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import MotionWrapper from "@/app/_components/MotionWrapper";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const RoomList = () => {
  const { rooms } = data;
  const [selectID, setSelectID] = useState(1);
  const [position, setPosition] = useState("Dreamer");

  return (
    <section id="restaurants" className="text-third padding-main relative">
      <MotionWrapper>
        <div className="bg-secondary w-fit lg:hidden block">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="md:text-2xl text-xl">
                {position}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 bg-secondary">
              <DropdownMenuSeparator />
              <DropdownMenuRadioGroup
                value={position}
                onValueChange={setPosition}
              >
                {rooms.map((room) => (
                  <DropdownMenuRadioItem
                    value={room.title}
                    key={room.id}
                    onClick={() => setSelectID(room.id)}
                    className="text-white hover:text-third cursor-pointer text-xl"
                  >
                    {room.title}
                  </DropdownMenuRadioItem>
                ))}
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </MotionWrapper>
      <section className="flex justify-between lg:mt-0 mt-4">
        <div className="max-w-[30%] w-full lg:block hidden">
          <ul className="flex flex-col gap-10">
            {rooms.map((room) => (
              <li
                key={room.id}
                className={`text-size-4xl cursor-pointer ${
                  room.id === selectID ? "text-third" : "opacity-25"
                }`}
                onClick={() => setSelectID(room.id)}
              >
                <MotionWrapper>
                  <div>{room.title}</div>
                </MotionWrapper>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex-[1_0_auto] lg:max-w-[60%] max-w-[100%]">
          {rooms
            .filter((room) => room.id === selectID)
            .map((room) => (
              <div key={room.id} className="rb-modal-animate">
                <MotionWrapper>
                  <AspectRatio ratio={16 / 9} className="bg-muted">
                    <Image
                      src={room.thumbnail}
                      alt={room.title}
                      fill
                      className="h-full w-full rounded-md object-cover"
                    />
                  </AspectRatio>
                </MotionWrapper>
                <MotionWrapper>
                  <div className="flex mt-10 gap-10 justify-between">
                    <div className="flex-[1_0_auto] md:max-w-[60%] max-w-[100%]">
                      <p className="text-size-lg">{room.description}</p>
                      <div className="flex gap-4 mt-10 flex-row">
                        <Link href={`rooms/${room.id}`}>
                          <Button variant={"third"}>View more</Button>
                        </Link>
                        <Link href="#!">
                          <Button variant={"secondary"}>Book Now</Button>
                        </Link>
                      </div>
                    </div>
                    <div className="flex-[1_0_auto] lg:max-w-[30%] max-w-[40%] md:block hidden">
                      <ul className="flex flex-col gap-4">
                        {room.quickDes.map((feature, index) => (
                          <li key={index}>{feature}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </MotionWrapper>
              </div>
            ))}
        </div>
      </section>
    </section>
  );
};

export default RoomList;
