import React, { Fragment, useState } from "react";
import ResetPassword from "./ResetPassword";
import ResetSuccess from "./ResetSuccess";
import { ToastContainer, toast } from "react-toastify";

const ResetPasswordPage = () => {
  const [loading, setLoading] = useState(null);
  const [visible, setVisible] = useState("reset-password");

  const submitHandler = async (otp, password, email) => {
    event.preventDefault();

    let otpValues = "";

    for (let i = 0; i < otp.length; i++) {
      otpValues += otp[i];
    }

    const otpNumbers = +otpValues;

    if (otpValues.split("").length !== 6) {
      toast.error("Otp values incomplete");
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(
        "https://suru-backends.onrender.com/api/resetpassword",
        {
          method: "POST",
          body: JSON.stringify({
            email: email,
            OTP: otpNumbers,
            newPassword: password,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }
      setVisible("reset-success");
    } catch (err) {
      toast.error(`${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Fragment>
      {visible === "reset-password" ? (
        <ResetPassword onSubmit={submitHandler} loading={loading} />
      ) : (
        <ResetSuccess />
      )}
      <ToastContainer position="top-right" />
    </Fragment>
  );
};

export default ResetPasswordPage;
