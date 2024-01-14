import React, { memo, useEffect, useState } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { DevTool } from "@hookform/devtools";
import { formVariant } from "../../utilities";
import { toast } from "react-toastify";
import { Loader, Button, Title } from "../../components";
import { FaGoogle } from "react-icons/fa";
import { useSelector } from "react-redux";
import loginImg from "../../assets/images/login.png";
import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../../firebase/config";

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
  const navigate = useNavigate();
  const { userId } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userId) {
      navigate("/");
    }
  }, [userId, navigate]);

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
    let email = data.email;
    let password = data.password;
    setIsLoading(true);

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        setIsLoading(false);
        navigate("/");
        toast.success("User logged in successfully...");
      })
      .catch((error) => {
        setIsLoading(false);
        toast.error(error.message);
      });
  };

  // USER LOGIN WITH GOOGLE
  const handleGoogleLogin = () => {
    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        toast.success("User logged in successfully...");
        navigate("/");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <>
      {isLoading && <Loader />}
      <Title title="Login Page" />
      <div className="max-w-5xl mx-auto flex justify-center items-center max-sm:h-[100vh] h-[95vh] gap-4 mb-2">
        {/* form */}
        <motion.div
          className="card w-[20rem] bg-base-200 md:w-[30rem] shadow-sm hover:shadow-md  py-8 max-sm:py-4"
          variants={formVariant}
          initial="hidden"
          animate="visible"
        >
          <div className="w-full flex justify-center">
            <img className="w-40 h-40" src={loginImg} />
          </div>
          <form
            noValidate
            className="flex flex-col gap-3 w-full px-8 md:px-12"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="flex flex-col gap-1">
              <input
                type="email"
                placeholder="Email"
                className="input input-bordered py-2"
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

            <button className="btn btn-primary w-full max-sm:text-md text-lg uppercase">
              {/* {isSubmitting ? <Loader /> : "Login"} */}
              Login
            </button>
            <Link to="/">
              <div className="btn btn-neutral w-full max-sm:text-md text-lg uppercase">
                Back to Home
              </div>
            </Link>

            <p className="max-sm:text-sm text-md hover:underline">
              <Link to="/reset">Reset Password</Link>
            </p>
          </form>
          <p className="text-md text-center py-2">-- OR --</p>
          {/* GOOGLE LOGIN BUTTON */}
          <div className="px-12 max-sm:px-8">
            <Button
              className="flex justify-center gap-2 items-center btn bg-[#ff0000] text-white hover:bg-[#ff3838] hover text-lg"
              onClick={handleGoogleLogin}
            >
              <FaGoogle />{" "}
              <span className="max-sm:text-sm">Login With Google</span>
            </Button>
          </div>

          <div className="flex justify-center pt-4 gap-2 max-sm:text-sm">
            <p>Don't have an account?</p>
            <Link
              to="/register"
              className="hover:underline hover:text-slate-400 max-sm:underline"
            >
              Register
            </Link>
          </div>
        </motion.div>

        {/* <DevTool control={control} /> */}
      </div>
    </>
  );
};

export default memo(Login);
