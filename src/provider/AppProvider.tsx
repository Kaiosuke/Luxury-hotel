"use client";
import AppContext from "@/context/AppContext";
import React, { ReactNode, useState } from "react";

const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [showBowNow, setShowBookNow] = useState(false);
  const [dateCheckIn, setDateCheckIn] = useState<Date>();
  const [dateCheckOut, setDateCheckOut] = useState<Date>();

  return (
    <AppContext.Provider
      value={{
        showBowNow,
        setShowBookNow,
        dateCheckIn,
        setDateCheckIn,
        dateCheckOut,
        setDateCheckOut,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
