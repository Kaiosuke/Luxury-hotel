import BookingCalendar from "@/app/_components/BookingCalendar";
import React from "react";
import BookingFilter from "./BookingFilter";
import BookingRooms from "./BookingRooms";
import { GiIsland, GiPriceTag } from "react-icons/gi";
import { FaRegStar } from "react-icons/fa6";
import MotionWrapper from "@/app/_components/MotionWrapper";

const BookingList = () => {
  return (
    <section className="text-third padding-main min-h-screen">
      <div className="flex gap-6">
        <div className="flex-[1_0_auto] lg:max-w-[70%] max-w-[100%] gap-10">
          <MotionWrapper>
            <BookingCalendar isShow />
            <h1 className="text-size-5xl mt-20 mb-10">Select Next Room</h1>
          </MotionWrapper>
          <BookingFilter />
          <BookingRooms />
        </div>
        <MotionWrapper className="flex-[1_0_auto] max-w-[30%] lg:block hidden ">
          <div className="sticky top-32">
            <div className="border rounded-lg p-4 bg-secondary">
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
            </div>
          </div>
        </MotionWrapper>
      </div>
    </section>
  );
};

export default BookingList;
