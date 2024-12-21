"use client";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import useAppContext from "@/hooks/useAppContext";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import Link from "next/link";
import { FaChevronDown } from "react-icons/fa6";

const BookingCalendar = ({ isShow }: { isShow?: boolean }) => {
  const { dateCheckIn, dateCheckOut, setDateCheckIn, setDateCheckOut } =
    useAppContext();

  return (
    <div
      className={`border-t border-white ${
        isShow
          ? "text-third block "
          : "text-primary xl:px-28 md:px-10 px-6 absolute bottom-0 w-full lg:block hidden"
      }`}
    >
      <div className="flex justify-between">
        <div className="h-20">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  `w-[240px] justify-start text-left font-normal h-full border-none ${
                    isShow ? "text-third" : "text-primary"
                  } `,
                  !dateCheckIn && "text-muted-foreground"
                )}
              >
                {dateCheckIn ? (
                  format(dateCheckIn, "PPP")
                ) : (
                  <div className="flex items-center gap-2">
                    <span className="text-size-xl">Check-in</span>
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
                  `w-[240px] justify-start text-left font-normal h-full border-none ${
                    isShow ? "text-third" : "text-primary"
                  } `,
                  !dateCheckOut && "text-muted-foreground"
                )}
              >
                {dateCheckOut ? (
                  format(dateCheckOut, "PPP")
                ) : (
                  <div className="flex items-center gap-2">
                    <span className="text-size-xl"> Check-out </span>
                    <FaChevronDown />
                  </div>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent
              className="w-auto p-0 bg-primary text-third"
              align="start"
            >
              <Calendar
                mode="single"
                selected={dateCheckOut}
                onSelect={setDateCheckOut}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
        <div className="h-20">
          <Button
            variant="outline"
            className={`h-full border-none ${
              isShow ? "text-third" : "text-primary"
            }`}
          >
            <Link href="#!" className="text-size-xl">
              Check-availability
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BookingCalendar;
