"use client";
import AppContext from "@/context/AppContext";
import React, { ReactNode, useState } from "react";

const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [showBowNow, setShowBookNow] = useState(false);

  return (
    <AppContext.Provider value={{ showBowNow, setShowBookNow }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
