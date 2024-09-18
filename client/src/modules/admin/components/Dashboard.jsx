import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import NewUserForm from "./NewUserForm";
import UsersList from "./UsersList";
import adminServices from "../admin.services";
import { useNoti } from "../../../hooks/useNoti";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const noti = useNoti();
  useEffect(() => {
    const fetchUsers = async () => {
      const res = await adminServices.getUsers();
      if (res.status !== 200) {
        return noti("Hubo un error al obtener los usuarios", "error");
      }
      setUsers(res.data);
    };
    fetchUsers();
  }, []);
  return (
    <main className="d-flex flex-column align-items-center bg-black text-white">
      <span className="fs-1 mt-3 fw-bold">Panel de administracion</span>
      <div className="d-flex w-100 mt-3">
        <section className="w-75 border ms-5 d-flex  flex-column p-4">
          <span className="fs-3 fw-semibold">Usuarios</span>
          <div className="w-100">
            <UsersList users={users.slice(0, 8)} />
            <div className="w-100 d-flex justify-content-end">
              <Link className="btn btn-dark fw-semibold" to={"/usuarios"}>
                Administrar usuarios
              </Link>
            </div>
          </div>
        </section>
        <section className="w-25 border border-start-0 me-5 p-4 d-flex flex-column align-items-center">
          <NewUserForm />
        </section>
      </div>
    </main>
  );
};

export default Dashboard;
