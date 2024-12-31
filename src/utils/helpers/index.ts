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

export { formatMoney, convertDate, sumMoney, calculateDays };
