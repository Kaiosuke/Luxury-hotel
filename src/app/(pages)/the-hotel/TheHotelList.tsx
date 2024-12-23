import React from "react";
import data from "@/app/data.json";
import MotionWrapper from "@/app/_components/MotionWrapper";

const TheHotelList = () => {
  const { theHotels } = data;
  return (
    <section id="theHotel" className="text-third padding-main">
      {theHotels.map((hotel) => (
        <div key={hotel.id}>
          <div
            className={`flex items-center lg:gap-32 gap-20 md:flex-row flex-col ${
              hotel.id % 2 === 0 ? "md:flex-row-reverse" : ""
            }`}
          >
            <MotionWrapper className="flex-[1_0_auto] md:max-w-[50%] maw-w-[100%]">
              <img
                src={hotel.thumbnail}
                alt={hotel.title}
                className="w-full h-full object-cover aspect-[3/4]"
              />
            </MotionWrapper>
            <MotionWrapper className="flex-[1_0_auto] md:max-w-[40%] maw-w-[100%]">
              <h2 className="text-size-6xl my-10">{hotel.title}</h2>
              {hotel.description.map((des, index) => (
                <div key={index}>
                  <p className="text-size-xl">{des}</p>
                </div>
              ))}
            </MotionWrapper>
          </div>
          <div className="pd-high" />
        </div>
      ))}
    </section>
  );
};

export default TheHotelList;
