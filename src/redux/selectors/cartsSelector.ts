import { createSelector } from "@reduxjs/toolkit";
import { ICartState } from "../slices/cartsSlice";
import { RootState } from "../store";

const cartsSelector = (state: RootState): ICartState => state.cartsSlice;

const cartUserRemainingSelector = createSelector(cartsSelector, (carts) => {
  return {
    carts: carts.carts.filter((cart) => cart.status === "pending"),
  };
});
export { cartsSelector, cartUserRemainingSelector };
