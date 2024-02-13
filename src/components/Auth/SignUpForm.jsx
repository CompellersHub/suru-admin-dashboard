import React, { useState } from "react";
import { Link } from "react-router-dom";
import { BiHide } from "react-icons/bi";
import { FaRegEye } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";

const SignUpForm = (props) => {
  const [viewPassword, setViewPassword] = useState(false);
  const [viewConfirmPassword, setViewConfirmPassword] = useState(false);
  const [focused, setFocused] = useState(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const checkFormValidity = (event) => {
    event.preventDefault();

    try {
      const formIsValid =
        fullName.trim().length !== 0 &&
        email.includes("@") &&
        phone.trim().length === 11 &&
        address.trim().length !== 0 &&
        password.trim().length >= 5 &&
        confirmPassword === password;

      if (!formIsValid) {
        throw new Error("Please make sure all forms are filled correctly");
      }
      if (password !== confirmPassword) {
        throw new Error("password does not match");
      }

      if (password.trim().length < 5) {
        throw new Error("password must be at least 5 characters");
      }

      const newPhone = `+234${phone.slice(1)}`;

      const formData = {
        name: fullName,
        email: email,
        password: password,
        address: address,
        confirm_password: confirmPassword,
        phone: newPhone,
      };

      console.log(formData);

      props.onSignUp(event, formData);
    } catch (err) {
      toast.error(`${err.message}`);
    }
  };

  return (
    <form
      onSubmit={checkFormValidity}
      className="flex flex-col gap-5 w-full md:w-[70%] lg:w-[40%]"
    >
      <div className="flex flex-col gap-8 text-sm md:text-base">
        {/* full name */}
        <div className="flex relative w-full">
          <input
            className="p-2 md:p-4 border-2 rounded-lg z-10 w-full transition-all duration-300"
            type="text"
            onFocus={() => setFocused("full__name")}
            onBlur={() => {
              setFocused(null);
            }}
            id="full__name"
            onChange={(event) => setFullName(event.target.value)}
          />
          <label
            className={`absolute ${
              focused === "full__name" || fullName.trim("") !== ""
                ? "-translate-y-[170%]"
                : "-translate-y-[50%]"
            } top-[50%]  bg-white px-1 left-5 z-30 transition-all duration-300 text-navbar-color`}
            htmlFor="full__name"
          >
            Full Name
          </label>
        </div>

        {/* email */}
        <div className="flex relative w-full">
          <input
            className="p-2 md:p-4 border-2 rounded-lg z-10 w-full transition-all duration-300"
            type="email"
            onFocus={() => setFocused("email")}
            onBlur={() => setFocused(null)}
            id="email"
            onChange={(event) => setEmail(event.target.value)}
          />
          <label
            className={`absolute ${
              focused === "email" || email.trim("") !== ""
                ? "-translate-y-[170%]"
                : "-translate-y-[50%]"
            } top-[50%] bg-white  px-1 left-5 z-30 transition-all duration-300 text-navbar-color`}
            htmlFor="email"
          >
            Email Address
          </label>
        </div>

        {/* phoneNumber */}
        <div className="flex relative w-full">
          <input
            className="p-2 md:p-4 border-2 rounded-lg z-10 w-full transition-all duration-300"
            type="number"
            onFocus={() => setFocused("phone")}
            onBlur={() => setFocused(null)}
            id="phone"
            onChange={(event) => setPhone(event.target.value)}
          />
          <label
            className={`absolute ${
              focused === "phone" || phone.trim("") !== ""
                ? "-translate-y-[170%]"
                : "-translate-y-[50%]"
            } top-[50%] bg-white px-1 left-5 z-30 transition-all duration-300 text-navbar-color`}
            htmlFor="phone"
          >
            Phone Number
          </label>
        </div>

        {/* Address */}
        <div className="flex relative w-full">
          <input
            className="p-2 md:p-4 border-2 rounded-lg z-10 w-full transition-all duration-300"
            type="text"
            onFocus={() => setFocused("address")}
            onBlur={() => setFocused(null)}
            id="address"
            onChange={(event) => setAddress(event.target.value)}
          />
          <label
            className={`absolute ${
              focused === "address" || address.trim("") !== ""
                ? "-translate-y-[170%]"
                : "-translate-y-[50%]"
            } top-[50%] bg-white px-1  left-5 z-30 transition-all duration-300 text-navbar-color`}
            htmlFor="address"
          >
            Address
          </label>
        </div>

        {/* password */}
        <div className="flex relative w-full">
          <input
            className="p-2 md:p-4 border-2 rounded-lg z-10 w-full transition-all duration-300 -placeholder:translate-y-[100%]"
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

        {/* confirm password */}
        <div className="flex relative w-full">
          <input
            className="p-2 md:p-4 border-2 rounded-lg z-10 w-full transition-all duration-300 -placeholder:translate-y-[100%]"
            type={!viewConfirmPassword ? `password` : "text"}
            onFocus={() => setFocused("confirm-password")}
            onBlur={() => {
              setFocused(null);
            }}
            id="confirm-password"
            onChange={(event) => setConfirmPassword(event.target.value)}
          />
          <label
            className={`absolute ${
              focused === "confirm-password" || confirmPassword.trim("") !== ""
                ? "-translate-y-[170%]"
                : "-translate-y-[50%]"
            } top-[50%] bg-white px-1 left-5 z-30 transition-all duration-300 text-navbar-color`}
            htmlFor="confirm-password"
          >
            Confirm Password
          </label>
          {!viewConfirmPassword && (
            <button
              onClick={() => setViewConfirmPassword(true)}
              type="button"
              className="absolute z-10 text-xl text-gray-600 right-5 top-[50%] -translate-y-[50%]"
            >
              <BiHide />
            </button>
          )}
          {viewConfirmPassword && (
            <button
              onClick={() => setViewConfirmPassword(false)}
              type="button"
              className="absolute z-10 text-xl text-gray-600 right-5 top-[50%] -translate-y-[50%]"
            >
              <FaRegEye />
            </button>
          )}
        </div>
      </div>

      {/* submit button */}
      <button className="bg-navbar-color self-center py-2 px-4 md:p-4 rounded-full text-white font-semibold transition-all duration-200 border-navbar-color border hover:text-navbar-color hover:bg-white">
        {props.isLoading ? "Loading..." : "Create Account"}
      </button>

      <div className="flex self-center gap-2">
        <p>Already have an account?</p>
        <Link className="text-navbar-color" to="/">
          Signin
        </Link>
      </div>
      <ToastContainer position="top-right" />
    </form>
  );
};

export default SignUpForm;
