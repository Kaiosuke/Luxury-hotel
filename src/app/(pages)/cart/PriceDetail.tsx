import { IRoom } from "@/interfaces";
import React from "react";

const PriceDetail = ({ room, index }: { room: IRoom; index: number }) => {
  return (
    <div className="border border-secondary rounded-lg p-4 text-third">
      <h4 className="text-size-lg">ROOM {index}</h4>
      <h3 className="text-size-lg font-medium">{room.title}</h3>
      <div className="flex justify-between mt-4">
        {room.types
          ?.filter((type) => type.idType === "type2")
          .map((type) => (
            <div
              key={type.idType}
              className="text-base lg:flex-[0_0_auto] lg:max-w-[60%]"
            >
              {type.typeName}
            </div>
          ))}
        <span className="text-size-lg font-bold">$6,101.69</span>
      </div>
      <span className="underline underline-offset-2 animation-fast cursor-pointer hover:text-secondary text-base">
        23 Nights stay
      </span>
      <div className="flex justify-between mt-4 text-base">
        <span>Taxes and fees</span>
        <span className="text-size-lg font-bold">$0</span>
      </div>
      <div className="flex flex-col text-base">
        <span>Thu, May 1, 2025 - Sun, May 25, 2025</span>
        <span>1 Adult</span>
      </div>
    </div>
  );
};

export default PriceDetail;
