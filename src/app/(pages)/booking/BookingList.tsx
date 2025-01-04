import MotionWrapper from "@/app/_components/MotionWrapper";
import { addCart } from "@/app/api/cartsRequest";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/hooks/use-toast";
import useAppContext from "@/hooks/useAppContext";
import { ICart, IRoom, IRoomType } from "@/interfaces";
import { authSelector } from "@/redux/selectors/authSelector";
import { optionsSelector } from "@/redux/selectors/optionsSelector";
import { useAppDispatch } from "@/redux/store";
import { calculateDays } from "@/utils/helpers";
import Image from "next/image";
import Link from "next/link";
import { BsCreditCard2BackFill, BsFillSafe2Fill } from "react-icons/bs";
import { FaTemperatureHigh, FaWifi } from "react-icons/fa6";
import { LuLamp } from "react-icons/lu";
import { MdEmojiFoodBeverage, MdOutlineBathtub } from "react-icons/md";
import { useSelector } from "react-redux";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRef, useState } from "react";
import OptionRoom from "./OptionRoom";
import { cartUserRemainingSelector } from "@/redux/selectors/cartsSelector";
import { useAvailableCarts } from "@/hooks/useAvailableCarts";

interface IBookingList {
  roomType: IRoomType;
  availableRooms: IRoom[];
  getQuantityAvailableRoom: (value: string) => number;
}

const BookingList = ({
  roomType,
  availableRooms,
  getQuantityAvailableRoom,
}: IBookingList) => {
  const filterIconFeature = (value: string) => {
    return value.includes("Conditioning") ? (
      <FaTemperatureHigh />
    ) : value.includes("Desk ") ? (
      <LuLamp />
    ) : value.includes("Wifi") ? (
      <FaWifi />
    ) : value.includes("Bathtub") ? (
      <MdOutlineBathtub />
    ) : value.includes("Deposit ") ? (
      <BsCreditCard2BackFill />
    ) : value.includes("Breakfast") ? (
      <MdEmojiFoodBeverage />
    ) : (
      <BsFillSafe2Fill />
    );
  };

  const [roomId, setRoomId] = useState<string>("");
  const { checkIn, checkOut } = useAppContext();
  const { currentUser } = useSelector(authSelector);
  const { options } = useSelector(optionsSelector);
  const { cartsUsers } = useSelector(cartUserRemainingSelector);

  const roomRef = useRef<HTMLButtonElement>(null);

  const { toast } = useToast();
  const dispatch = useAppDispatch();

  const filterRoom = (id: string) => {
    return availableRooms?.filter((room) => room.roomTypeId === id);
  };

  const bookRoom = ({
    roomTypeId,
    optionId,
    price,
    totalPrice,
  }: {
    roomTypeId: string;
    optionId: string;
    price: number;
    totalPrice: number;
  }) => {
    if (!currentUser)
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

    if (checkIn && checkOut) {
      if (!roomId.length) {
        roomRef?.current?.focus();
        return toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: "Please select room",
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        });
      }
      const newBooking = {
        userId: currentUser.id,
        roomTypeId,
        optionId,
        roomId,
        status: "pending",
        price,
        totalPrice,
        day: calculateDays({ checkIn, checkOut }),
        bookedDates: { from: checkIn, to: checkOut },
      };
      const availableCart =
        cartsUsers &&
        checkIn &&
        checkOut &&
        useAvailableCarts({ carts: cartsUsers, newBooking });

      if (!availableCart.length) {
        dispatch(addCart(newBooking)).unwrap();
        setRoomId("");
        return toast({
          variant: "success",
          title: "success",
          description: "Booking has been added to cart",
        });
      } else {
        return toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description:
            "This room is booked, choose another room or date or another room type",
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        });
      }
    } else {
      return toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "Please select check-in and check-out date",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
    }
  };

  return (
    <>
      <MotionWrapper
        className="border border-third rounded-lg p-4 mt-6"
        key={roomType.id}
      >
        <div className="flex lg:gap-6 md:gap-4 md:flex-row flex-col">
          <div className="flex-[1_0_auto] md:max-w-[30%] max-w-[100%]">
            <AspectRatio ratio={4 / 3} className="bg-muted">
              <Image
                src={roomType.thumbnail}
                alt={roomType.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="h-full w-full rounded-md object-cover"
              />
            </AspectRatio>
            <ul className="mt-4 flex-col gap-2 md:flex hidden">
              {roomType.features &&
                roomType.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2">
                    {filterIconFeature(feature)} {feature}
                  </li>
                ))}
            </ul>
          </div>
          <div className="flex-[1_0_auto] md:max-w-[70%] max-w-[100%]">
            <h2 className="text-size-4xl md:mt-0 mt-4 font-medium">
              {roomType.title}
            </h2>
            <div className="flex gap-6 mt-6">
              {getQuantityAvailableRoom(roomType.id) < 5 ? (
                <span className="text-size-base text-red-400">
                  Only {getQuantityAvailableRoom(roomType.id)} rooms left
                </span>
              ) : (
                <span>
                  {getQuantityAvailableRoom(roomType.id)} rooms available.
                </span>
              )}
              <span className="text-size-base">{roomType.typeBed}</span>
              <span>Sleeps {roomType.sleeps}</span>
              <span>{roomType.square}</span>
            </div>
            <Select value={roomId} onValueChange={(value) => setRoomId(value)}>
              <SelectTrigger ref={roomRef} className="w-[100px]">
                <SelectValue placeholder="Room" />
              </SelectTrigger>
              <SelectContent className="bg-secondary text-primary">
                <SelectGroup>
                  {filterRoom(roomType.id).map((room) => (
                    <SelectItem key={room.id} value={room.id}>
                      {room.roomNumber}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            <div className="mt-4">
              <p>{roomType.shortDes}</p>
            </div>
            <div></div>
            <Link href={`/rooms/${roomType.id}`}>
              <Button variant={"third"} className="mt-6">
                Rooms Detail
              </Button>
            </Link>
            <div>
              {options &&
                checkIn &&
                checkOut &&
                options.map((option) => (
                  <OptionRoom
                    key={option.id}
                    roomType={roomType}
                    option={option}
                    filterIconFeature={filterIconFeature}
                    checkIn={checkIn}
                    checkOut={checkOut}
                    bookRoom={bookRoom}
                  />
                ))}
            </div>
          </div>
        </div>
      </MotionWrapper>
    </>
  );
};

export default BookingList;
