import React from "react";
import { Link, NavLink } from "react-router-dom";
import { NavLinks } from "../../utilities";
import { FaShoppingCart } from "react-icons/fa";
import { AiOutlineHome } from "react-icons/ai";
import { BiSolidContact } from "react-icons/bi";
import { GrDeliver } from "react-icons/gr";

const Navbar = () => {
  const activeClass = ({ isActive }) =>
    isActive
      ? "btn lg:btn-md md:btn-sm capitalize btn-neutral"
      : "btn btn-ghost lg:btn-md md:btn-sm capitalize";

  const activeCart = ({ isActive }) =>
    isActive ? "btn capitalize btn-neutral btn-sm" : "btn btn-sm capitalize";

  const bottomNavActive = ({ isActive }) =>
    isActive ? "active bg-blue-200 border-none text-pink-600" : " text-black";

  return (
    <nav className="bg-base-300 w-full mt-8">
      <div className="navbar align-element max-w-6xl mx-auto  max-sm:px-4 max-xl:px-12">
        {/* START NAVBAR */}
        <div className="navbar-start">
          <Link
            to="/"
            className="xl:text-lg text-xl bg-primary text-white py-2 px-4 flex items-center rounded-md uppercase"
          >
            Shopify
          </Link>
        </div>

        {/* MIDDLE NAVBAR */}
        <div className="navbar-center hidden md:flex ">
          {NavLinks.map((item) => {
            return (
              <NavLink to={item.path} key={item.id} className={activeClass}>
                {item.navItem}
              </NavLink>
            );
          })}
        </div>

        {/* END NAVBAR */}
        <div className="navbar-end hidden md:flex space-x-4">
          {/* 1. cart 2. orders 3. logout */}

          <span className="indicator">
            <span className="indicator-item badge badge-secondary">1</span>
            <NavLink to="cart" className={activeCart}>
              Cart <FaShoppingCart />
            </NavLink>
          </span>

          <NavLink to="order-history" className={activeClass}>
            Orders
          </NavLink>
        </div>

        {/* BOTTOM NAVIGATION */}
        <div className="btm-nav bg-base-200 md:hidden">
          <NavLink className={bottomNavActive} to="/">
            <AiOutlineHome size={20} />
            Home
          </NavLink>
          <NavLink className={bottomNavActive} to="contact">
            <BiSolidContact size={20} />
            Contact
          </NavLink>
          <NavLink className={bottomNavActive} to="cart">
            <span className="indicator">
              <span className="indicator-item badge badge-secondary badge-xs">
                20
              </span>
              <FaShoppingCart />
            </span>
            Cart
          </NavLink>
          <NavLink className={bottomNavActive} to="order-history">
            <GrDeliver size={20} />
            Order
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
