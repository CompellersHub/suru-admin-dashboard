import React, { Fragment, useState } from "react";
import OtpForm from "./OtpForm";
import suru from "../../../assets/suru.png";
import logo from "../../../assets/logo.png";
import { ToastContainer, toast } from "react-toastify";
import { api } from "../../../hooks/api";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signUpAction } from "../../../store/signup-slice";

const OtpPage = () => {
  const user = useSelector((state) => state.signUp);
  const [loading, setLoading] = useState(null);
  const navigate = useNavigate();
  const dispacth = useDispatch();

  const submitHandler = async (event, otp) => {
    event.preventDefault();

    let otpValues = "";

    for (let i = 0; i < otp.length; i++) {
      otpValues += otp[i];
    }

    const otpNumbers = +otpValues;

    if (otpValues.split("").length === 6) {
      try {
        setLoading("verify_otp");
        const response = await fetch(api.verify_otp, {
          method: "POST",
          body: JSON.stringify({ otp: otpNumbers, email: user.email }),
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error);
        }

        toast.success("Verification Successful!");
        setTimeout(() => {
          navigate("/");
        }, 1000);
      } catch (err) {
        toast.error(`${err.message}`);
      } finally {
        setLoading(null);
      }
    } else {
      toast.error("Otp values not complete");
    }
  };

  const requestOtp = async () => {
    try {
      setLoading("request_otp");
      const response = await fetch(api.request_new_otp, {
        method: "POST",
        body: JSON.stringify({ email: user.email }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
      dispacth(
        signUpAction.setSignup({
          email: user.email,
          name: user.name,
          exists: false,
        })
      );

      toast.success("A new Otp has been sent to your email");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(null);
    }
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
      <div className="flex items-center justify-center translate-y-[20%] px-10">
        <OtpForm
          onSubmit={submitHandler}
          onRequest={requestOtp}
          loading={loading}
        />
      </div>
      <ToastContainer position="top-right" />
    </Fragment>
  );
};

export default OtpPage;
