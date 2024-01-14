import React, { useEffect, useState } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { DevTool } from "@hookform/devtools";
import { formVariant } from "../../utilities";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

import loginImg from "../../assets/images/login.png";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../firebase/config";
import { Loader, Title } from "../../components";

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
  const [isLoading, setIsLoading] = useState(false);

  const { register, control, formState, handleSubmit } = form;
  const { errors } = formState;

  const navigate = useNavigate();

  const { userId } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userId) {
      navigate("/");
    }
  }, [userId, navigate]);

  const onSubmit = (data) => {
    // console.log(data);
    let email = data.email;
    setIsLoading(true);

    sendPasswordResetEmail(auth, email)
      .then(() => {
        toast.info("Reset link has been sent to your email.");
        setIsLoading(false);
        navigate("/login");
      })
      .catch((error) => {
        setIsLoading(false);
        toast.error(error.message);
      });
  };

  return (
    <>
      {isLoading && <Loader />}
      <Title title="Reset Page" />

      <div className="max-w-5xl mx-auto flex justify-center items-center max-sm:h-[100vh] h-[80vh] gap-4">
        {/* form */}

        <motion.div
          className="card w-[20rem] md:w-[30rem] bg-base-200 shadow-md py-8"
          variants={formVariant}
          initial="hidden"
          animate="visible"
        >
          <div className="w-full flex justify-center">
            <img className="w-40 h-40" src={loginImg} />
          </div>

          <form
            noValidate
            className="flex flex-col gap-3 w-full px-12 max-sm:px-8"
            onSubmit={handleSubmit(onSubmit)}
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
              Reset
            </button>
          </form>

          <div className="flex justify-between pt-4 gap-2 text-slate-500 px-12">
            <Link to="/login" className="hover:underline hover:text-slate-400">
              -- Login
            </Link>
            <Link
              to="/register"
              className="hover:underline hover:text-slate-400"
            >
              -- Register
            </Link>
          </div>
        </motion.div>

        {/* <DevTool control={control} /> */}
      </div>
    </>
  );
};

export default Reset;
