import React, { useState, useRef } from "react";
import otpGuy from "../../../assets/otp-guy.png";
import { Link } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import { useSelector } from "react-redux";

const OtpForm = ({ length = 6, onSubmit, onRequest, loading }) => {
  const user = useSelector((state) => state.signUp);
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

  return (
    <form
      onSubmit={(event) => onSubmit(event, otp)}
      className="flex items-center flex-col gap-10 mb-10"
    >
      <div className="flex flex-col items-center gap-3">
        <img className="w-32 md:w-40" src={otpGuy} alt="thumbs up" />
        {user.exists ? (
          <p>Please click "Request new Otp" to request for an Otp code</p>
        ) : (
          <p>LOIGIN OTP HAS BEEN SENT TO YOUR EMAIL ADDRESS</p>
        )}
      </div>
      <div className="flex gap-3 ">
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
      <button className="bg-navbar-color w-full p-3 transition-all duration-200 rounded-md text-white border border-navbar-color hover:text-navbar-color hover:bg-white">
        {loading === "verify_otp" ? "verifying" : "Submit Otp"}
      </button>
      <button
        type="button"
        onClick={onRequest}
        className="w-full -mt-5 p-3 transition-all duration-200 rounded-md  border border-navbar-color text-navbar-color bg-white"
      >
        {loading === "request_otp" ? "Requesting" : "Request new Otp"}
      </button>
      <Link to="/" className="flex items-center text-navbar-color text-sm">
        <IoIosArrowBack />
        GO BACK TO LOGIN PAGE
      </Link>
    </form>
  );
};

export default OtpForm;
