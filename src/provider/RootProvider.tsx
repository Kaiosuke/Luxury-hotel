"use client";
import store, { persistor } from "@/redux/store";
import { SessionProvider } from "next-auth/react";
import React, { ReactNode } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import AppProvider from "./AppProvider";

const RootProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <SessionProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <AppProvider>{children}</AppProvider>
        </PersistGate>
      </Provider>
    </SessionProvider>
  );
};

export default RootProvider;
