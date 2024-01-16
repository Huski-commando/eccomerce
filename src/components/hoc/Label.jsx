import React from "react";

const Label = ({ children, className }) => {
  return (
    <label className={`${className} text-secondary font-semibold`}>
      {children}
    </label>
  );
};

export default Label;
