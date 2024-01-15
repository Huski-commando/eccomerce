import React from "react";
import { Outlet } from "react-router-dom";
import { Header } from "../components";
import AdminNavbar from "../components/admin/AdminNavbar";

const Admin = () => {
  return (
    <>
      <Header />
      <div className="flex gap-10 justify-center bg-neutral-content px-6 h-[100vh]">
        <AdminNavbar />
        <Outlet />
      </div>
    </>
  );
};

export default Admin;
