import React from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { DevTool } from "@hookform/devtools";
import { formVariant, imageVariant } from "../../utilities";
import { toast } from "react-toastify";
import { Loader, Button } from "../../components";
import { FaGoogle } from "react-icons/fa";

import loginImg from "../../assets/images/login.png";

const schema = yup.object({
  email: yup
    .string()
    .email("Email format is not valid")
    .required("Email is required!"),
});

const Reset = () => {
  const form = useForm({
    defaultValues: {
      email: "",
    },
    resolver: yupResolver(schema),
  });

  const { register, control, formState, handleSubmit } = form;
  const { errors } = formState;

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="max-w-5xl mx-auto flex justify-center items-center  h-[80vh] gap-4">
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

          <button className="btn btn-primary w-full text-lg uppercase">
            {/* {isSubmitting ? <Loader /> : "Login"} */}
            Reset
          </button>
        </motion.form>

        <div className="flex justify-between pt-4 gap-2 text-slate-500 px-12">
          <Link to="/login" className="hover:underline hover:text-slate-400">
            -- Login
          </Link>
          <Link to="/register" className="hover:underline hover:text-slate-400">
            -- Register
          </Link>
        </div>
      </motion.div>

      <DevTool control={control} />
    </div>
  );
};

export default Reset;
