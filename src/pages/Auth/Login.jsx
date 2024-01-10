import React from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { TextField } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { DevTool } from "@hookform/devtools";
import { formVariant, imageVariant } from "@/utilities";
import { toast } from "react-toastify";

// DEFINING THE FORM SCHEMA
const schema = yup.object({
  email: yup.string().email("Email format is not valid"),
});

const Login = () => {
  return <div>Login</div>;
};

export default Login;
