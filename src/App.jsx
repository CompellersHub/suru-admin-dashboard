import React, { useState } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import DashboardPage from "./pages/DashboardPage";
import VendorDetailsPage from "./pages/Details/VendorDetailsPage";
import ProductDetailsPage from "./pages/Details/ProductDetailsPage";
import UploadDetailsPage from "./pages/Details/UploadDetailsPage";
import WithdrawalDetailsPage from "./pages/Details/WithdrawalDetailsPage";
import OrderDetailsPage from "./pages/Details/OrderDetailsPage";
import SignInPage from "./pages/Auth/SignInPage";
import SignUpPage from "./pages/Auth/SignUpPage";
import AdminOtpPage from "./pages/Auth/AdminOtpPage";
import "react-toastify/dist/ReactToastify.css";
import { authAction } from "./store/auth-slice";
import { useDispatch } from "react-redux";

function App() {
  const dispatch = useDispatch();

  const userData = JSON.parse(localStorage.getItem("userData"));

  if (userData) {
    dispatch(
      authAction.login({
        user: userData.data,
        userToken: userData.accessToken,
        type: "admin",
      })
    );
  }

  return (
    <Routes>
      <Route path="/" element={<SignInPage />} />
      <Route path="sign-up/admin" element={<SignUpPage />} />
      <Route path="otp/admin" element={<AdminOtpPage />} />
      <Route path="admin/dashboard" element={<DashboardPage />} />
      <Route path="vendor/details/:vendorId" element={<VendorDetailsPage />} />
      <Route
        path="product/details/:category/:productId"
        element={<ProductDetailsPage />}
      />
      <Route path="orders/details/:orderId" element={<OrderDetailsPage />} />
      <Route
        path="upload/details/:category/:productId"
        element={<UploadDetailsPage />}
      />
      <Route
        path="withdrawal/details/:vendorId"
        element={<WithdrawalDetailsPage />}
      />
    </Routes>
  );
}

export default App;
