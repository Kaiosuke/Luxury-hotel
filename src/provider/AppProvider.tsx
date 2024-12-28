"use client";
import AppContext from "@/context/AppContext";
import React, { ReactNode, useState } from "react";

const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [showBowNow, setShowBookNow] = useState(false);
  const [checkIn, setCheckIn] = useState<Date>();
  const [checkOut, setCheckOut] = useState<Date>();

  return (
    <AppContext.Provider
      value={{
        showBowNow,
        setShowBookNow,
        checkIn,
        setCheckIn,
        checkOut,
        setCheckOut,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
