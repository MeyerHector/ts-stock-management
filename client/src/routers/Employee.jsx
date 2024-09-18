import React, { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { authContext } from "../context/auth/Context";

export const EmployeeRoutes = () => {
  const { authState } = useContext(authContext);
  return authState.role === "employee" ? <Outlet /> : <Navigate to="/" />;
};
