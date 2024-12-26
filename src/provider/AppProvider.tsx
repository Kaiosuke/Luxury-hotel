"use client";
import AppContext from "@/context/AppContext";
import store from "@/redux/store";
import { SessionProvider } from "next-auth/react";
import React, { ReactNode, useState } from "react";
import { Provider } from "react-redux";

const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [showBowNow, setShowBookNow] = useState(false);
  const [dateCheckIn, setDateCheckIn] = useState<Date>();
  const [dateCheckOut, setDateCheckOut] = useState<Date>();

  return (
    <SessionProvider>
      <Provider store={store}>
        {/* <PersistGate loading={null} persistor={persistor}> */}
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
        {/* </PersistGate> */}
      </Provider>
    </SessionProvider>
  );
};

export default AppProvider;
