"use client";
import { createContext } from "react";

export type TAppContext = {
  showBowNow: boolean;
  setShowBookNow: (value: boolean) => void;
};

const AppContext = createContext<TAppContext | undefined>(undefined);

export default AppContext;
