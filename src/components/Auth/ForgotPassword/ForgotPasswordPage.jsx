import React, { Fragment, useState } from "react";
import ForgotPasswordForm from "./ForgotPasswordForm";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const ForgotPasswordPage = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const submitEmailHandler = async (email) => {
    console.log(email);

    try {
      setLoading(true);
      const response = await fetch(
        "https://suru-backends.onrender.com/api/forgotpassword",
        {
          method: "POST",
          body: JSON.stringify({
            email: email,
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
      navigate("/reset-password");
    } catch (err) {
      toast.error(`${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Fragment>
      <ForgotPasswordForm onSubmit={submitEmailHandler} loading={loading} />
      <ToastContainer position="top-right" />
    </Fragment>
  );
};

export default ForgotPasswordPage;
