import React, { ReactNode } from "react";
import Header from "../_components/header/Header";
import Footer from "../_components/footer/Footer";

const Layout: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};

export default Layout;
