import { AspectRatio } from "@/components/ui/aspect-ratio";
import { IRoom } from "@/interfaces";
import Image from "next/image";
import React from "react";

const CartList = ({ room }: { room: IRoom }) => {
  return (
    <div className="border border-secondary rounded-lg p-4 text-third">
      <div className="flex md:flex-row flex-col gap-4 items-start">
        <div className="flex-[1_0_auto] lg:max-w-[30%] sm:w-[320px] w-[100%]">
          <AspectRatio ratio={16 / 9} className="bg-muted">
            <Image
              src={room.thumbnail}
              alt={room.title}
              fill
              className="h-full w-full rounded-md object-cover"
            />
          </AspectRatio>
        </div>
        <div className="flex-[1_0_auto] md:max-w-[70%] max-w-[100%]">
          <div className="flex lg:flex-row flex-col justify-between">
            <div>
              <h3 className="text-size-lg font-medium">{room.title}</h3>
              {room.types
                ?.filter((type) => type.idType === "type1")
                .map((type) => (
                  <div key={type.idType} className="flex flex-col mt-1">
                    <div>{type.typeName}</div>
                    <span>${type.price} average per night</span>
                    <span>Thu, May 1 - Sun, May 25 </span>
                    <span>1 Adult</span>
                  </div>
                ))}

              <div className="gap-2 mt-6 lg:flex hidden">
                <span className="underline cursor-pointer hover:text-secondary animation-fast underline-offset-2">
                  Remove
                </span>
                <span className="underline cursor-pointer hover:text-secondary animation-fast underline-offset-2">
                  Add coupon
                </span>
              </div>
            </div>
            <div className="lg:mt-0 mt-4">
              <span className="text-size-lg font-bold ">$6,101.69</span>
              <div>Including taxes and fees </div>
            </div>
            <div className="gap-2 mt-4 lg:hidden flex">
              <span className="underline cursor-pointer hover:text-secondary animation-fast underline-offset-2">
                Remove
              </span>
              <span className="underline cursor-pointer hover:text-secondary animation-fast underline-offset-2">
                Add coupon
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartList;
