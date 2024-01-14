import React from "react";
import { NavLink } from "react-router-dom";
import DrawOutlineButton from "./hoc/DrawOutlineButton";

const AdminButton = () => {
  return (
    <div className="hidden md:flex">
      <DrawOutlineButton>
        <NavLink to="/admin" className="text-red-500">
          Admin
        </NavLink>
      </DrawOutlineButton>
    </div>
  );
};

export default AdminButton;
