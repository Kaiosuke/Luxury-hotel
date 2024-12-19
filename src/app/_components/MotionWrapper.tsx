"use client";

import { motion, MotionProps } from "framer-motion";
import React from "react";

type MotionWrapperProps = MotionProps & {
  children: React.ReactNode;
  className?: string;
};

const MotionWrapper: React.FC<MotionWrapperProps> = ({
  children,
  initial = { opacity: 0, y: 100 },
  whileInView = { opacity: 1, y: 0 },
  transition = { duration: 0.5 },
  viewport = { once: true },
  className,
  ...rest
}) => {
  return (
    <motion.div
      initial={initial}
      whileInView={whileInView}
      transition={transition}
      viewport={viewport}
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  );
};

export default MotionWrapper;
