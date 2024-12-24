"use client";
import HeroImage from "@/app/_components/HeroImage";
import BookingList from "./BookingList";

const page = () => {
  return (
    <>
      <HeroImage
        image="//aguasdeibiza.com/wp-content/uploads/2019/01/aguasdeibiza-404.jpg"
        title=" Slip your body and mind into the spirit of Ibiza."
        link="#booking"
        linkContext="A Five Star Grand Luxe Hotel to get inspired"
        isBook={true}
      />
      <div className="pd-medium" />
      <BookingList />
      <div className="pd-medium" />
    </>
  );
};

export default page;
