import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import suru from "../../../../assets/suru.png";
import logo from "../../../../assets/logo.png";
import resetSuccess from "../../../../assets/reset-success.png";

const ResetSuccess = () => {
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

      <section className="flex flex-col gap-10 items-center mt-20 px-5">
        <div>
          <img src={resetSuccess} alt="forgot" />
        </div>

        <div className="flex flex-col items-center gap-3 text-gray-600">
          <h3 className="text-3xl font-bold text-navbar-color">
            Congratulations
          </h3>
          <p>Your Password has been reset successfully</p>
        </div>

        {/* forget button */}
        <Link
          to="/sign-in/buyer"
          className="text-center bg-navbar-color p-4 w-[80%] lg:max-w-[30%] rounded-full shadow-lg text-white font-semibold transition-all duration-200 border-navbar-color border hover:text-navbar-color hover:bg-white"
        >
          Back to Login
        </Link>
      </section>
    </Fragment>
  );
};

export default ResetSuccess;
