import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import Image from "next/image";
import data from "@/app/data.json";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const RoomList = () => {
  const { rooms } = data;
  const [selectID, setSelectID] = useState(1);

  return (
    <section className="text-third padding-main relative">
      <section className="min-h-screen flex justify-between">
        <div className="max-w-[30%] w-full">
          <ul className="flex flex-col gap-10">
            {rooms.map((room) => (
              <li
                key={room.id}
                className={`text-size-4xl cursor-pointer ${
                  room.id === selectID ? "text-third" : "opacity-25"
                }`}
                onClick={() => setSelectID(room.id)}
              >
                {room.title}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex-[1_0_auto] lg:max-w-[60%] md:max-w-[70%]">
          {rooms
            .filter((room) => room.id === selectID)
            .map((room) => (
              <div key={room.id} className="rb-modal-animate">
                <AspectRatio ratio={16 / 9} className="bg-muted">
                  <Image
                    src={room.thumbnail}
                    alt={room.title}
                    fill
                    className="h-full w-full rounded-md object-cover"
                  />
                </AspectRatio>

                <div className="flex mt-10 gap-10 justify-between">
                  <div className="flex-[1_0_auto] max-w-[60%]">
                    <p className="text-size-lg">{room.description}</p>
                    <div className="flex gap-4 mt-10 md:flex-row flex-col">
                      <Link href="#!">
                        <Button variant={"outline"}>View more</Button>
                      </Link>
                      <Link href="#!">
                        <Button variant={"secondary"}>Book Now</Button>
                      </Link>
                    </div>
                  </div>
                  <div className="flex-[1_0_auto] lg:max-w-[30%] max-w-[40%]">
                    <ul className="flex flex-col gap-4">
                      {room.features.map((feature, index) => (
                        <li key={index}>{feature}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </section>

      <div className="pd-high"></div>
      <div className="pd-high"></div>
      <div className="pd-high"></div>
      <div className="pd-high"></div>
      <div className="pd-high"></div>
      <div className="pd-high"></div>

      <div className="pd-high"></div>
      <div className="pd-high"></div>
      <div className="pd-high"></div>
      <div className="pd-high"></div>
      <div className="pd-high"></div>
      <div className="pd-high"></div>
      <div className="pd-high"></div>
      <div className="pd-high"></div>
    </section>
  );
};

export default RoomList;
