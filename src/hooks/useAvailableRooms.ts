import { IRooms } from "@/interfaces";

interface IAvailableRooms {
  rooms: IRooms[];
  checkIn: Date;
  checkOut: Date;
}

interface BookedDate {
  from: string;
  to: string;
}

const useAvailableRooms = ({
  rooms,
  checkIn,
  checkOut,
}: IAvailableRooms): IRooms[] => {
  const isRoomAvailable = (bookedDates: BookedDate[]): boolean => {
    return !bookedDates.some((booking) => {
      const bookedFrom = new Date(booking.from);
      const bookedTo = new Date(booking.to);
      if (checkIn && checkOut) {
        return (
          (checkIn >= bookedFrom && checkIn <= bookedTo) ||
          (checkOut >= bookedFrom && checkOut <= bookedTo) ||
          (checkIn <= bookedFrom && checkOut >= bookedTo)
        );
      }
    });
  };

  return rooms.filter(
    (room) => room.status === "available" && isRoomAvailable(room.bookedDates)
  );
};

export default useAvailableRooms;
