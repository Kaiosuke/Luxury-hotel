import Link from "next/link";
import React from "react";
import { ParallaxBanner } from "react-scroll-parallax";
import MotionWrapper from "./MotionWrapper";

const ThumbnailImage = ({
  image,
  title,
  link,
  linkContent,
}: {
  image: string;
  title: string;
  link?: string;
  linkContent?: string;
}) => {
  return (
    <MotionWrapper>
      <div className="relative overlay">
        <ParallaxBanner
          layers={[
            {
              title: `${title}`,
              image: `${image}`,
              speed: -20,
            },
          ]}
          className="aspect-[16/9]"
        />
        {linkContent && link && (
          <div className="absolute inset-0 flex items-center justify-center z-[10]">
            <Link href={link} className="text-size-4xl underline text-white">
              {linkContent}
            </Link>
          </div>
        )}
      </div>
    </MotionWrapper>
  );
};

export default ThumbnailImage;
