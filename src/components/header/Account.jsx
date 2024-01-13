import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Account = () => {
  const { userId } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userId) {
      toast.info("Login to access the account info");
      navigate("/");
    }
  }, [userId, navigate]);

  if (!userId) {
    // Don't return null, as it may interfere with the rendering
    return <div>Loading...</div>; // or any loading indicator you prefer
  }

  return <div>Account</div>;
};

export default Account;
