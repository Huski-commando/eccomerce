import React from "react";
import { Outlet } from "react-router-dom";
import { Header } from "../components";
import AdminNavbar from "../components/admin/AdminNavbar";

const Admin = () => {
  return (
    <>
      <Header />
      <div className="flex ">
        <AdminNavbar />
        <Outlet />
      </div>
    </>
  );
};

export default Admin;
