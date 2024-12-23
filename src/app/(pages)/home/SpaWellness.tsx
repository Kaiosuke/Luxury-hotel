import MotionWrapper from "@/app/_components/MotionWrapper";
import SplideImage from "@/app/_components/SplideImage";
import data from "@/app/data.json";
import "@splidejs/splide/dist/css/themes/splide-default.min.css";
import Link from "next/link";

const SpaWellnessSection = () => {
  const { images } = data;
  return (
    <section id="spaWellnes" className="text-black padding-main">
      <div className="lg:w-3/4 lg:h-5/6 w-full h-full relative">
        <SplideImage images={images} splideClass="spaWellnes" />
        <div className="absolute -right-[220px] top-1/2 -translate-y-1/2 hidden lg:block">
          <MotionWrapper className="w-[400px]">
            <span className="text-white">Spa & Wellnes</span>
            <h2
              className="lg:text-5xl font-medium my-6"
              style={{ lineHeight: "66px" }}
            >
              A marine space to treat yourself and find your balance
            </h2>
            <Link
              href="#!"
              className="text-white underline text-2xl font-thin "
            >
              View More
            </Link>
          </MotionWrapper>
        </div>
      </div>
      <MotionWrapper className="block lg:hidden mt-16">
        <span>Spa & Wellnes</span>
        <h2 className="text-size-4xl mt-2">
          A marine space to treat yourself and find your balance
        </h2>
        <Link href="#!" className="text-white underline text-2xl font-thin">
          View More
        </Link>
      </MotionWrapper>
    </section>
  );
};

export default SpaWellnessSection;
