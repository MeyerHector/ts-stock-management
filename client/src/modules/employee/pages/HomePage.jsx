import React from "react";
import Nav from "../../nav";
import Home from "../components/home";

const HomePage = () => {
  return (
    <div className="min-vh-100 bg-black">
      <Nav />
      <Home />
    </div>
  );
};

export default HomePage;
