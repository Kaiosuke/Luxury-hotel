import useDetectScroll from "@smakss/react-scroll-direction";
import { useEffect, useRef, useState } from "react";

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

  // const handleScrollToTop = () => {
  //   window.scrollTo(0, 0);
  // };

  return (
    <div className="fixed top-1/2 lg:right-[100px] right-[60px]">
      <img
        ref={refImg}
        className="lg:w-[180px] h-auto md:w-[140px] w-[120px]"
        style={{ transform: `rotate(${scroll}deg)` }}
        src="https://aguasdeibiza.com/wp-content/uploads/2024/11/Recurso-7@288x.png"
        alt="logo"
      />
      {/* <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 cursor-pointer">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <FaArrowAltCircleUp
                className="text-size-4xl"
                onClick={handleScrollToTop}
              />
            </TooltipTrigger>
            <TooltipContent className="bg-third text-primary">
              <p>Scroll To Top</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div> */}
    </div>
  );
};

export default Circle;
