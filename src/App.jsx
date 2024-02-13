import React, { useState } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import DashboardPage from "./pages/DashboardPage";
import VendorDetailsPage from "./pages/Details/VendorDetailsPage";
import ProductDetailsPage from "./pages/Details/ProductDetailsPage";
import UploadDetailsPage from "./pages/Details/UploadDetailsPage";
import WithdrawalDetailsPage from "./pages/Details/WithdrawalDetailsPage";
import SignInPage from "./pages/Auth/SignInPage";
import SignUpPage from "./pages/Auth/SignUpPage";
import AdminOtpPage from "./pages/Auth/AdminOtpPage";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<SignInPage />} />
      <Route path="sign-up/admin" element={<SignUpPage />} />
      <Route path="otp/admin" element={<AdminOtpPage />} />
      <Route path="admin/dashboard" element={<DashboardPage />} />
      <Route path="vendor/details/:vendorId" element={<VendorDetailsPage />} />
      <Route
        path="product/details/:productId"
        element={<ProductDetailsPage />}
      />
      <Route path="upload/details/:productId" element={<UploadDetailsPage />} />
      <Route
        path="withdrawal/details/:vendorId"
        element={<WithdrawalDetailsPage />}
      />
    </Routes>
  );
}

export default App;
