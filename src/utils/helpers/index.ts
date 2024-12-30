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

export { formatMoney, convertDate };
