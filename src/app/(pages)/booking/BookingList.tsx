import MotionWrapper from "@/app/_components/MotionWrapper";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/hooks/use-toast";
import useAppContext from "@/hooks/useAppContext";
import useAvailableRooms from "@/hooks/useAvailableRooms";
import { IRooms } from "@/interfaces";
import { optionsSelector } from "@/redux/selectors/optionsSelector";
import { roomSelector } from "@/redux/selectors/roomsSelector";
import {
  roomTypesRemainingSelector,
  roomTypesSelector,
} from "@/redux/selectors/roomTypesSelector";
import Image from "next/image";
import Link from "next/link";
import { BsCreditCard2BackFill, BsFillSafe2Fill } from "react-icons/bs";
import { FaTemperatureHigh, FaWifi } from "react-icons/fa6";
import { LuLamp } from "react-icons/lu";
import { MdEmojiFoodBeverage, MdOutlineBathtub } from "react-icons/md";
import { useSelector } from "react-redux";

const BookingList = () => {
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

  const { checkIn, checkOut } = useAppContext();
  const { rooms } = useSelector(roomSelector);
  const dataList = useSelector(roomTypesRemainingSelector);
  const { options } = useSelector(optionsSelector);

  const { toast } = useToast();

  const bookRoom = () => {
    if (checkIn && checkOut) {
    } else {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "Please select check-in and check-out date",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
    }
  };

  const availableRooms: IRooms[] =
    rooms && checkIn && checkOut
      ? useAvailableRooms({ rooms, checkIn, checkOut })
      : [];

  const getQuantityAvailableRoom = (id: string): number => {
    if (!availableRooms) {
      return 0;
    }
    const quantityRoom = availableRooms.filter(
      (room) => room.roomTypeId === id
    );
    return quantityRoom.length;
  };

  const calculateDays = (): number => {
    if (checkIn && checkOut) {
      const timeDifference = checkOut.getTime() - checkIn.getTime();
      return timeDifference / (1000 * 60 * 60 * 24);
    }
    return 1;
  };

  const handleOriginalPrice = (price: number): number => {
    return price + price * 0.1;
  };

  return (
    <>
      {dataList.length ? (
        <>
          {dataList.map((room) => (
            <MotionWrapper
              className="border border-third rounded-lg p-4 mt-6"
              key={room.id}
            >
              <div className="flex lg:gap-6 md:gap-4 md:flex-row flex-col">
                <div className="flex-[1_0_auto] md:max-w-[30%] max-w-[100%]">
                  <AspectRatio ratio={4 / 3} className="bg-muted">
                    <Image
                      src={room.thumbnail}
                      alt={room.title}
                      fill
                      className="h-full w-full rounded-md object-cover"
                    />
                  </AspectRatio>
                  <ul className="mt-4 flex-col gap-2 md:flex hidden">
                    {room.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2">
                        {filterIconFeature(feature)} {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex-[1_0_auto] md:max-w-[70%] max-w-[100%]">
                  <h2 className="text-size-4xl md:mt-0 mt-4">{room.title}</h2>
                  <div className="flex gap-6 mt-6">
                    {getQuantityAvailableRoom(room.id) < 8 ? (
                      <span className="text-size-base text-red-400">
                        Only {getQuantityAvailableRoom(room.id)} rooms left
                      </span>
                    ) : (
                      <span>
                        {getQuantityAvailableRoom(room.id)} rooms available.
                      </span>
                    )}
                    <span className="text-size-base">{room.typeBed}</span>
                    <span>Sleeps {room.sleeps}</span>
                    <span>{room.square}</span>
                  </div>
                  <div className="mt-4">
                    <p>{room.shortDes}</p>
                  </div>
                  <Button variant={"third"} className="mt-6">
                    <Link href={`/rooms/${room.id}`}>Rooms Detail</Link>
                  </Button>

                  <div>
                    {options && (
                      <>
                        {options.map((option, index) => (
                          <div key={index}>
                            <div className="line-1" />
                            <div className="flex md:gap-6 md:flex-row flex-col">
                              <div className="flex-[1_0_auto] md:max-w-[60%] 2xl:max-w-[70%]  max-w-[100%]">
                                <h3 className="text-size-lg underline hover:decoration-secondary">
                                  <Link href="#!">{option.typeName}</Link>
                                </h3>
                                <div className="flex flex-col gap-1 mt-2">
                                  {option.extensions.map((ex, index) => (
                                    <span
                                      key={index}
                                      className="font-bold text-size-lg flex items-center gap-2"
                                    >
                                      <div className="text-2xl">
                                        {filterIconFeature(ex)}
                                      </div>
                                      {ex}
                                    </span>
                                  ))}
                                </div>
                                <p className="text-size-lg mt-4">
                                  {option.typeDescription}
                                </p>
                              </div>
                              <div className="md:max-w-[40%] 2xl:max-w-[30%] max-w-[100%] md:mt-0 mt-4">
                                <div className="flex gap-1 items-center">
                                  <span className="line-through opacity-60">
                                    {handleOriginalPrice(
                                      option.price + room.price
                                    ) * calculateDays()}
                                  </span>
                                  <span className="text-2xl">
                                    $
                                    {(option.price + room.price) *
                                      calculateDays()}
                                  </span>
                                </div>
                                <div className="flex mt-2 md:flex-col md:mt-0">
                                  <span>
                                    Total for {calculateDays()} nights
                                  </span>
                                  <Button
                                    variant={"secondary"}
                                    className="md:mt-4 ml-auto"
                                    onClick={() => bookRoom()}
                                  >
                                    Book now
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </>
                    )}
                  </div>
                </div>
              </div>
            </MotionWrapper>
          ))}
        </>
      ) : (
        <div className="mt-10">
          <span className="text-size-3xl">No available rooms found</span>
        </div>
      )}
    </>
  );
};

export default BookingList;
