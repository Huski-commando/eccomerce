import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Button from "../Button";

const allowedEmails = import.meta.env.VITE_ALLOWED_ADMIN_EMAIL;

const AdminOnlyRoute = ({ children }) => {
  const userEmail = useSelector((state) => state.auth.email);
  const navigate = useNavigate();

  const allowedUsers = allowedEmails.includes(userEmail);

  // Set the allowedUsers flag in the local storage right away
  if (allowedUsers) {
    localStorage.setItem("allowedUsers", true);
  }

  // else {
  //   localStorage.removeItem("allowedUsers");
  // }
  const getAllowedUsers = localStorage.getItem("allowedUsers", true);

  if (getAllowedUsers) {
    return children;
  } else if (!allowedUsers) {
    return (
      <section className="flex w-full h-[90vh] justify-center items-center">
        <div className="flex flex-col bg-slate-300 shadow-xl py-10 px-16 gap-6 rounded-md">
          <h2 className="text-3xl font-semibold">Permission denied!</h2>
          <p className="text-xl">This page can only be viewed by Admin user.</p>
          <Link to="/" className="btn btn-primary">
            &larr; Back to Home
          </Link>
        </div>
      </section>
    );
  }
};

export const AdminOnlyLink = ({ children }) => {
  const userEmail = useSelector((state) => state.auth.email);
  const navigate = useNavigate();

  const allowedUsers = allowedEmails.includes(userEmail);

  if (allowedUsers) {
    return children;
  }
  return null;
};

export default AdminOnlyRoute;

//

// return (
//   <div>
//     {navigate("/")}
//     {allowedUsers &&
//       toast.error(
//         "You are not authorized to access this page. Contact your administrator"
//       )}
//   </div>
// );
