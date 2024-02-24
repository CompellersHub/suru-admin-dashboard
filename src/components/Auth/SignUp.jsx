import React, { Fragment, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import suru from "../../assets/suru.png";
import logo from "../../assets/logo.png";
import SignUpForm from "./SignUpForm";
import { api } from "../../hooks/api";
import { useSelector, useDispatch } from "react-redux";
import { signUpAction } from "../../store/signup-slice";
import { Link } from "react-router-dom";

const SignUp = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.signUp);

  const signUpHandler = async (event, formData) => {
    event.preventDefault();

    try {
      setLoading(true);

      const response = await fetch(api.signup, {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error);
      }

      dispatch(
        signUpAction.setSignup({
          email: formData.email,
          name: formData.name,
          exists: false,
        })
      );
      toast.success("Signed up");
      setTimeout(() => {
        navigate("/otp/admin");
      }, 1000);
    } catch (err) {
      toast.error(`${err.message}`);

      if (err.message === "Phone number is already registered") {
        dispatch(
          signUpAction.setSignup({
            email: formData.email,
            name: formData.name,
            exists: true,
          })
        );
        navigate("/otp/admin");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Fragment>
      <header className="flex items-center justify-between gap-5 bg-navbar-color p-4 md:px-10">
        <Link to="/" className="flex gap-3 items-center">
          <img src={logo} alt="logo" className="w-10 md:w-20" />
          <img src={suru} alt="company name" className="w-14 md:w-32 lg:w-40" />
        </Link>
      </header>

      <section className="flex flex-col gap-10 items-center justify-center min-h-[100vh] py-10 px-5">
        <div className="flex flex-col gap-3 text-center">
          <h2 className="text-4xl font-bold text-navbar-color">
            Create an account with Suru
          </h2>
          <p className="text-gray-500 font-semibold">
            Hey! Setup your account to embark on this journey
          </p>
        </div>

        {/* form */}
        <SignUpForm onSignUp={signUpHandler} isLoading={loading} />
        <ToastContainer position="top-right" />
      </section>
    </Fragment>
  );
};

export default SignUp;
