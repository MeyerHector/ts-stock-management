import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import employeeServices from "../employee.services";
import { useNoti } from "../../../hooks/useNoti";

const NewProductForm = () => {
  const { register, handleSubmit, reset } = useForm();
  const [categories, setCategories] = useState([]);
  const noti = useNoti();

  useEffect(() => {
    const getCategories = async () => {
      const res = await employeeServices.getCategories();
      if (res.status !== 200) {
        return noti("Hubo un error al obtener las categorías", "error");
      }
      setCategories(res.data);
    };
    getCategories();
  }, []);

  const submitProduct = async (data) => {
    const res = await employeeServices.newProduct(data);
    if (res.status !== 201) {
      return res.errors.map((error) => noti(error.msg, "warning"));
    }
    noti("Equipo agregado con éxito", "success");
    reset();
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit(submitProduct)}
        className="border p-3 rounded"
      >
        <span className="fs-3 fw-semibold">Agregar nuevo equipo</span>
        <div className="form-floating  w-100 mt-4">
          <input
            {...register("name")}
            type="text"
            required={true}
            className="form-control"
            placeholder="Nombre"
          />
          <label htmlFor="floatingInput" className="text-secondary">
            Nombre
          </label>
        </div>
        <div className="form-floating  w-100 mt-4">
          <textarea
            {...register("description")}
            required={true}
            className="form-control"
            placeholder="Descripction"
          />
          <label htmlFor="floatingInput" className="text-secondary">
            Descripción (max 255 carácteres)
          </label>
        </div>
        <div className="w-100 mt-4">
          <select
            class="form-select py-3 text-secondary"
            defaultValue="default"
          >
            <option value={"default"} disabled>
              Categoría
            </option>
            {categories &&
              categories.map((category) => (
                <option
                  {...register("category_id")}
                  key={category.id}
                  value={category.id}
                >
                  {category.name}
                </option>
              ))}
          </select>
        </div>
        <div className="form-floating  w-100 mt-4">
          <input
            {...register("stock")}
            type="number"
            required={true}
            className="form-control"
            placeholder="stock"
          />
          <label htmlFor="floatingInput" className="text-secondary">
            Stock
          </label>
        </div>
        <button className="w-100 btn btn-outline-dark text-white border fw-semibold mt-4">
          Agregar
        </button>
      </form>
    </div>
  );
};

export default NewProductForm;
