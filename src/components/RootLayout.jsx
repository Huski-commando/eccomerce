import React from "react";
import { useNavigation, Outlet } from "react-router-dom";
import { Header, Footer } from "./index";
import Navbar from "./header/Navbar";

const RootLayout = () => {
  const navigation = useNavigation();
  const isPageLoading = navigation.state === "loading";

  return (
    <div>
      <Header />
      <Navbar />
      {isPageLoading ? <Loader /> : <Outlet />}

      <Footer />
    </div>
  );
};

export default RootLayout;
