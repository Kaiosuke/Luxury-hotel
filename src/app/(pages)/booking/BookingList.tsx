import BookingCalendar from "@/app/_components/BookingCalendar";
import React from "react";
import BookingFilter from "./BookingFilter";

const BookingList = () => {
  return (
    <section className="text-third padding-main">
      <div className="flex">
        <div className="flex-[1_0_auto] max-w-[60%]">
          <BookingCalendar isShow />
          <h1 className="text-size-5xl mt-20 mb-10">Select Next Room</h1>
          <BookingFilter />
        </div>
        <div className="flex-[1_0_auto] max-w-[30%]"> </div>
      </div>
    </section>
  );
};

export default BookingList;
