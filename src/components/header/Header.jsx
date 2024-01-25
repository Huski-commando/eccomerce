import React, { useEffect } from "react";
import { Link, NavLink, useNavigate, useNavigation } from "react-router-dom";
import { motion } from "framer-motion";
import { borderVariants, headerVariants } from "../../utilities";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../firebase/config";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { SET_ACTIVE_USER, SET_REMOVE_USER } from "../../redux/slice/authSlice";
import AdminButton from "../AdminButton";
import { AdminOnlyLink } from "../admin/AdminOnlyRoute";

const Header = () => {
  const navigate = useNavigate();
  const navigation = useNavigation();
  const isPageLoading = navigation.state === "loading";

  const dispatch = useDispatch();

  const { isLoggedIn, userName, userId } = useSelector((state) => state.auth);
  // console.log(isLoggedIn);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        navigate("/");
        toast.warning("User Logged out...");
        localStorage.removeItem("allowedUsers");
        sessionStorage.removeItem("singleProduct");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        try {
          const { displayName, email, uid } = user;
          let userName = "";

          if (displayName !== null) {
            userName = displayName;
          } else {
            const u1 = email?.substring(0, email.indexOf("@"));
            const uName =
              u1 && u1.length > 0
                ? u1.charAt(0).toUpperCase() + u1.slice(1)
                : "";
            userName = uName;
          }
          dispatch(
            SET_ACTIVE_USER({
              email: email,
              userName: userName,
              userId: uid,
            })
          );
          // console.log(userName);
        } catch (error) {
          toast.error(error.message);
        }
      } else {
        dispatch(SET_REMOVE_USER());
      }
    });
  }, []);

  return (
    <>
      {isPageLoading && <Loader />}
      <motion.header
        className="bg-neutral py-2 text-neutral-content h-8 fixed top-0  w-full"
        variants={headerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className=" flex md:justify-end sm:justify-end align-middle max-w-5xl mx-auto h-full">
          <motion.div
            className="flex gap-x-6 justify-center md:justify-end items-center md:px-28 max-sm:px-6 max-sm:w-[100vw]"
            variants={borderVariants}
            initial="hidden"
            animate="visible"
          >
            <AdminOnlyLink>
              <AdminButton />
            </AdminOnlyLink>

            {isLoggedIn ? (
              <h1 className="text-center text-sm">Hi {userName}</h1>
            ) : (
              <Link to="/login" className="text-xs sm:text-sm">
                Sign in / Register
              </Link>
            )}
            {isLoggedIn && (
              <Link to="/" onClick={handleLogout}>
                Logout
              </Link>
            )}
          </motion.div>
        </div>
      </motion.header>
    </>
  );
};

export default Header;
