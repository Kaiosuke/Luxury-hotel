import useDetectScroll from "@smakss/react-scroll-direction";
import React, { useEffect, useRef, useState } from "react";

const Circle = () => {
  const refImg = useRef<HTMLImageElement | null>(null);
  const [scroll, setScroll] = useState(0);
  const { scrollDir } = useDetectScroll();

  useEffect(() => {
    const handleScroll = () => {
      setScroll((prev) => (scrollDir === "down" ? prev + 1.6 : prev - 1.6));
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrollDir]);

  return (
    <div className="fixed top-1/2 lg:right-[100px] right-[60px]">
      <img
        ref={refImg}
        className="lg:w-[180px] h-auto md:w-[140px] w-[120px]"
        style={{ transform: `rotate(${scroll}deg)` }}
        src="https://aguasdeibiza.com/wp-content/uploads/2024/11/Recurso-7@288x.png"
        alt="logo"
      />
    </div>
  );
};

export default Circle;
