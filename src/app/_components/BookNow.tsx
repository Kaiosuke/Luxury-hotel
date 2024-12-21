"use client";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverTrigger } from "@/components/ui/popover";
import useAppContext from "@/hooks/useAppContext";
import { cn } from "@/lib/utils";
import { PopoverContent } from "@radix-ui/react-popover";
import { format } from "date-fns";
import Link from "next/link";
import { useState } from "react";
import { FaChevronDown } from "react-icons/fa6";
import { HiMiniXMark } from "react-icons/hi2";

const BookNow = () => {
  const [dateCheckIn, setDateCheckIn] = useState<Date>();
  const [dateCheckOut, setDateCheckOut] = useState<Date>();

  const { showBowNow, setShowBookNow } = useAppContext();

  return (
    <div className="fixed inset-0 h-screen w-screen z-[99991] bg-white flex items-center justify-center">
      <div className="absolute right-8 top-8">
        <HiMiniXMark
          className="text-size-6xl text-black cursor-pointer"
          onClick={() => setShowBookNow(!showBowNow)}
        />
      </div>
      <div className="text-center padding-main 2xl:px-[400px] m-auto text-third">
        <div className="text-size-6xl mb-20">Book your Stay</div>
        <div className="flex item-center justify-between md:flex-row flex-col">
          <div className="flex items-center gap-4 justify-center">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "lg:w-[240px] justify-start text-left font-normal h-full border-none hover:bg-secondary",
                    !dateCheckIn && "text-muted-foreground"
                  )}
                >
                  {dateCheckIn ? (
                    format(dateCheckIn, "PPP")
                  ) : (
                    <div className="flex items-center gap-2">
                      <span className="lg:text-xl md:text-lg text-base font-light">
                        Check-in
                      </span>
                      <FaChevronDown />
                    </div>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 bg-primary" align="start">
                <Calendar
                  mode="single"
                  selected={dateCheckIn}
                  onSelect={setDateCheckIn}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "lg:w-[240px] justify-start text-left font-normal h-full border-none hover:bg-secondary",
                    !dateCheckOut && "text-muted-foreground"
                  )}
                >
                  {dateCheckOut ? (
                    format(dateCheckOut, "PPP")
                  ) : (
                    <div className="flex items-center gap-2">
                      <span className="lg:text-xl md:text-lg text-base font-light">
                        Check-out
                      </span>
                      <FaChevronDown />
                    </div>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 bg-primary" align="start">
                <Calendar
                  mode="single"
                  selected={dateCheckOut}
                  onSelect={setDateCheckOut}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          <div className="mt-4 md:mt-0">
            <Button
              variant={"outline"}
              className="md:h-full border-none lg:text-xl md:text-lg text-base font-light hover:bg-secondary"
            >
              <Link href="#!">Check-availability</Link>
            </Button>
          </div>
        </div>
        <div className="padding-main mt-20">
          <p className="text-size-xl text-[]">
            A peaceful, central setting ideal for exploring the island. The
            hotel is the ideal place to enjoy the best of the island. Its
            location, on Santa Eulalia’s peaceful promenade and the natural
            surroundings make Aguas de Ibiza a charming hotel from which to
            explore the beautiful beaches the island has to offer.
          </p>
        </div>
      </div>
    </div>
  );
};

export default BookNow;
