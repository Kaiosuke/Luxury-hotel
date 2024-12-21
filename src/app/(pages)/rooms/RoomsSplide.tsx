import MotionWrapper from "@/app/_components/MotionWrapper";
import Splide from "@splidejs/splide";
import "@splidejs/splide/dist/css/themes/splide-default.min.css";
import Link from "next/link";
import { useEffect } from "react";
import { ParallaxBanner } from "react-scroll-parallax";

const RoomsSplide = () => {
  useEffect(() => {
    new Splide(".splide", {
      type: "loop",
      arrows: false,
      pagination: true,
      autoplay: true,
      interval: 3000,
    }).mount();
  }, []);

  return (
    <section id="spaWellnes" className="text-black padding-main">
      <MotionWrapper>
        <div className="splide">
          <div className="w-full h-full relative">
            <div className="splide__track">
              <ul className="splide__list">
                <li className="splide__slide">
                  <ParallaxBanner
                    layers={[
                      {
                        children: (
                          <img
                            src="https://aguasdeibiza.com/wp-content/uploads/2019/09/Aguasdeibiza-2019-054-SPA-MEDIA.jpg"
                            alt="Relaxing spa view"
                            className="w-full h-full object-cover"
                          />
                        ),
                        speed: -10,
                      },
                    ]}
                    className="aspect-[16/9]"
                  />
                </li>
                <li className="splide__slide">
                  <ParallaxBanner
                    layers={[
                      {
                        children: (
                          <img
                            src="https://aguasdeibiza.com/wp-content/uploads/2019/09/Aguasdeibiza-2019-054-SPA-MEDIA.jpg"
                            alt="Relaxing spa view"
                            className="w-full h-full object-cover"
                          />
                        ),
                        speed: -10,
                      },
                    ]}
                    className="aspect-[16/9]"
                  />
                </li>
                <li className="splide__slide">
                  <ParallaxBanner
                    layers={[
                      {
                        children: (
                          <img
                            src="https://aguasdeibiza.com/wp-content/uploads/2019/09/Aguasdeibiza-2019-054-SPA-MEDIA.jpg"
                            alt="Relaxing spa view"
                            className="w-full h-full object-cover"
                          />
                        ),
                        speed: -10,
                      },
                    ]}
                    className="aspect-[16/9]"
                  />
                </li>
              </ul>
            </div>
          </div>
        </div>
      </MotionWrapper>
    </section>
  );
};

export default RoomsSplide;
