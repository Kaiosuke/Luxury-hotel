import data from "@/app/data.json";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { BsCreditCard2BackFill, BsFillSafe2Fill } from "react-icons/bs";
import { FaTemperatureHigh, FaWifi } from "react-icons/fa6";
import { LuLamp } from "react-icons/lu";
import { MdEmojiFoodBeverage, MdOutlineBathtub } from "react-icons/md";

const BookingRooms = () => {
  const { rooms } = data;

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

  return (
    <>
      {rooms.map((room) => (
        <div className="border border-third p-4 mt-6" key={room.id}>
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
                {room.quantity < 4 && (
                  <span className="text-size-base text-red-400">
                    Only {room.quantity} rooms left
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
                <Link href="#!">Rooms Detail</Link>
              </Button>

              <div className="line-1" />
              <div>
                {room.types.map((type, index) => (
                  <div key={index}>
                    <div className="flex md:gap-6 md:flex-row flex-col">
                      <div className="flex-[1_0_auto] md:max-w-[60%] 2xl:max-w-[70%]  max-w-[100%]">
                        <h3 className="text-size-lg underline hover:decoration-secondary">
                          <Link href="#!"> {type.typeName} </Link>
                        </h3>
                        <div className="flex flex-col gap-1 mt-2">
                          {type.extensions.map((ex, index) => (
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
                          {type.typeDescription}
                        </p>
                      </div>
                      <div className="md:max-w-[40%] 2xl:max-w-[30%] max-w-[100%] md:mt-0 mt-4">
                        <div className="flex gap-1 items-center">
                          <span className="line-through opacity-60">$2200</span>
                          <span className="text-2xl">${type.price}</span>
                        </div>
                        <div className="flex mt-2 md:flex-col md:mt-0">
                          <span>Total for 24 nights</span>
                          <Button
                            variant={"secondary"}
                            className="md:mt-4 ml-auto"
                          >
                            <Link href="#!">Book now</Link>
                          </Button>
                        </div>
                      </div>
                    </div>
                    <div className="line-1" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default BookingRooms;
