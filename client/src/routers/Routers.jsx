import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../modules/auth/components/Login";
import { AdminRoutes } from "./Admin";
import { EmployeeRoutes } from "./Employee";
import DashboardPage from "../modules/admin/pages/DashboardPage";
import HomePage from "../modules/employee/pages/HomePage";
import ManageUsersPage from "../modules/admin/pages/ManageUsersPage";

export const Routers = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/" element={<AdminRoutes />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/usuarios" element={<ManageUsersPage />} />
        </Route>
        <Route path="/" element={<EmployeeRoutes />}>
          <Route path="/inicio" element={<HomePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
