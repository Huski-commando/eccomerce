import React from "react";
import { useDispatch } from "react-redux";
import { toggleTheme } from "../../redux/slice/themeSlice";
import { BsMoonFill, BsSunFill } from "react-icons/bs";

const Theme = () => {
  const dispatch = useDispatch();

  const handleToggle = () => {
    dispatch(toggleTheme());
  };
  return (
    <div className="border p-2 flex justify-center items-center border-black rounded-md ">
      <label className="swap swap-rotate">
        <input type="checkbox" onClick={handleToggle} />
        {/* sun icon*/}
        <BsSunFill className="swap-on h-4 w-4" />
        {/* moon icon*/}
        <BsMoonFill className="swap-off h-4 w-4" />
      </label>
    </div>
  );
};

export default Theme;
