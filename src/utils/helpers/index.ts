const formatMoney = (money: number): string => {
  return money.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
};

export { formatMoney };
