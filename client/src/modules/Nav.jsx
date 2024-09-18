import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authContext } from "../context/auth/Context";

const Nav = () => {
  const { authState, logout } = useContext(authContext);
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate("/");
  };
  return (
    <header className="w-100 bg-black fw-bold d-flex justify-content-between px-4 py-2">
      <Link
        to={authState.role == "admin" ? "/dashboard" : "/inicio"}
        className="fs-semibold nav-link text-white d-flex align-items-center"
      >
        SMSEI <span className="ms-2 bg-light rounded-circle">🥷</span>
      </Link>
      <button
        type="button"
        className="btn text-white fw-bold"
        onClick={handleLogout}
      >
        Cerrar sesión
      </button>
    </header>
  );
};

export default Nav;
