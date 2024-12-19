"use client";
import React, { ReactNode } from "react";
import { ParallaxProvider } from "react-scroll-parallax";
import Footer from "../_components/footer/Footer";
import Header from "../_components/header/Header";

const Layout: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <ParallaxProvider>
      <Header />
      {children}
      <Footer />
    </ParallaxProvider>
  );
};

export default Layout;
