"use client";
import store, { persistor } from "@/redux/store";
import React, { ReactNode } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import AppProvider from "./AppProvider";

const RootProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AppProvider>{children}</AppProvider>
      </PersistGate>
    </Provider>
  );
};

export default RootProvider;
