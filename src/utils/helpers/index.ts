import { ICart } from "@/interfaces";

const formatMoney = (money: number): string => {
  return money.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
};

const convertDate = (time: Date): string => {
  const date = new Date(time);
  return date.toDateString();
};

const calculateDays = ({
  checkIn,
  checkOut,
}: {
  checkIn: Date;
  checkOut: Date;
}): number => {
  if (checkIn && checkOut) {
    const timeDifference = checkOut.getTime() - checkIn.getTime();
    return timeDifference / (1000 * 60 * 60 * 24);
  }
  return 1;
};

const sumMoney = (data: ICart[]) => {
  return data.reduce((prev, cur) => {
    return prev + cur.totalPrice;
  }, 0);
};
interface BookedDate {
  from: Date;
  to: Date;
}
interface IAvailableCart {
  bookedDatesCart: BookedDate;
  checkIn: Date;
  checkOut: Date;
}
const availableCart = ({
  bookedDatesCart,
  checkIn,
  checkOut,
}: IAvailableCart): boolean => {
  const dateCartFrom = bookedDatesCart.from;
  const dateCartTo = bookedDatesCart.to;
  return (
    (checkIn >= dateCartFrom && checkIn <= dateCartTo) ||
    (checkOut >= dateCartFrom && checkOut <= dateCartTo) ||
    (checkIn <= dateCartFrom && checkOut >= dateCartTo)
  );
};

export { formatMoney, convertDate, sumMoney, calculateDays, availableCart };
