import React from "react";
import Nav from "../../nav";
import Dashboard from "../components/Dashboard";

const DashboardPage = () => {
  return (
    <div className="min-vh-100 bg-black">
      <Nav />
      <Dashboard />
    </div>
  );
};

export default DashboardPage;
