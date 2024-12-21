"use client";
import { createContext } from "react";

export type TAppContext = {
  showBowNow: boolean;
  setShowBookNow: (value: boolean) => void;
  dateCheckIn: Date | undefined;
  setDateCheckIn: (value: any) => void;
  dateCheckOut: Date | undefined;
  setDateCheckOut: (value: any) => void;
};

const AppContext = createContext<TAppContext | undefined>(undefined);

export default AppContext;
