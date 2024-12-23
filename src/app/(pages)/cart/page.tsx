import HeroImage from "@/app/_components/HeroImage";
import React from "react";
import data from "@/app/data.json";
import CartList from "./CartList";
import PriceDetail from "./PriceDetail";
import { Button } from "@/components/ui/button";

const page = () => {
  const { rooms } = data;
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
      <section className="padding-main">
        <div className="flex lg:flex-row flex-col gap-4">
          <div className="flex-[1_0_auto] lg:max-w-[70%] p-4 max-w-[100%]">
            <h2 className="text-size-3xl">YourCart: 2 Items</h2>
            <div className="flex flex-col gap-4 mt-4">
              {rooms.map((room) => (
                <CartList key={room.id} room={room} />
              ))}
            </div>
          </div>
          <div className="lg:max-w-[30%] max-w-[100%] p-4 border border-secondary rounded-lg">
            <h2 className="text-size-3xl">Price Details</h2>
            <div className="flex flex-col gap-4 mt-4">
              {rooms.map((room, index) => (
                <PriceDetail key={room.id} room={room} index={index + 1} />
              ))}
            </div>
            <div className="mt-4 flex justify-between">
              <div>
                <div className="text-size-2xl font-medium">Total</div>
                <div>Including taxes and fees</div>
              </div>
              <span className="text-size-xl font-bold ">$26,101.69</span>
            </div>
            <div className="mt-4 w-full">
              <Button variant={"secondary"} className="w-full">
                Add Room 7
              </Button>
              <Button variant={"third"} className="w-full mt-2">
                Checkout
              </Button>
            </div>
          </div>
        </div>
      </section>
      <div className="pd-medium" />
    </>
  );
};

export default page;
