import React from "react";
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <div className="text-white font-bold text-3xl ">
      <Link to="/" className="btn btn-primary">
        e<span className="">Shop</span>.
      </Link>
    </div>
  );
};

export default Logo;
