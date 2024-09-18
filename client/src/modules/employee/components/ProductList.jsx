import React, { useEffect, useState } from "react";
import employeeServices from "../employee.services";
import { useNoti } from "../../../hooks/useNoti";
import Dialog from "@mui/material/Dialog";
import { useForm } from "react-hook-form";

const ProductList = () => {
  const noti = useNoti();
  const [products, setProducts] = useState([]);
  const [showProductInfo, setShowProductInfo] = useState(null);
  const { register, handleSubmit } = useForm();
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    console.log(showProductInfo);
  }, [showProductInfo]);

  useEffect(() => {
    const getProducts = async () => {
      const res = await employeeServices.getProducts();
      if (res.status !== 200) {
        return noti("Hubo un error al traer los equipos");
      }
      setProducts(res.data);
    };
    const getCategories = async () => {
      const res = await employeeServices.getCategories();
      if (res.status !== 200) {
        return noti("Hubo un error al obtener las categorías", "error");
      }
      setCategories(res.data);
    };
    getCategories();
    getProducts();
  }, []);

  const updateProduct = async (data) => {
    const res = await employeeServices.updateProduct(data, showProductInfo.id);
    if (res.status !== 204) {
      return res.errors.map((error) => noti(error.msg, "warning"));
    }
    setShowProductInfo(null);
    noti("Equipo actualizado exitosamente", "success");
  };
  return (
    <div className="border p-3">
      <span className="fs-3 fw-semibold">Equipos en stock</span>
      <table className="w-100 mt-2">
        <thead>
          <tr>
            <th>Equipo</th>
            <th>Stock</th>
            <th>Categoría</th>
            <th>Creado por</th>
            <th>El</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>{product.stock.stock}</td>
              <td>{product.category.name}</td>
              <td>
                {product.user.name} {product.user.surname}
              </td>
              <td>{product.createdAt}</td>
              <td className="d-flex ">
                <button
                  className="btn fw-semibold me-2 p-2 d-flex align-items-center"
                  type="button"
                  onClick={() => {
                    setShowProductInfo(product);
                  }}
                >
                  <span className="material-symbols-outlined text-light">
                    more_horiz
                  </span>
                </button>
                <button className="btn p-2 text-danger d-flex justify-content-center align-items-center">
                  <span class="material-symbols-outlined">delete</span>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showProductInfo && (
        <Dialog
          open={Boolean(showProductInfo)}
          onClose={() => setShowProductInfo(null)}
          sx={{
            "& .MuiDialog-container": {
              "& .MuiPaper-root": {
                backgroundColor: "#212529",
                color: "white",
                width: "100%",
                maxWidth: "1100px",
              },
            },
          }}
        >
          <div className="d-flex p-4">
            <div className="pe-4 w-75">
              <form onSubmit={handleSubmit(updateProduct)}>
                <span className="fs-4 fw-semibold">Editar equipo</span>
                <div className="form-floating  w-100 mt-2">
                  <input
                    {...register("name")}
                    type="text"
                    defaultValue={showProductInfo.name}
                    required={true}
                    className="form-control "
                    placeholder="Nombre"
                  />
                  <label htmlFor="floatingInput">Nombre</label>
                </div>
                <div className="form-floating  w-100 mt-4">
                  <textarea
                    {...register("description")}
                    style={{ height: "100px" }}
                    required={true}
                    defaultValue={showProductInfo.description}
                    className="form-control"
                    placeholder="Descripction"
                  />
                  <label htmlFor="floatingInput">Descripción</label>
                </div>
                <div className="form-floating  w-100 mt-4">
                  <input
                    {...register("stock")}
                    type="number"
                    required={true}
                    defaultValue={showProductInfo.stock.stock}
                    className="form-control"
                    placeholder="stock"
                  />
                  <label htmlFor="floatingInput">Stock</label>
                </div>
                <div className="w-100 mt-4">
                  <select
                    class="form-select py-3"
                    {...register("category_id")}
                    defaultValue={showProductInfo.category_id}
                  >
                    <option selected value={showProductInfo.category_id}>
                      {showProductInfo.category.name}
                    </option>
                    {categories.map((category) => (
                      <>
                        {category.name !== showProductInfo.category.name && (
                          <option key={category.id} value={category.id}>
                            {category.name}
                          </option>
                        )}
                      </>
                    ))}
                  </select>
                </div>
                <div className="w-100 d-flex justify-content-end mt-4">
                  <button
                    type="button"
                    onClick={() => setShowProductInfo(null)}
                    className="btn btn-danger me-2 fw-semibold"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="btn btn-success  fw-semibold"
                  >
                    Actualizar
                  </button>
                </div>
              </form>
              <div className="d-flex flex-column">
                <span className="fs-4 fw-semibold">Demás datos del equipo</span>
                <span className="mb-2">
                  <span className="fw-semibold">Creado por: </span>{" "}
                  {showProductInfo.user.name} {showProductInfo.user.surname} @
                  {showProductInfo.user.username}
                </span>
                <span className="mb-2">
                  <span className="fw-semibold">Fecha de creación:</span>{" "}
                  {showProductInfo.createdAt}
                </span>
                <span>
                  {" "}
                  <span className="fw-semibold">
                    Ultima actualización:
                  </span>{" "}
                  {showProductInfo.updatedAt}
                </span>
              </div>
            </div>
            <div className="w-25">
              <span className="fs-4 fw-semibold ">Historial del equipo</span>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <span className="fw-semibold">Alejandro Aquino</span> cambió
                  la descripción <span className="text-secondary">4h ago</span>
                </li>
                <li className="list-group-item">
                  <span className="fw-semibold">Fabián García</span> modificó el
                  stock de <span className="fw-semibold"> 100</span> a{" "}
                  <span className="fw-semibold">130</span>{" "}
                  <span className="text-secondary">18h ago</span>
                </li>
                <li className="list-group-item">
                  <span className="fw-semibold">Mauricio Barrientos</span>{" "}
                  modificó el stock de <span className="fw-semibold">400</span>{" "}
                  a <span className="fw-semibold">100</span>{" "}
                  <span className="text-secondary">1d ago</span>
                </li>
                <li className="list-group-item">
                  <span className="fw-semibold">Fabian García</span> registró el
                  equipo <span className="text-secondary">2d ago</span>
                </li>
              </ul>
            </div>
          </div>
        </Dialog>
      )}
    </div>
  );
};

export default ProductList;
