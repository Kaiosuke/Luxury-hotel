"use client";

import DeleteRoom from "@/app/_components/booking/DeleteRoom";
import HeroImage from "@/app/_components/HeroImage";
import LoadingPage from "@/app/_components/LoadingPage";
import PriceDetail from "@/app/_components/PriceDetail";
import { Button } from "@/components/ui/button";
import { authSelector } from "@/redux/selectors/authSelector";
import { formatMoney, sumMoney } from "@/utils/helpers";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CartList from "./CartList";
import { cartUserRemainingSelector } from "@/redux/selectors/cartsSelector";

const page = () => {
  const [showDelete, setShowDelete] = useState(false);

  const { currentUser } = useSelector(authSelector);

  const { carts } = useSelector(cartUserRemainingSelector);

  const router = useRouter();

  useEffect(() => {
    if (!currentUser) {
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
      <section className="padding-main">
        <div className="flex lg:flex-row flex-col gap-4">
          <div className="flex-[1_0_auto] lg:max-w-[70%] p-4 max-w-[100%]">
            <h2 className="text-size-3xl">YourCart: {carts.length} Items</h2>
            {!carts.length && (
              <div className="mt-10">
                <Link
                  href="/booking"
                  className="font-size-2xl font-medium underline"
                >
                  Booking Now
                </Link>
              </div>
            )}
            <div className="flex flex-col gap-4 mt-4">
              {carts.map((cart) => (
                <CartList
                  key={cart.id}
                  cart={cart}
                  showDelete={showDelete}
                  setShowDelete={setShowDelete}
                />
              ))}
            </div>
          </div>
          <div className="lg:max-w-[30%] max-w-[100%] p-4 border border-secondary rounded-lg h-fit">
            <h2 className="text-size-3xl">Price Details</h2>
            <div className="h-[680px] overflow-auto">
              <div className="flex flex-col gap-4 mt-4">
                {carts.map((cart, index) => (
                  <PriceDetail key={cart.id} cart={cart} index={index + 1} />
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
                <Link href="/booking">Add more Room</Link>
              </Button>
              <Button
                variant={"third"}
                className="w-full mt-2"
                disabled={!carts.length}
              >
                <Link href="/checkout"> Checkout</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
      <div className="pd-medium" />
      {showDelete && (
        <DeleteRoom showDelete={showDelete} setShowDelete={setShowDelete} />
      )}
    </>
  );
};

export default page;
