"use client";
import BookingHero from "./BookingHero";
import BookingList from "./BookingList";

const page = () => {
  return (
    <>
      <BookingHero />
      <BookingList />
      <div className="pd-medium" />
    </>
  );
};

export default page;
