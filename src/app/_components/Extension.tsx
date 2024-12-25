import React from "react";
import MotionWrapper from "./MotionWrapper";
import { GiIsland, GiPriceTag } from "react-icons/gi";
import { FaRegStar } from "react-icons/fa";

const Extension = () => {
  return (
    <MotionWrapper className="border rounded-lg p-4 bg-secondary">
      <div className="line-1 bg-primary" />

      <h2 className="text-size-2xl font-medium">
        Book Direct with Aguas de Ibiza Grand Luxe Hotel and receive:
      </h2>

      <ul className="mt-4 flex flex-col gap-6 text-primary">
        <li className="flex gap-2 items-center ">
          <GiPriceTag className="text-size-2xl" />
          <span className="text-size-xl">Best rate guaranteed</span>
        </li>
        <li className="flex gap-2 items-center ">
          <GiIsland className="text-size-2xl" />
          <span className="text-size-xl">Most relaxing</span>
        </li>
        <li className="flex gap-2 items-center ">
          <FaRegStar className="text-size-2xl" />
          <span className="text-size-xl">Most luxurious</span>
        </li>
      </ul>
    </MotionWrapper>
  );
};

export default Extension;
