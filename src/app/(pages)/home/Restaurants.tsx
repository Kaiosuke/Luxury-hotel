import MotionWrapper from "@/app/_components/MotionWrapper";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import Image from "next/image";
import React from "react";

const Restaurants = () => {
  return (
    <section className="text-black padding-main">
      <MotionWrapper className="grid grid-cols-1 lg:grid-cols-2 items-center">
        <div>
          <span>Restaurants</span>
          <h3 className="text-size-5xl">
            New restaurant in the Rooftop: one of the best gastronomic
            experiences in Ibiza
          </h3>
        </div>
        <div>
          <AspectRatio ratio={1 / 1} className="bg-muted">
            <Image
              src="https://aguasdeibiza.com/wp-content/uploads/2019/09/Aguasdeibiza-2019-221-edit-alta-tiny.png"
              alt="Photo by Drew Beamer"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="h-full w-full rounded-md object-cover"
            />
          </AspectRatio>
        </div>
      </MotionWrapper>
    </section>
  );
};

export default Restaurants;
