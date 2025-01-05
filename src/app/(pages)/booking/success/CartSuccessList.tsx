import { getOption } from "@/app/api/optionsRequest";
import { getRoom } from "@/app/api/roomsRequest";
import { getRoomType } from "@/app/api/roomTypesRequest";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { ICart, IOption, IRoom, IRoomType } from "@/interfaces";
import { useAppDispatch } from "@/redux/store";
import { convertDate, formatMoney } from "@/utils/helpers";
import Image from "next/image";
import { useEffect, useState } from "react";

const CartSuccessList = ({ cart }: { cart: ICart }) => {
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
    <>
      {roomType && (
        <div className="border border-secondary rounded-lg p-4 text-third mt-10">
          <div className="flex md:flex-row flex-col gap-4 items-start">
            <div className="flex-[1_0_auto] lg:max-w-[30%] sm:w-[320px] w-[100%]">
              <AspectRatio ratio={16 / 9} className="bg-muted">
                <Image
                  src={roomType.thumbnail}
                  alt={roomType.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="h-full w-full rounded-md object-cover"
                />
              </AspectRatio>
            </div>
            <div className="flex-[1_0_auto] md:max-w-[70%] max-w-[100%]">
              <div className="flex lg:flex-row flex-col justify-between">
                <div>
                  <h3 className="text-size-lg font-medium">{roomType.title}</h3>
                  {option && (
                    <div className="flex flex-col mt-1">
                      <div>{option.title}</div>
                      <div>Room: {room?.roomNumber}</div>
                      <span>{formatMoney(option.price)} average / night</span>
                      <span>
                        {convertDate(cart.bookedDates.from)} -{" "}
                        {convertDate(cart.bookedDates.to)}
                      </span>
                    </div>
                  )}
                </div>
                <div className="lg:mt-0 mt-4">
                  <span className="text-size-lg font-bold">
                    {formatMoney(cart.totalPrice)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CartSuccessList;
