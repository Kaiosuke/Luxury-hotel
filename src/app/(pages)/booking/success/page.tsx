"use client";
import Extension from "@/app/_components/Extension";
import HeroImage from "@/app/_components/HeroImage";
import PriceDetail from "@/app/_components/PriceDetail";

import Success from "./Success";
import Image from "next/image";
import { useSelector } from "react-redux";
import { cartsSelector } from "@/redux/selectors/cartsSelector";
import { authSelector } from "@/redux/selectors/authSelector";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import LoadingPage from "@/app/_components/LoadingPage";
import { formatMoney, sumMoney } from "@/utils/helpers";
import { useReactToPrint } from "react-to-print";
import { Button } from "@/components/ui/button";

const page = () => {
  const { currentUser } = useSelector(authSelector);
  const { cartsSuccess } = useSelector(cartsSelector);

  const contentRef = useRef<HTMLDivElement>(null);
  const reactToPrintFn = useReactToPrint({ contentRef });

  const router = useRouter();

  useEffect(() => {
    if (!currentUser || !cartsSuccess.length) {
      router.push("/");
    }
  }, []);
  if (!currentUser) {
    return <LoadingPage />;
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
      <section className="padding-main" ref={contentRef}>
        <div className="flex lg:flex-row flex-col gap-4">
          <div className="flex-[1_0_auto] lg:max-w-[70%] p-4 max-w-[100%]">
            <div className="border border-secondary rounded-lg p-4 text-third">
              <div className="flex gap-4 items-center">
                <Image
                  src="/images/success.png"
                  alt="success"
                  width={50}
                  height={50}
                />
                <div>
                  <p className="text-[#25af89]">
                    Success! You reservation is booked
                  </p>
                  <p className="font-semibold">
                    Check trongleele@gmail.com to view your confirmation email
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-4 mt-4">
              <Success />
            </div>
            <div className="text-right mt-4">
              <Button variant={"third"} onClick={() => reactToPrintFn()}>
                Print
              </Button>
            </div>
          </div>
          <div className="lg:max-w-[30%] max-w-[100%] ">
            <div className="p-4 border border-secondary rounded-lg h-fit">
              <h2 className="text-size-3xl">Price Details</h2>
              <div className="h-[680px] overflow-auto">
                <div className="flex flex-col gap-4 mt-4">
                  {cartsSuccess.length &&
                    cartsSuccess.map((cart, index) => (
                      <PriceDetail
                        key={cart.id}
                        cart={cart}
                        index={index + 1}
                      />
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
                    {formatMoney(sumMoney(cartsSuccess))}
                  </span>
                </div>
              </div>
            </div>
            <div className="mt-6">
              <Extension />
            </div>
          </div>
        </div>
      </section>
      <div className="pd-medium" />
    </>
  );
};

export default page;
