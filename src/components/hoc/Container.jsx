import React from "react";

const Container = ({ children, className }) => {
  return (
    <div
      className={`${className} my-14 shadow-zinc-900/50 shadow-md rounded-md`}
    >
      {children}
    </div>
  );
};

export default Container;
