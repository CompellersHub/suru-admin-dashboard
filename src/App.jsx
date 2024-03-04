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
import "react-toastify/dist/ReactToastify.css";
import { authAction } from "./store/auth-slice";
import { useDispatch } from "react-redux";
import RequireAuth from "./components/RequireAuth";

function App() {
  const dispatch = useDispatch();

  const userData = JSON.parse(sessionStorage.getItem("userData"));

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
      <Route path="*" element={<SignInPage />} />
      <Route
        path="admin/dashboard"
        element={
          <RequireAuth>
            <DashboardPage />
          </RequireAuth>
        }
      />
      <Route
        path="vendor/details/:vendorId"
        element={
          <RequireAuth>
            <VendorDetailsPage />
          </RequireAuth>
        }
      />
      <Route
        path="product/details/:category/:productId"
        element={
          <RequireAuth>
            <ProductDetailsPage />
          </RequireAuth>
        }
      />
      <Route
        path="orders/details/:orderId"
        element={
          <RequireAuth>
            <OrderDetailsPage />
          </RequireAuth>
        }
      />
      <Route
        path="upload/details/:category/:productId"
        element={
          <RequireAuth>
            <UploadDetailsPage />
          </RequireAuth>
        }
      />
      <Route
        path="withdrawal/details/:vendorId"
        element={
          <RequireAuth>
            <WithdrawalDetailsPage />
          </RequireAuth>
        }
      />
    </Routes>
  );
}

export default App;
