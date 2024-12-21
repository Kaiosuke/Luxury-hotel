"use client";
import React from "react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import Link from "next/link";

import { FaArrowDownLong, FaChevronDown } from "react-icons/fa6";
import { useState } from "react";
import { BannerLayer, ParallaxBanner } from "react-scroll-parallax";

interface IHeroImage {
  image: string;
  title: string;
  linkContext: string;
  link?: string;
}

const HeroImage = ({ image, title, linkContext, link }: IHeroImage) => {
  const [dateCheckIn, setDateCheckIn] = useState<Date>();
  const [dateCheckOut, setDateCheckOut] = useState<Date>();

  const background: BannerLayer = {
    image: image,
    translateY: [0, 10],
    opacity: [1, 0.3],
    className: "overlay",
    scale: [1.05, 1, "easeOutCubic"],
    shouldAlwaysCompleteAnimation: true,
  };

  const headline: BannerLayer = {
    translateY: [0, 30],
    scale: [1, 1.05, "easeOutCubic"],
    shouldAlwaysCompleteAnimation: true,
    expanded: false,
    children: (
      <div className="absolute inset-0">
        <div className="absolute lg:bottom-[140px] bottom-[80px] padding-main">
          <h1 className="text-size-7xl max-w-[90%] lg:max-w-[60%] break-words bg-animate">
            {title}
          </h1>
          <Link
            href={link ? link : "#!"}
            className="text-base mt-6 md:text-lg flex items-center gap-4"
          >
            {linkContext}
            <FaArrowDownLong />
          </Link>
        </div>
      </div>
    ),
  };

  return (
    <section className="text-primary">
      <div className="relative">
        <ParallaxBanner
          layers={[background, headline]}
          className="h-screen bg-gray-900"
        />

        <div className="border-t border-white xl:px-28 md:px-10 px-6 absolute bottom-0 w-full lg:block hidden z-[2]">
          <div className="flex justify-between">
            <div className="h-20">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-[240px] justify-start text-left font-normal h-full border-none",
                      !dateCheckIn && "text-muted-foreground"
                    )}
                  >
                    {dateCheckIn ? (
                      format(dateCheckIn, "PPP")
                    ) : (
                      <div className="flex items-center gap-2">
                        <span className="text-xl"> Check-in </span>
                        <FaChevronDown />
                      </div>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 bg-primary" align="start">
                  <Calendar
                    mode="single"
                    selected={dateCheckIn}
                    onSelect={setDateCheckIn}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-[240px] justify-start text-left font-normal h-full border-none",
                      !dateCheckOut && "text-muted-foreground"
                    )}
                  >
                    {dateCheckOut ? (
                      format(dateCheckOut, "PPP")
                    ) : (
                      <div className="flex items-center gap-2">
                        <span className="text-xl"> Check-out </span>
                        <FaChevronDown />
                      </div>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 bg-primary" align="start">
                  <Calendar
                    mode="single"
                    selected={dateCheckOut}
                    onSelect={setDateCheckOut}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="h-20">
              <Button
                variant={"outline"}
                className="h-full border-none text-xl"
              >
                <Link href="#!" className="text-white">
                  Check-availability
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroImage;
