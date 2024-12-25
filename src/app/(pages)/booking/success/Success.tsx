import { AspectRatio } from "@/components/ui/aspect-ratio";
import Image from "next/image";
import React from "react";
import data from "@/app/data.json";
import { FaCcVisa } from "react-icons/fa";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Success = () => {
  const { rooms } = data;

  return (
    <div className="border border-secondary rounded-lg p-4 text-third">
      <h3 className="text-size-xl">Reservation Details</h3>
      <div className="mt-4">
        <div className="font-semibold">Aguas de Ibiza Grand Luxe Hotel</div>
        <div>Salvador Camacho 14, Santa Eulalia del Rio Ibiza, 07840</div>
        <div>+34971319991</div>
        <div>info@aguasdeibiza.com</div>
      </div>
      {rooms.map((room) => (
        <div
          key={room.id}
          className="border border-secondary rounded-lg p-4 text-third mt-10"
        >
          <div className="flex md:flex-row flex-col gap-4 items-start">
            <div className="flex-[1_0_auto] lg:max-w-[30%] sm:w-[320px] w-[100%]">
              <AspectRatio ratio={16 / 9} className="bg-muted">
                <Image
                  src={room.thumbnail}
                  alt={room.title}
                  fill
                  className="h-full w-full rounded-md object-cover"
                />
              </AspectRatio>
            </div>
            <div className="flex-[1_0_auto] md:max-w-[70%] max-w-[100%]">
              <div className="flex lg:flex-row flex-col justify-between">
                <div>
                  <h3 className="text-size-lg font-medium">{room.title}</h3>
                  {room.types
                    ?.filter((type) => type.idType === "type1")
                    .map((type) => (
                      <div key={type.idType} className="flex flex-col mt-1">
                        <div>{type.typeName}</div>
                        <span>${type.price} average per night</span>
                        <span>Thu, May 1 - Sun, May 25 </span>
                        <span>1 Adult</span>
                      </div>
                    ))}
                </div>
                <div className="lg:mt-0 mt-4">
                  <span className="text-size-lg font-bold">$6,101.69</span>
                </div>
              </div>
            </div>
          </div>
          <div className="line-1"></div>
          <div>
            <div>
              <span className="font-semibold">Guest details</span>

              <div>Trongle</div>
              <div>trongleele@gmail.com</div>
            </div>
            <div className="mt-4">
              <span className="font-semibold">Payment details</span>
              <div className="flex gap-2 items-center">
                <FaCcVisa className="text-size-xl" />{" "}
                <span>Card ending 1234</span>
              </div>
              <div>trongleele@gmail.com</div>
            </div>
          </div>
        </div>
      ))}
      <div className="mt-10">
        <span className="text-size-xl font-semibold">Policies:</span>
        <div className="bg-secondary text-primary mt-2">
          <div className="p-4">
            <div className="flex gap-6">
              <div>
                <div className="font-semibold">Check-in</div>
                <div>After 3:00 pm</div>
              </div>
              <div>
                <div className="font-semibold">Check-out</div>
                <div>Before 12:00 pm</div>
              </div>
            </div>
            <div className="mt-4">
              <h3 className="font-semibold">ROOM 1 DELUXE</h3>
              <div>
                <div>Guarantee Policy</div>
                <p>
                  Full prepayment is required at time of booking and it is not
                  refundable in case of cancellation or modification.
                </p>
              </div>
              <div className="mt-2">
                <div>Cancel Policy</div>
                <p>
                  100% of the total stay will be charged as penalty fee in case
                  of cancellation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 text-right">
        <Button variant={"third"}>
          <Link href="/">Back to Homepage</Link>
        </Button>
      </div>
    </div>
  );
};

export default Success;
