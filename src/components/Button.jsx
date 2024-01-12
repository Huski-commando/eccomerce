import React, { useCallback } from "react";

const Button = ({ children, className, onClick }) => {
  // Using useCallback to optimize the onClick callback
  const handleClick = useCallback(() => {
    onClick();
  }, [onClick]);

  return (
    <div className={`${className} py-2 px-4`} onClick={handleClick}>
      {children}
    </div>
  );
};

export default Button;
