import React from "react";
import data from "@/app/data.json";
import Link from "next/link";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import Image from "next/image";

const Offers = () => {
  const { packages } = data;
  return (
    <section className="padding-main text-white">
      <div className="grid lg:grid-cols-3 gap-6 grid-cols-1">
        {packages.map((pack) => (
          <div key={pack.id}>
            <Link href="#!" className="relative group/pack cursor-pointer">
              <AspectRatio
                ratio={8 / 10}
                className="bg-muted overflow-hidden overlay sm:ratio-[16/9] md:ratio-[16/9] lg:ratio-[8/10]"
              >
                <Image
                  src={pack.image}
                  alt={pack.title}
                  fill
                  className="h-full w-full object-cover group-hover/pack:scale-110 animation-slow"
                />
              </AspectRatio>
              <div className="absolute top-8 left-8 z-[2]">
                <h4 className="text-size-2xl">{pack.title}</h4>
                <span className="text-sm font-mono">{pack.discount}</span>
              </div>
              <div className="absolute bottom-9 left-8 z-[2] flex flex-col gap-4 ">
                {pack.description.map((des, index) => (
                  <p
                    key={index}
                    className="text-sm font-light opacity-0 group-hover/pack:opacity-100 animation-normal"
                  >
                    {des}
                  </p>
                ))}
                <span className="text-xl opacity-0 group-hover/pack:opacity-100 animation-normal pt-4">
                  Book Now
                </span>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Offers;
