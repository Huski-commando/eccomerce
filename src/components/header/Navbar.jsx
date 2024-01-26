import React from "react";
import { Link, NavLink } from "react-router-dom";
import { NavLinks, headerVariants } from "../../utilities";
import { FaShoppingCart } from "react-icons/fa";

import Theme from "./Theme";
import { motion } from "framer-motion";
import BottomNavigation from "./BottomNavigation";
import { useSelector } from "react-redux";
import ActiveUsers from "./ActiveUsers";

const Navbar = () => {
  const { isLoggedIn } = useSelector((state) => state.auth);

  const activeClass = ({ isActive }) =>
    isActive
      ? "btn lg:btn-md md:btn-sm capitalize btn-neutral xl:text-lg"
      : "btn btn-ghost lg:btn-md md:btn-sm capitalize xl:text-lg";

  const activeCart = ({ isActive }) =>
    isActive
      ? "btn capitalize btn-neutral btn-sm xl:text-md"
      : "btn btn-sm capitalize xl:text-md";

  return (
    <>
      <motion.nav
        className="bg-base-300 w-full mt-8 md:fixed top-0 z-10"
        variants={headerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="navbar align-element max-w-6xl mx-auto  max-sm:px-4 max-xl:px-12">
          {/* START NAVBAR */}
          <div className="navbar-start max-sm:w-full flex justify-between">
            <Link
              to="/"
              className="xl:text-lg text-xl bg-primary text-white py-2 px-4 flex items-center rounded-md font-semibold tracking-widest uppercase"
            >
              Shopify
            </Link>
            <span className="md:hidden flex">
              <Theme />
            </span>
          </div>

          {/* MIDDLE NAVBAR */}
          <div className="navbar-center hidden md:flex ">
            <div></div>
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
            <Theme />
            <span className="indicator">
              <span className="indicator-item badge badge-secondary">1</span>
              <NavLink to="cart" className={activeCart}>
                Cart <FaShoppingCart />
              </NavLink>
            </span>
            {/* 
            {isLoggedIn && (
              <NavLink to="order-history" className={activeClass}>
                Orders
              </NavLink>
            )} */}
            {isLoggedIn && (
              <NavLink to="order-history" className={activeClass}>
                Orders
              </NavLink>
            )}
          </div>
        </div>
      </motion.nav>
      {/* BOTTOM NAVIGATION */}
      <BottomNavigation />
    </>
  );
};

export default Navbar;
