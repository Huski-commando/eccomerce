import React from "react";
import { NavLink } from "react-router-dom";
import Theme from "../header/Theme";
import Container from "../hoc/Container";

const AdminNavbar = () => {
  const activeNavLinks = ({ isActive }) =>
    isActive
      ? "btn text-white bg-neutral text-md font-semibold tracking-widest"
      : " btn btn-base-content text-md font-semibold hover:bg-neutral tracking-widest";

  return (
    <Container className="hidden md:flex md:basis-52 xl:w-64">
      <div className="flex flex-col items-center w-full py-4 bg-base-100 rounded-md overflow-auto">
        {/* logo */}
        <div className="flex justify-between w-full border-b border-black py-4 px-3 text-secondary">
          <p className="font-bold text-xl text-primary tracking-wide">
            Admin View
          </p>
          <Theme />
        </div>
        {/* nav items */}
        <div className="py-4 flex flex-col gap-6 px-4">
          <NavLink
            to=""
            className="btn btn-base-content text-md font-semibold tracking-widest"
          >
            Admin Home
          </NavLink>
          <NavLink to="addProduct/ADD" className={activeNavLinks}>
            Add Product
          </NavLink>
          <NavLink to="viewProducts" className={activeNavLinks}>
            View Products
          </NavLink>
          <NavLink to="viewOrders" className={activeNavLinks}>
            View ORders
          </NavLink>
          <NavLink
            to="/"
            className={`btn btn-base-content text-md font-normal hover:bg-neutral tracking-widest`}
          >
            Back to Customer View
          </NavLink>
        </div>
      </div>
    </Container>
  );
};

export default AdminNavbar;
