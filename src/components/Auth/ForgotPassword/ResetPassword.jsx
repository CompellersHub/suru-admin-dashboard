import React, { Fragment, useState, useRef } from "react";
import { BiHide } from "react-icons/bi";
import { FaRegEye } from "react-icons/fa";
import suru from "../../../../assets/suru.png";
import logo from "../../../../assets/logo.png";
import OtpForm from "../Otp/OtpForm";

const ResetPassword = ({ length = 6, onSubmit, loading }) => {
  const [focused, setFocused] = useState(null);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [viewPassword, setViewPassword] = useState(false);

  const [otp, setOtp] = useState(Array(length).fill(""));
  const inputRefs = useRef(
    Array(length)
      .fill(null)
      .map(() => React.createRef())
  );

  const handleInputChange = (index, value) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move focus to the next input
    if (value !== "" && index < length - 1) {
      inputRefs.current[index + 1].focus();
    }

    // Move focus to the previous input on delete
    if (value === "" && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleBackspace = (index) => {
    // Move focus to the previous input on backspace
    if (index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const signUpHandler = (event) => {
    event.preventDefault();

    onSubmit(otp, password, email);
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

      <section className="flex flex-col gap-10 items-center mt-20  py-10 px-5">
        <div className="flex flex-col gap-3 text-center">
          <h2 className="text-4xl font-bold text-navbar-color">
            Reset Password
          </h2>
          <p className="text-gray-500 font-semibold">
            Welcome back! Please enter your details.
          </p>
        </div>

        {/* form */}
        <form
          onSubmit={signUpHandler}
          className="flex flex-col  gap-5 w-full md:w-[70%] lg:w-[40%]"
        >
          <div className="flex flex-col gap-7 ">
            {/* OTP */}
            {/* <OtpForm /> */}
            <div className="flex gap-3 justify-between">
              {otp.map((digit, index) => (
                <input
                  className=" flex w-10 text-center text-navbar-color border border-navbar-color h-10 rounded-md"
                  key={index}
                  type="text"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleInputChange(index, e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "backspace") {
                      e.preventDefault();
                      handleBackspace(index);
                    } else if (e.key === "delete") {
                      e.preventDefault();
                      handleInputChange(index, "");
                    }
                  }}
                  ref={(el) => (inputRefs.current[index] = el)}
                />
              ))}
            </div>

            {/* email */}
            <input
              className="p-4 border-2 rounded-lg"
              type="email"
              placeholder="Email address"
              onChange={(event) => setEmail(event.target.value)}
            />

            {/* password */}
            <div className="flex relative w-full">
              <input
                className="p-4 border-2 rounded-lg z-10 w-full transition-all duration-300 -placeholder:translate-y-[100%]"
                type={!viewPassword ? `password` : "text"}
                onFocus={() => setFocused("password")}
                onBlur={() => {
                  setFocused(null);
                }}
                id="password"
                onChange={(event) => setPassword(event.target.value)}
              />
              <label
                className={`absolute ${
                  focused === "password" || password.trim("") !== ""
                    ? "-translate-y-[170%]"
                    : "-translate-y-[50%]"
                } top-[50%] bg-white px-1 left-5 z-30 transition-all duration-300 text-navbar-color`}
                htmlFor="password"
              >
                Password
              </label>
              {!viewPassword && (
                <button
                  onClick={() => setViewPassword(true)}
                  type="button"
                  className="absolute z-10 text-xl text-gray-600 right-5 top-[50%] -translate-y-[50%]"
                >
                  <BiHide />
                </button>
              )}
              {viewPassword && (
                <button
                  onClick={() => setViewPassword(false)}
                  type="button"
                  className="absolute z-10 text-xl text-gray-600 right-5 top-[50%] -translate-y-[50%]"
                >
                  <FaRegEye />
                </button>
              )}
            </div>
          </div>

          {/* submit button */}
          <button className="bg-navbar-color p-4 rounded-full text-white font-semibold transition-all duration-200 border-navbar-color border hover:text-navbar-color hover:bg-white">
            {loading ? "Loading..." : "Reset Password"}
          </button>
        </form>
      </section>
    </Fragment>
  );
};

export default ResetPassword;
