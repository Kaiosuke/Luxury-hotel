"use client";
import { ICart } from "@/interfaces";
import { convertDate, formatMoney } from "@/utils/helpers";

interface IPriceDetail {
  cart: ICart;
  index: number;
}

const PriceDetail = ({ cart, index }: IPriceDetail) => {
  return (
    <div className="border border-secondary rounded-lg p-4 text-third">
      <h4 className="text-size-lg">ROOM {index}</h4>
      <h3 className="text-size-lg font-medium">{cart.roomType?.title}</h3>
      <div className="flex justify-between mt-4">
        <div className="text-base lg:flex-[0_0_auto] lg:max-w-[60%]">
          {cart.option?.title}
        </div>
        <span className="text-size-lg font-bold">
          {formatMoney(cart.totalPrice)}
        </span>
      </div>
      <div>Room: {cart.room?.roomNumber}</div>
      <span className="underline underline-offset-2 animation-fast cursor-pointer hover:text-secondary text-base">
        {cart.day} {cart.day === 1 ? "Night stay" : "Nights stay"}
      </span>
      <div className="flex justify-between mt-4 text-base">
        <span>Taxes and fees</span>
        <span className="text-size-lg font-bold">$0</span>
      </div>
      <div className="flex flex-col text-base">
        <span>
          {convertDate(cart.bookedDates.from)} -{" "}
          {convertDate(cart.bookedDates.to)}
        </span>
      </div>
    </div>
  );
};

export default PriceDetail;
