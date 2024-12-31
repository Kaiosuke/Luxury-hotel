"use client";
import { ICart, IOption, IRoom, IRoomType } from "@/interfaces";
import { useAppDispatch } from "@/redux/store";
import { convertDate, formatMoney } from "@/utils/helpers";
import { useEffect, useState } from "react";
import { getOption } from "../api/optionsRequest";
import { getRoomType } from "../api/roomTypesRequest";
import { getRoom } from "../api/roomsRequest";

interface IPriceDetail {
  cart: ICart;
  index: number;
}

const PriceDetail = ({ cart, index }: IPriceDetail) => {
  const [roomType, setRoomType] = useState<IRoomType | null>(null);
  const [room, setRoom] = useState<IRoom | null>(null);
  const [option, setOption] = useState<IOption | null>(null);

  const disPatch = useAppDispatch();

  useEffect(() => {
    (async () => {
      const findRoomType = await disPatch(
        getRoomType(cart.roomTypeId)
      ).unwrap();
      setRoomType(findRoomType);

      const findRoom = await disPatch(getRoom(cart.roomId)).unwrap();
      setRoom(findRoom);

      const findOption = await disPatch(getOption(cart.optionId)).unwrap();
      setOption(findOption);
    })();
  }, []);

  return (
    <div className="border border-secondary rounded-lg p-4 text-third">
      <h4 className="text-size-lg">ROOM {index}</h4>
      <h3 className="text-size-lg font-medium">{roomType?.title}</h3>
      <div className="flex justify-between mt-4">
        <div className="text-base lg:flex-[0_0_auto] lg:max-w-[60%]">
          {option?.title}
        </div>
        <span className="text-size-lg font-bold">
          {formatMoney(cart.totalPrice)}
        </span>
      </div>
      <div>Room: {room?.roomNumber}</div>
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
