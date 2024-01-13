import React, { useEffect } from "react";
import { Title } from "../components";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const OrderHistory = () => {
  const { userId } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userId) {
      toast.warning("login to access order history page");
      navigate("/");
    }
  }, [userId, navigate]);

  return (
    <div>
      <Title title="Orders Page" />
      OrderHistory
    </div>
  );
};

export default OrderHistory;
