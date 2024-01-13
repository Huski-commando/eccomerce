import React from "react";
import { NavLink } from "react-router-dom";
import { AiOutlineHome } from "react-icons/ai";
import { BiSolidContact } from "react-icons/bi";
import { FaShoppingCart } from "react-icons/fa";
import { MdAccountCircle } from "react-icons/md";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { formVariant, imageVariant } from "../../utilities";

const BottomNavigation = () => {
  const bottomNavActive = ({ isActive }) =>
    isActive
      ? "active bg-[#1c1c1c] border-none text-pink-600 text-xs"
      : "text-xs";

  const { isLoggedIn } = useSelector((state) => state.auth);

  return (
    <motion.div
      className="btm-nav bg-base-200 md:hidden"
      variants={formVariant}
      initial="hidden"
      animate="visible"
    >
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
          <FaShoppingCart size={20} />
        </span>
        Cart
      </NavLink>

      {isLoggedIn && (
        <NavLink className={bottomNavActive} to="account">
          <MdAccountCircle size={20} />
          Account
        </NavLink>
      )}
    </motion.div>
  );
};

export default BottomNavigation;
