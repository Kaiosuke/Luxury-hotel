"use client";
import React, { ReactNode } from "react";
import { ParallaxProvider } from "react-scroll-parallax";
import Circle from "../_components/Circle";
import Footer from "../_components/footer/Footer";
import Header from "../_components/header/Header";

import { motion, useScroll, useSpring } from "framer-motion";

const Layout: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });
  return (
    <ParallaxProvider>
      <Header />
      <motion.div className="progress-bar z-[9999]" style={{ scaleX }} />
      {children}
      <Circle />
      <Footer />
    </ParallaxProvider>
  );
};

export default Layout;
