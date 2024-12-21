"use client";
import React, { ReactNode } from "react";
import { ParallaxProvider } from "react-scroll-parallax";
import Footer from "../_components/footer/Footer";
import Header from "../_components/header/Header";
import AppProvider from "@/provider/AppProvider";

const Layout: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <ParallaxProvider>
      <AppProvider>
        <Header />
        {children}
        <Footer />
      </AppProvider>
    </ParallaxProvider>
  );
};

export default Layout;
