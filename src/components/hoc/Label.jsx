import React from "react";

const Label = ({ children, className }) => {
  return (
    <label className={`${className} text-black font-semibold`}>
      {children}
    </label>
  );
};

export default Label;
