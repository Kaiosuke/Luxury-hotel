import { Button } from "@/components/ui/button";
import { IOption, IRoomType } from "@/interfaces";
import { calculateDays, formatMoney } from "@/utils/helpers";
import Link from "next/link";

interface IOptionRoom {
  option: IOption;
  filterIconFeature: any;
  roomType: IRoomType;
  checkIn: Date;
  checkOut: Date;
  bookRoom: any;
}

const OptionRoom = ({
  option,
  roomType,
  filterIconFeature,
  checkIn,
  checkOut,
  bookRoom,
}: IOptionRoom) => {
  const handleOriginalPrice = (price: number): number => {
    return price + price * 0.1;
  };

  return (
    <>
      <div className="line-1" />
      <div className="flex xl:gap-6 md:gap-4 md:flex-row flex-col">
        <div className="flex-[1_0_auto] md:max-w-[60%] 2xl:max-w-[70%]  max-w-[100%]">
          <h3 className="text-size-lg underline hover:decoration-secondary">
            <Link href="#!">{option.title}</Link>
          </h3>
          <div className="flex flex-col gap-1 mt-2">
            {/* {option.extensions.map((ex, index) => (
              <span
                key={index}
                className="font-bold text-size-lg flex items-center gap-2"
              >
                <div className="text-2xl">{filterIconFeature(ex)}</div>
                {ex}
              </span>
            ))} */}
            <span className="font-bold text-size-lg flex items-center gap-2">
              {/* <div className="text-2xl">
                {filterIconFeature(option.extension)}
              </div> */}
              {option.extension}
            </span>
          </div>
          <p className="text-size-lg mt-4">{option.typeDescription}</p>
        </div>
        <div className="md:max-w-[40%] 2xl:max-w-[30%] max-w-[100%] md:mt-0 mt-4">
          <div className="flex flex-col">
            <span className="text-xl font-semibold">
              {formatMoney(
                (option.price + roomType.price) *
                  calculateDays({ checkIn, checkOut })
              )}
            </span>
            <span className="line-through opacity-60">
              {formatMoney(
                handleOriginalPrice(option.price + roomType.price) *
                  calculateDays({ checkIn, checkOut })
              )}
            </span>
          </div>
          <div className="flex mt-2 flex-col md:mt-0">
            <div>Total for {calculateDays({ checkIn, checkOut })} nights</div>
            <Button
              variant={"secondary"}
              className="mt-4 w-fit"
              onClick={() =>
                bookRoom({
                  roomTypeId: roomType._id,
                  optionId: option._id,
                  price: handleOriginalPrice(option.price + roomType.price),
                  totalPrice:
                    handleOriginalPrice(option.price + roomType.price) *
                    calculateDays({ checkIn, checkOut }),
                })
              }
            >
              Book now
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default OptionRoom;
