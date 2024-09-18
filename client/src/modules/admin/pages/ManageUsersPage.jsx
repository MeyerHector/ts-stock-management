import React, { useEffect, useState } from "react";
import UsersList from "../components/UsersList";
import adminServices from "../admin.services";
import { useNoti } from "../../../hooks/useNoti";
import Nav from "../../nav";

const ManageUsersPage = () => {
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
    <>
      <Nav />
      <div className="w-100 mt-4 d-flex justify-content-center">
        <main className="w-75">
          <UsersList users={users} />
        </main>
      </div>
    </>
  );
};

export default ManageUsersPage;
