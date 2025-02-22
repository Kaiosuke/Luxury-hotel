import { AspectRatio } from "@/components/ui/aspect-ratio";

import { IRoomType } from "@/interfaces";
import Splide from "@splidejs/splide";
import "@splidejs/splide/dist/css/themes/splide-default.min.css";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import MotionWrapper from "./MotionWrapper";

const SplideList = ({
  dataList,
  id,
  splideClass,
}: {
  dataList: IRoomType[];
  id: string;
  splideClass: string;
}) => {
  useEffect(() => {
    new Splide(`.${splideClass}`, {
      type: "loop",
      arrows: false,
      pagination: false,
      autoplay: true,
      interval: 3000,
      perPage: 3,
      gap: "24px",
      breakpoints: {
        1024: {
          perPage: 2,
          gap: "16px",
        },
        768: {
          perPage: 1,
          gap: "16px",
        },
      },
    }).mount();
  }, []);

  return (
    <>
      <div className={`splide ${splideClass}`}>
        <div className="w-full h-full relative">
          <div className="splide__track">
            <ul className="splide__list">
              {dataList
                .filter((data) => data._id !== id)
                .map((data) => (
                  <li key={data._id} className="splide__slide">
                    <MotionWrapper key={data._id}>
                      <Link
                        href={`/rooms/${data._id}`}
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
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            className="h-full w-full object-cover group-hover/data:scale-110 animation-slow"
                          />
                        </AspectRatio>

                        <div className="absolute top-1/2 px-10 text-center group-hover/data:translate-y-[-100px] animation-slow z-[2] text-primary">
                          <h4 className="text-size-3xl">{data.title}</h4>
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
