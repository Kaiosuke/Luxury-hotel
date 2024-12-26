"use client";
import AppContext from "@/context/AppContext";
import store, { persistor } from "@/redux/store";
import React, { ReactNode, useState } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { SessionProvider } from "next-auth/react";
const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [showBowNow, setShowBookNow] = useState(false);
  const [dateCheckIn, setDateCheckIn] = useState<Date>();
  const [dateCheckOut, setDateCheckOut] = useState<Date>();

  return (
    <SessionProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
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
        </PersistGate>
      </Provider>
    </SessionProvider>
  );
};

export default AppProvider;
