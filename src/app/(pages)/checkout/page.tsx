"use client";

import HeroImage from "@/app/_components/HeroImage";
import PriceDetail from "@/app/_components/PriceDetail";
import { Button } from "@/components/ui/button";
import { cartsSelector } from "@/redux/selectors/cartsSelector";
import { useSelector } from "react-redux";
import CheckoutInfo from "./CheckoutInfo";
import { formatMoney, sumMoney } from "@/utils/helpers";
import { authSelector } from "@/redux/selectors/authSelector";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@radix-ui/react-toast";
import Link from "next/link";

const page = () => {
  const { carts } = useSelector(cartsSelector);

  const { currentUser } = useSelector(authSelector);

  const { toast } = useToast();

  if (!currentUser) {
    return toast({
      variant: "destructive",
      title: "Uh oh! Something went wrong.",
      description: "Please login to book a room",
      action: (
        <ToastAction altText="Try again">
          <Link href="/auth">Login Now</Link>
        </ToastAction>
      ),
    });
  }

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
            <h2 className="text-size-3xl">Checkout</h2>
            <div className="flex flex-col gap-4 mt-4">
              <CheckoutInfo />
            </div>
          </div>
          <div className="lg:max-w-[30%] max-w-[100%] p-4 border border-secondary rounded-lg">
            <h2 className="text-size-3xl">Price Details</h2>
            <div className="h-[680px] overflow-auto">
              <div className="flex flex-col gap-4 mt-4">
                {carts.map((room, index) => (
                  <PriceDetail key={room.id} cart={room} index={index + 1} />
                ))}
              </div>
            </div>
            <div className="mt-4 w-full">
              <div className="mt-4 flex justify-between">
                <div>
                  <div className="text-size-2xl font-medium">Total</div>
                  <div>Including taxes and fees</div>
                </div>
                <span className="text-size-xl font-bold ">
                  {formatMoney(sumMoney(carts))}
                </span>
              </div>
              <Button variant={"secondary"} className="w-full">
                Add more Room
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
