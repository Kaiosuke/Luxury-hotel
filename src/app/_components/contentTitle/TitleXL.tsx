import Link from "next/link";
import React from "react";
import MotionWrapper from "../MotionWrapper";

interface TLinkContext {
  href: string;
  content: string;
}

const TitleXL = ({
  title,
  links,
}: {
  title: string;
  links?: TLinkContext[];
}) => {
  return (
    <MotionWrapper className="lg:w-2/3 lg:px-0 padding-main m-auto text-center">
      <h2 className="text-size-5xl">{title}</h2>
      <div className="flex items-center gap-4 justify-center mt-6">
        {links &&
          links.map((value, index) => (
            <Link
              key={index}
              href={value.href}
              className="text-size-2xl block underline underline-offset-8"
            >
              {value.content}
            </Link>
          ))}
      </div>
    </MotionWrapper>
  );
};

export default TitleXL;
