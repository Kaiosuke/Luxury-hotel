"use client";

import { useParallax } from "react-scroll-parallax";
const ScrollParallax = () => {
  const parallax = useParallax<HTMLDivElement>({
    rotate: [0, 360], // Set initial values for rotation
  });

  return (
    <div className="fixed bottom-[200px] right-[200px]">
      <div ref={parallax.ref}>
        <div className="w-48 h-48 bg-red-500" />
      </div>
    </div>
  );
};

export default ScrollParallax;
