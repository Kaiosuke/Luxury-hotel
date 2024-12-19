import React from "react";
import MotionWrapper from "../MotionWrapper";

const TitleNormal = ({ title }: { title: string }) => {
  return (
    <MotionWrapper className="lg:w-2/3 lg:px-0 padding-main m-auto">
      <p className="text-size-3xl text-center">{title}</p>
    </MotionWrapper>
  );
};

export default TitleNormal;
