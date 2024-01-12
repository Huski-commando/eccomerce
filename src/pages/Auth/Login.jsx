import React, { useState } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { DevTool } from "@hookform/devtools";
import { formVariant, imageVariant } from "../../utilities";
import { toast } from "react-toastify";
import { Loader, Button } from "../../components";
import { FaGoogle } from "react-icons/fa";

import loginImg from "../../assets/images/login.png";

// DEFINING THE FORM SCHEMA
const schema = yup.object({
  email: yup
    .string()
    .email("Email format is not valid")
    .required("Email is required!"),
  password: yup.string().required("Password is required").min(8),
});

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(schema),
  });

  const { register, control, formState, handleSubmit } = form;
  const { errors, isSubmitting } = formState;

  const onSubmit = (data) => {
    console.log(data);
  };

  const handleGoogleLogin = () => {};

  return (
    <div className="max-w-5xl mx-auto flex justify-center items-center  h-[95vh] gap-4">
      {/* form */}
      <motion.div
        className="card w-[20rem] md:w-[30rem] bg-base-200 shadow-xl py-8"
        variants={imageVariant}
        initial="hidden"
        animate="visible"
      >
        <div className="w-full flex justify-center">
          <img className="w-40 h-40" src={loginImg} />
        </div>
        <motion.form
          noValidate
          className="flex flex-col gap-3 w-full px-12"
          onSubmit={handleSubmit(onSubmit)}
          variants={formVariant}
          initial="hidden"
          animate="visible"
        >
          <div className="flex flex-col gap-1">
            <input
              type="email"
              placeholder="Email"
              className="input input-bordered"
              {...register("email")}
            />
            <p className="text-error">{errors.email?.message}</p>
          </div>

          <div className="flex flex-col gap-1">
            <input
              type="password"
              placeholder="Password"
              className="input input-bordered"
              {...register("password")}
            />
            <p className="text-error">{errors.password?.message}</p>
          </div>

          <button className="btn btn-primary w-full text-lg uppercase">
            {/* {isSubmitting ? <Loader /> : "Login"} */}
            Login
          </button>
          <Link to="/">
            <div className="btn btn-neutral w-full text-lg uppercase">
              Back to Home
            </div>
          </Link>

          <p className="text-md hover:underline">
            <Link to="/reset">Reset Password</Link>
          </p>
        </motion.form>
        <p className="text-center py-2">-- OR --</p>
        {/* GOOGLE LOGIN BUTTON */}
        <div className="px-12">
          <Button
            className="flex justify-center gap-2 items-center btn bg-[#ff0000] text-white hover:bg-[#ff3838] hover text-lg"
            onClick={handleGoogleLogin}
          >
            <FaGoogle /> <span>Login With Google</span>
          </Button>
        </div>

        <div className="flex justify-center pt-4 gap-2">
          <p>Don't have an account?</p>
          <Link to="/register" className="hover:underline hover:text-slate-400">
            Register
          </Link>
        </div>
      </motion.div>

      <DevTool control={control} />
    </div>
  );
};

export default Login;
