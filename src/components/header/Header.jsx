import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-neutral py-2 text-neutral-content h-8  fixed top-0 w-full">
      <div className=" flex justify-center sm:justify-end align-middle max-w-5xl mx-auto h-full">
        <div className="flex gap-x-6 justify-center items-center max-sm:underline max-xl:px-28 ">
          <Link to="/login" className="hover:border-b text-xs sm:text-sm">
            Sign in / Register
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
