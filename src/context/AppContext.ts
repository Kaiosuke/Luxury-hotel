"use client";
import { createContext } from "react";

export type TAppContext = {
  showBowNow: boolean;
  setShowBookNow: (value: boolean) => void;
  cartId: string | null;
  setCartId: (value: string | null) => void;
  checkIn: Date | undefined;
  setCheckIn: (value: any) => void;
  checkOut: Date | undefined;
  setCheckOut: (value: any) => void;
};

const AppContext = createContext<TAppContext | undefined>(undefined);

export default AppContext;
