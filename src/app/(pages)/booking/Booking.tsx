import BookingCalendar from "@/app/_components/BookingCalendar";
import Extension from "@/app/_components/Extension";
import MotionWrapper from "@/app/_components/MotionWrapper";
import useAppContext from "@/hooks/useAppContext";
import useAvailableRooms from "@/hooks/useAvailableRooms";
import { IRoom } from "@/interfaces";
import { roomsSelector } from "@/redux/selectors/roomsSelector";
import { roomTypesSelector } from "@/redux/selectors/roomTypesSelector";
import { useSelector } from "react-redux";
import BookingFilter from "./BookingFilter";
import BookingList from "./BookingList";

const Booking = () => {
  const { checkIn, checkOut } = useAppContext();
  const { roomTypes } = useSelector(roomTypesSelector);
  const { rooms } = useSelector(roomsSelector);

  const availableRooms: IRoom[] =
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

  return (
    <section className="text-third padding-main min-h-screen">
      <div className="flex gap-6">
        <div className="flex-[1_0_auto] lg:max-w-[70%] max-w-[100%] gap-10">
          <MotionWrapper>
            <BookingCalendar isShow color="text-third" />
            <h1 className="text-size-5xl mt-20 mb-10">Select Next Room</h1>
          </MotionWrapper>
          <BookingFilter />
          {checkIn && checkOut ? (
            <>
              {roomTypes.length ? (
                roomTypes.map(
                  (roomType) =>
                    getQuantityAvailableRoom(roomType._id) > 0 && (
                      <BookingList
                        key={roomType._id}
                        roomType={roomType}
                        availableRooms={availableRooms}
                        getQuantityAvailableRoom={getQuantityAvailableRoom}
                      />
                    )
                )
              ) : (
                <div className="mt-10">
                  <span className="text-size-3xl">
                    No available rooms found
                  </span>
                </div>
              )}
            </>
          ) : (
            <MotionWrapper>
              <div className="mt-10">
                <span className="text-size-3xl">
                  Please select check-in and check-out
                </span>
              </div>
            </MotionWrapper>
          )}
        </div>
        <div className="flex-[1_0_auto] max-w-[30%] lg:block hidden">
          <div className="sticky top-32">
            <Extension />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Booking;
