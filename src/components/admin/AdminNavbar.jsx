import React from "react";
import { NavLink } from "react-router-dom";
import Theme from "../header/Theme";

const AdminNavbar = () => {
  const activeNavLinks = ({ isActive }) =>
    isActive ? "text-red-500" : "text-white";

  return (
    <div className="mt-8 bg-neutral h-[96vh] flex basis-56  border-t-2 border-r-2 border-red-600 shadow-2xl shadow-zinc-900/50">
      <div className="flex flex-col gap-4 w-full">
        {/* HEADER */}
        <div className="uppercase border-b py-2 flex justify-between px-6 items-center">
          <p className="font-bold text-lg text-white">Admin View</p>
          <Theme />
        </div>

        <div className="flex flex-col gap-8 pl-8 pt-4">
          <NavLink to="" className="text-white">
            Admin Home
          </NavLink>
          <NavLink to="addProduct" className={activeNavLinks}>
            Add Products
          </NavLink>
          <NavLink to="viewProducts" className={activeNavLinks}>
            View Products
          </NavLink>
          <NavLink to="viewOrders" className={activeNavLinks}>
            Admin Orders
          </NavLink>
          <NavLink to="/" className="text-white">
            Back to User View
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default AdminNavbar;
