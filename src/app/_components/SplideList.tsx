import { AspectRatio } from "@/components/ui/aspect-ratio";
import { IRooms } from "@/interfaces";
import Image from "next/image";
import Link from "next/link";
import MotionWrapper from "./MotionWrapper";
import Splide from "@splidejs/splide";
import "@splidejs/splide/dist/css/themes/splide-default.min.css";
import { useEffect } from "react";

const SplideList = ({ dataList }: { dataList: IRooms[] }) => {
  useEffect(() => {
    new Splide(".splide111", {
      type: "loop",
      arrows: false,
      pagination: true,
      autoplay: true,
      interval: 3000,
    }).mount();
  }, []);

  return (
    <>
      <div className="splide splide111">
        <div className="w-full h-full relative">
          <div className="splide__track">
            <ul className="splide__list">
              {dataList.map((data) => (
                <li key={data.id} className="splide__slide">
                  <MotionWrapper key={data.id}>
                    <Link
                      href="#!"
                      className="relative group/data cursor-pointer"
                    >
                      <AspectRatio
                        ratio={8 / 10}
                        className="bg-muted overflow-hidden overlay"
                      >
                        <Image
                          src={data.thumbnail}
                          alt={data.title}
                          fill
                          className="h-full w-full object-cover group-hover/data:scale-110 animation-slow"
                        />
                      </AspectRatio>

                      <div className="absolute top-1/2 px-10 text-center group-hover/data:translate-y-[-100px] animation-slow z-[2]">
                        <h4 className="text-size-5xl">{data.title}</h4>
                        <p className="opacity-0 group-hover/data:opacity-100 animation-slow select-none pt-4">
                          {data.description}
                        </p>
                      </div>
                    </Link>
                  </MotionWrapper>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default SplideList;
