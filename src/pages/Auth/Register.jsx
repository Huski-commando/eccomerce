import React, { useState } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { DevTool } from "@hookform/devtools";
import { formVariant, imageVariant, passwordVariant } from "../../utilities";
import { toast } from "react-toastify";
import { Loader, Button, PasswordStrengthItem } from "../../components";
import { FaGoogle } from "react-icons/fa";

import loginImg from "../../assets/images/login.png";

const schema = yup.object({
  email: yup
    .string()
    .email("Email format is not valid")
    .required("Email is required!"),
  password: yup.string().required("Password is required!").min(8),
  cPassword: yup
    .string()
    .required("Confirm password is required!")
    .min(8)
    .oneOf([yup.ref("password"), null], "Password must match!"),
});

const Register = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showPasswordStrength, setShowPasswordStrength] = useState(false);
  const [pass, setPass] = useState("");
  const navigate = useNavigate();

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
      cPassword: "",
    },
    resolver: yupResolver(schema),
  });

  const { register, control, formState, handleSubmit } = form;
  const { errors } = formState;

  const onSubmit = (data) => {
    console.log(data);
  };

  const passwordStrengthConditions = {
    passLetter: pass.match(/^([a-z].*[A-Z])|([A-Z].*[a-z])/),
    passNumber: pass.match(/([0-9])/),
    passChar: pass.match(/([!,%,&,@,#,$,^,*,?,_,~])/),
    passLength: pass.length > 7,
  };

  const handlePasswordChange = (e) => {
    setPass(e.target.value);
  };

  return (
    <>
      {isLoading && <Loader />}
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
                onChange={handlePasswordChange}
                onFocus={() => setShowPasswordStrength(true)}
              />
              <p className="text-error">{errors.password?.message}</p>
            </div>
            <div className="flex flex-col gap-1">
              <input
                type="password"
                placeholder="Confirm Password"
                className="input input-bordered"
                {...register("cPassword")}
              />
              <p className="text-error">{errors.cPassword?.message}</p>
            </div>

            <button className="btn btn-primary w-full text-lg uppercase">
              {/* {isSubmitting ? <Loader /> : "Login"} */}
              Register
            </button>
          </motion.form>

          <div className="flex justify-center pt-4 gap-2 text-slate-500">
            <p>Already have an account?</p>
            <Link to="/login" className="hover:underline hover:text-slate-400">
              Login
            </Link>
          </div>

          {/* SHOW PASSWORD STRENGTH */}
          <div className="px-12 mt-3">
            {showPasswordStrength && (
              <motion.div
                variants={passwordVariant}
                initial="hidden"
                animate="visible"
                className="flex flex-col bg-slate-200 p-4 text-md rounded-md"
              >
                <p className="text-primary">Password strength indicator</p>
                <PasswordStrengthItem
                  condition={passwordStrengthConditions.passLetter}
                  text="Lowercase & Uppercase"
                />
                <PasswordStrengthItem
                  condition={passwordStrengthConditions.passNumber}
                  text="Numbers (0-9)"
                />
                <PasswordStrengthItem
                  condition={passwordStrengthConditions.passChar}
                  text="Special Character (!@#$%^&*)"
                />
                <PasswordStrengthItem
                  condition={passwordStrengthConditions.passLength}
                  text="At Least 8 Characters"
                />
              </motion.div>
            )}
          </div>
        </motion.div>

        <DevTool control={control} />
      </div>
    </>
  );
};

export default Register;
