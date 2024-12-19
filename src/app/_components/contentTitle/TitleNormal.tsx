import React from "react";

const TitleNormal = ({ title }: { title: string }) => {
  return (
    <div className="lg:w-2/3 lg:px-0 padding-main m-auto">
      <p className="text-size-3xl text-center">{title}</p>
    </div>
  );
};

export default TitleNormal;
