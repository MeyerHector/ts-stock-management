import React from "react";
import { useForm } from "react-hook-form";
import adminServices from "../admin.services";
import { useNoti } from "../../../hooks/useNoti";

const NewUserForm = () => {
  const { register, handleSubmit, reset } = useForm();
  const noti = useNoti();
  const submitUser = (data) => {
    const registerUser = async () => {
      const res = await adminServices.registerUser(data);
      console.log(res);
      if (res.status !== 201) {
        return res.errors.map((error) => {
          noti(error.msg, "error");
        });
      }
      noti("Usuario registrado con éxito", "success");
      reset();
    };

    registerUser();
  };
  return (
    <form
      className="h-100 w-100 text-black"
      onSubmit={handleSubmit(submitUser)}
    >
      <div className=" d-flex flex-column h-100 w-100 justify-content-between">
        <span className="fs-3 fw-semibold text-white">
          Agregar nuevo usuario
        </span>
        <div className="form-floating  w-100 mt-4">
          <input
            {...register("name")}
            type="text"
            required={true}
            className="form-control"
            placeholder="Nombre"
          />
          <label htmlFor="floatingInput">Nombre</label>
        </div>
        <div className="form-floating w-100">
          <input
            {...register("surname")}
            type="text"
            required={true}
            className="form-control"
            placeholder="Apellido"
          />
          <label htmlFor="floatingInput">Apellido</label>
        </div>
        <div className="form-floating w-100">
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
        <div className="form-floating w-100">
          <input
            {...register("password")}
            autoComplete="off"
            type="password"
            required={true}
            className="form-control"
            placeholder="Contraseña"
          />
          <label htmlFor="floatingInput">Contraseña</label>
        </div>
        <div className="d-flex gap-2">
          <button
            type="button"
            onClick={reset}
            className="btn btn-outline-danger fw-semibold"
          >
            Borrar
          </button>
          <button type="submit" className="btn btn-dark w-100 fw-semibold">
            Registrar
          </button>
        </div>
      </div>
    </form>
  );
};

export default NewUserForm;
