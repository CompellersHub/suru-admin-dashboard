import React, { Fragment, useState, useEffect } from "react";
import { BiHide } from "react-icons/bi";
import { FaRegEye } from "react-icons/fa";
import { Link } from "react-router-dom";
import suru from "../../assets/suru.png";
import logo from "../../assets/logo.png";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { authAction } from "../../store/auth-slice";
import { useNavigate, useLocation } from "react-router-dom";
import { api } from "../../hooks/api";

const SignIn = () => {
  const [viewPassword, setViewPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const user = useSelector((state) => state.auth.userToken);

  const redirectPath = location.state?.path || "/admin/dashboard";

  useEffect(() => {
    if (user) {
      navigate(redirectPath, { replace: true });
    }
  }, [user, redirectPath]);

  const setVeiw = () => {
    setViewPassword(true);
  };
  const setHide = () => {
    setViewPassword(false);
  };

  const signUpHandler = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(api.signin, {
        method: "POST",
        body: JSON.stringify({
          email: email,
          password: password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error);
      }

      if (data.data.super_admin || data.data.admin) {
        // console.log(data);
        toast.success("Login successfully");
        dispatch(
          authAction.login({
            user: data.data,
            userToken: data.accessToken,
            type: "admin",
          })
        );
        sessionStorage.setItem("userData", JSON.stringify(data));

        setTimeout(() => {
          navigate(redirectPath, { replace: true });
        }, 1000);
      } else {
        toast.error(`User is not an admin`);
      }
    } catch (err) {
      toast.error(`${err.message}`);
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
          <h2 className="text-2xl md:text-4xl font-bold text-navbar-color">
            Sign in to Suru
          </h2>
          <p className="text-gray-500 font-semibold">
            Welcome back! Please enter your details.
          </p>
        </div>

        {/* form */}
        <form
          onSubmit={signUpHandler}
          className="flex flex-col gap-5 w-full md:w-[70%] lg:w-[40%]"
        >
          <div className="flex flex-col gap-12">
            <input
              className="p-4 border-2 rounded-lg"
              type="email"
              placeholder="Email address"
              onChange={(event) => setEmail(event.target.value)}
            />
            <div className="flex relative">
              <input
                className="p-4 w-full border-2 rounded-md"
                type={viewPassword ? " text" : "password"}
                placeholder="Password"
                onChange={(event) => setPassword(event.target.value)}
              />
              {!viewPassword && (
                <button
                  onClick={setVeiw}
                  type="button"
                  className="absolute text-xl text-gray-600 right-5 top-[50%] -translate-y-[50%]"
                >
                  <BiHide />
                </button>
              )}
              {viewPassword && (
                <button
                  onClick={setHide}
                  type="button"
                  className="absolute text-xl text-gray-600 right-5 top-[50%] -translate-y-[50%]"
                >
                  <FaRegEye />
                </button>
              )}
            </div>
          </div>

          {/* forgot password link */}
          {/* <Link
            to="/forgot-password"
            className="self-end text-navbar-color font-semibold"
          >
            Forgot Password
          </Link> */}

          {/* submit button */}
          <button className="bg-navbar-color p-4 rounded-full text-white font-semibold transition-all duration-200 border-navbar-color border hover:text-navbar-color hover:bg-white">
            {loading ? "Loading..." : "Login"}
          </button>

          <div className="flex self-center gap-2">
            <p>Dont have an account?</p>
            <Link className="text-navbar-color" to="/sign-up/admin">
              Signup
            </Link>
          </div>
        </form>

        <ToastContainer position="top-right" />
      </section>
    </Fragment>
  );
};

export default SignIn;
