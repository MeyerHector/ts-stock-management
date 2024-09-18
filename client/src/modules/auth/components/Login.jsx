import React, { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { authContext } from "../../../context/auth/Context";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const { login, authState } = useContext(authContext);
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();

  useEffect(() => {
    if (authState.isLogged == true) {
      navigate(authState.role == "admin" ? "/dashboard" : "/inicio");
    }
  }, [authState]);

  const onSubmit = async (data) => {
    const response = await login(data);
    switch (response.role) {
      case "admin":
        navigate("/dashboard");
        break;
      case "employee":
        navigate("/inicio");
        break;
      default:
        break;
    }
  };
  return (
    <main className="min-vh-100 bg-black d-flex flex-column justify-content-center align-items-center bg-light">
      <span className="fs-3 w-50 text-center fw-bold text-light ">
        SISTEMA DE MANEJO DE STOCK DE EQUIPOS INFORMATICOS SMSEI{" "}
        <span className="bg-light rounded-circle">🥷</span>
      </span>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-25 h-100 d-flex flex-column align-items-center bg-black border border-primary rounded-4 p-3 mt-4"
      >
        <span className="fs-4 fw-semibold text-light">Iniciar sesión</span>
        <div className="form-floating my-3 w-100">
          <input
            {...register("username")}
            type="text"
            autoComplete="off"
            required={true}
            className="form-control"
            placeholder="Nombre de usuario"
          />
          <label htmlFor="floatingInput">Nombre de usuario</label>
        </div>
        <div className="form-floating mb-3 w-100">
          <input
            type="password"
            {...register("password")}
            autoComplete="off"
            required={true}
            className="form-control"
            placeholder="Contraseña"
          />
          <label htmlFor="floatingInput">Contraseña</label>
        </div>
        <button type="submit" className="btn btn-outline-primary w-100 fw-bold">
          Iniciar sesión
        </button>
      </form>
    </main>
  );
};

export default Login;
