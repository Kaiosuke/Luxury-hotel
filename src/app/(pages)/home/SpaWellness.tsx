import MotionWrapper from "@/app/_components/MotionWrapper";
import Splide from "@splidejs/splide";
import "@splidejs/splide/dist/css/themes/splide-default.min.css";
import Link from "next/link";
import { useEffect } from "react";
import { ParallaxBanner } from "react-scroll-parallax";

const SpaWellnessSection = () => {
  useEffect(() => {
    new Splide(".splide", {
      type: "loop",
      arrows: false,
      pagination: false,
      autoplay: true,
      interval: 10000,
    }).mount();
  }, []);

  return (
    <section id="spaWellnes" className="text-black padding-main">
      <MotionWrapper>
        <div className="splide">
          <div className="lg:w-3/4 lg:h-5/6 w-full h-full relative">
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
                        speed: -15,
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
                        speed: -15,
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
                        speed: -15,
                      },
                    ]}
                    className="aspect-[16/9]"
                  />
                </li>
              </ul>
            </div>
            <div className="absolute -right-[220px] top-1/2 -translate-y-1/2 hidden lg:block">
              <div className="w-[400px]">
                <span>Spa & Wellnes</span>
                <h2 className="lg:text-5xl" style={{ lineHeight: "66px" }}>
                  A marine space to treat yourself and find your balance
                </h2>
                <Link
                  href="#!"
                  className="text-white underline text-2xl font-thin"
                >
                  View More
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="block lg:hidden mt-16">
          <span>Spa & Wellnes</span>
          <h2 className="text-size-4xl mt-2">
            A marine space to treat yourself and find your balance
          </h2>
          <Link href="#!" className="text-white underline text-2xl font-thin">
            View More
          </Link>
        </div>
      </MotionWrapper>
    </section>
  );
};

export default SpaWellnessSection;
