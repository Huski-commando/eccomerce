import React from "react";
import { useSelector } from "react-redux";

const allowedEmails = import.meta.env.VITE_ALLOWED_ADMIN_EMAIL;

const AdminOnlyRoute = ({ children }) => {
  const userEmail = useSelector((state) => state.auth.email);

  if (allowedEmails.includes(userEmail)) {
    return children;
  }
  return null;
};

export default AdminOnlyRoute;
