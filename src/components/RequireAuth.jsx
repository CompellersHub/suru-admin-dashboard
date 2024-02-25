import React from "react";
import { useLocation, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const RequireAuth = ({ children }) => {
  const userToken = useSelector((state) => state.auth.userToken);
  const location = useLocation();

  if (!userToken) {
    return <Navigate to="/" state={{ path: location.pathname }} />;
  }

  return children;
};

export default RequireAuth;
