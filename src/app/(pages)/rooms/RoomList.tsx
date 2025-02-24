import MotionWrapper from "@/app/_components/MotionWrapper";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { IRoomType } from "@/interfaces";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface IRoomList {
  room: IRoomType;
}

const RoomList = ({ room }: IRoomList) => {
  return (
    <div className="rb-modal-animate">
      <MotionWrapper>
        <AspectRatio ratio={16 / 9} className="bg-muted">
          <Image
            src={room.thumbnail}
            alt={room.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="h-full w-full rounded-md object-cover"
          />
        </AspectRatio>
      </MotionWrapper>
      <MotionWrapper>
        <div className="flex mt-10 gap-10 justify-between">
          <div className="flex-[1_0_auto] md:max-w-[60%] max-w-[100%]">
            <p className="text-size-lg">{room.description}</p>
            <div className="flex gap-4 mt-10 flex-row">
              <Link href={`rooms/${room._id}`}>
                <Button variant={"third"}>View more</Button>
              </Link>
              <Link href="/booking">
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
  );
};

export default RoomList;
