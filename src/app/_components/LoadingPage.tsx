import React from "react";

const LoadingPage = () => {
  return (
    <div className="fixed inset-0 z-[9999]">
      <div className=" flex space-x-2 justify-center items-center bg-secondary h-screen dark:invert">
        <span className="sr-only">Loading...</span>
        <div className="h-8 w-8 bg-primary rounded-full animate-bounce [animation-delay:-0.3s]"></div>
        <div className="h-8 w-8 bg-primary rounded-full animate-bounce [animation-delay:-0.15s]"></div>
        <div className="h-8 w-8 bg-primary rounded-full animate-bounce"></div>
      </div>
    </div>
  );
};

export default LoadingPage;
