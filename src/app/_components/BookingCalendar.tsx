"use client";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/hooks/use-toast";
import useAppContext from "@/hooks/useAppContext";
import { cn } from "@/lib/utils";
import { format, isBefore } from "date-fns";
import { FaChevronDown } from "react-icons/fa6";

const BookingCalendar = ({ isShow }: { isShow?: boolean }) => {
  const { dateCheckIn, dateCheckOut, setDateCheckIn, setDateCheckOut } =
    useAppContext();
  const { toast } = useToast();

  const today = new Date();

  const handleGetData = () => {
    if (dateCheckIn && dateCheckOut) {
      console.log(1);
    } else {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "Please select check-in and check-out date",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
    }
  };

  return (
    <div
      className={`${
        isShow
          ? "block"
          : "text-primary xl:px-28 md:px-10 px-6 absolute bottom-0 w-full lg:block border-t border-white hidden"
      }`}
    >
      <div className="flex justify-between sm:flex-row flex-col">
        <div className="h-20 flex gap-4">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  `sm:w-[240px] justify-start text-left font-normal sm:h-full hover:text-third h-[60%] 
                  ${isShow ? "border-secondary text-third" : "border-none"}
                  `,
                  !dateCheckIn && "text-muted-foreground"
                )}
              >
                {dateCheckIn ? (
                  format(dateCheckIn, "PPP")
                ) : (
                  <div
                    className={`flex items-center text-primary gap-2  
                      ${isShow && "text-third"}`}
                  >
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
                disabled={(date) => isBefore(date, today)}
              />
            </PopoverContent>
          </Popover>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  `sm:w-[240px] justify-start text-left font-normal sm:h-full hover:text-third h-[60%] 
                     ${isShow ? "border-secondary text-third" : "border-none"}
                  `,
                  !dateCheckOut && "text-muted-foreground"
                )}
              >
                {dateCheckOut ? (
                  format(dateCheckOut, "PPP")
                ) : (
                  <div
                    className={`flex items-center text-primary gap-2  
                      ${isShow && "text-third"}`}
                  >
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
                disabled={(date) => isBefore(date, today)}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
        <div className="h-20 text-left">
          <Button
            variant="outline"
            className={`sm:h-full h-[60%] mt-4 sm:mt-0  ${
              isShow
                ? "border-secondary text-third hover:text-third"
                : "text-primary border-none"
            }`}
            onClick={handleGetData}
          >
            Check-availability
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BookingCalendar;
