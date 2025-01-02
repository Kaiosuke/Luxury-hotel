import { ICart, IRoom } from "@/interfaces";

interface IAvailableCart {
  carts: ICart[];
  newBooking: {
    userId: string | undefined;
    roomTypeId: string;
    optionId: string;
    roomId: string;
    status: string;
    price: number;
    totalPrice: number;
    day: number;
    bookedDates: {
      from: Date;
      to: Date;
    };
  };
}

interface BookedDate {
  from: Date;
  to: Date;
}

const useAvailableCarts = ({ carts, newBooking }: IAvailableCart): ICart[] => {
  const isCartAvailable = (bookedDates: BookedDate): boolean => {
    const { from, to } = newBooking.bookedDates;

    if (!bookedDates.from || !bookedDates.to) return false;
    const bookedFrom = new Date(bookedDates.from);
    const bookedTo = new Date(bookedDates.to);
    return (
      (from >= bookedFrom && from <= bookedTo) ||
      (to >= bookedFrom && to <= bookedTo) ||
      (from <= bookedFrom && to >= bookedTo)
    );
  };
  return carts.filter(
    (cart) =>
      cart.roomId === newBooking.roomId && isCartAvailable(cart.bookedDates)
  );
};

export default useAvailableCarts;
