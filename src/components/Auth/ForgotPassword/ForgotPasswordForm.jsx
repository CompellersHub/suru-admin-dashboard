import React, { Fragment, useState } from "react";
import { BiHide } from "react-icons/bi";
import { FaRegEye } from "react-icons/fa";
import { Link } from "react-router-dom";
import suru from "../../../../assets/suru.png";
import logo from "../../../../assets/logo.png";

const ForgotPasswordForm = (props) => {
  const [email, setEmail] = useState("");

  const signUpHandler = (event) => {
    event.preventDefault();

    props.onSubmit(email);
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

      <section className="flex flex-col gap-10 items-center pt-40 min-h-[100vh] py-10 px-5 ">
        <div className="flex flex-col gap-3 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-navbar-color">
            Forgot Password
          </h2>
          <p className="text-gray-500 font-semibold">
            Enter Your Email Address to recover
          </p>
        </div>

        {/* form */}
        <form
          onSubmit={signUpHandler}
          className="flex flex-col gap-10 w-full md:w-[70%] lg:w-[40%]"
        >
          {/* email */}
          <input
            className="p-4 border-2 rounded-lg"
            type="email"
            placeholder="Email address"
            onChange={(event) => setEmail(event.target.value)}
          />

          {/* submit button */}
          <button className="bg-navbar-color p-3 md:p-4 rounded-full text-white font-semibold transition-all duration-200 border-navbar-color border hover:text-navbar-color hover:bg-white">
            {props.loading ? "Loading..." : "Reset Password"}
          </button>
        </form>
      </section>
    </Fragment>
  );
};

export default ForgotPasswordForm;
