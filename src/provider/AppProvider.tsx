"use client";
import { Toaster } from "@/components/ui/toaster";
import AppContext from "@/context/AppContext";
import React, { ReactNode, useState } from "react";

const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [showBowNow, setShowBookNow] = useState(false);
  const [cartId, setCartId] = useState<string | null>(null);
  const [checkIn, setCheckIn] = useState<Date>();
  const [checkOut, setCheckOut] = useState<Date>();

  return (
    <AppContext.Provider
      value={{
        showBowNow,
        setShowBookNow,
        cartId,
        setCartId,
        checkIn,
        setCheckIn,
        checkOut,
        setCheckOut,
      }}
    >
      {children}
      <Toaster />
    </AppContext.Provider>
  );
};

export default AppProvider;
