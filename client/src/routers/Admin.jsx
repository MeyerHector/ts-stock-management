import React, { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { authContext } from "../context/auth/Context";

export const AdminRoutes = () => {
  const { authState } = useContext(authContext);
  return authState.role === "admin" ? <Outlet /> : <Navigate to="/" />;
};
