import React, { Fragment, useState } from "react";
import { BiHide } from "react-icons/bi";
import { FaRegEye } from "react-icons/fa";
import { Link } from "react-router-dom";
import suru from "../../../../assets/suru.png";
import logo from "../../../../assets/logo.png";
import forgotGuy from "../../../../assets/forgot-guy.png";

const ForgotPassword = () => {
  const forgotHandler = (event) => {
    event.preventDefault();

    console.log("reset link sent to your email");
  };

  return (
    <Fragment>
      <header className="flex items-center justify-between gap-5 bg-navbar-color p-4 md:px-10">
        <div className="flex gap-3 items-center">
          <img src={logo} alt="logo" className="w-10 md:w-20" />
          <img src={suru} alt="company name" className="w-14 md:w-32 lg:w-40" />
        </div>
        <button className="bg-white text-navbar-color md:font-bold border-2 border-white transition-all duration-200 hover:bg-navbar-color hover:text-white p-2 md:px-4 rounded-full">
          Become a Vendor
        </button>
      </header>

      <section className="flex flex-col gap-10 items-center justify-center min-h-[100vh]  px-5">
        <h2 className="text-4xl font-bold text-navbar-color">
          Forget Password
        </h2>

        <div className="flex flex-col text-center text-gray-600">
          <p>We sent a password reset link to fortune........@gmail.com</p>
          <p>Click on the link in your email to reset your password</p>
        </div>

        <div>
          <img src={forgotGuy} alt="forgot" />
        </div>

        {/* forget button */}
        <button
          onClick={forgotHandler}
          className="bg-navbar-color p-4 w-[80%] lg:max-w-[30%] rounded-full shadow-lg text-white font-semibold transition-all duration-200 border-navbar-color border hover:text-navbar-color hover:bg-white"
        >
          Reset Password
        </button>
      </section>
    </Fragment>
  );
};

export default ForgotPassword;
