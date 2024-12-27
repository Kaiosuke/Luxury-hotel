"use client";
import MotionWrapper from "@/app/_components/MotionWrapper";
import { Skeleton } from "@/components/ui/skeleton";
import Splide from "@splidejs/splide";
import "@splidejs/splide/dist/css/themes/splide-default.min.css";
import { useEffect, useState } from "react";
import { ParallaxBanner } from "react-scroll-parallax";

const SplideImage = ({
  images,
  splideClass,
}: {
  images: string[];
  splideClass: string;
}) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (splideClass) {
      new Splide(`.${splideClass}`, {
        type: "loop",
        arrows: false,
        pagination: false,
        autoplay: true,
        interval: 3000,
      }).mount();
    }
  }, []);

  return (
    images && (
      <MotionWrapper>
        <div className={`splide ${splideClass}`}>
          <div className="w-full h-full relative">
            <div className="splide__track">
              <ul className="splide__list">
                {images.map((image, index) => (
                  <li key={index} className="splide__slide">
                    <ParallaxBanner
                      layers={[
                        {
                          children: (
                            <img
                              src={image}
                              alt="default"
                              onLoad={() => setLoading(false)}
                              className={`w-full h-full object-cover ${
                                loading && (
                                  <Skeleton className="h-[125px] w-[250px] rounded-xl" />
                                )
                              }`}
                            />
                          ),
                          speed: -10,
                        },
                      ]}
                      className="aspect-[16/9]"
                    />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </MotionWrapper>
    )
  );
};

export default SplideImage;
