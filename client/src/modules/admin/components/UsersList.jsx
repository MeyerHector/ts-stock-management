import React, { useState } from "react";

const UsersList = ({ users }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  const totalPages = Math.ceil(users.length / usersPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className=" w-100">
      <div>
        <div className="d-flex flex-column justify-content-between ">
          <table>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Usuario</th>
                <th>ID</th>
                {users.length > 10 && (
                  <>
                    <th>Creado el</th>
                    <th>Acciones</th>
                  </>
                )}
              </tr>
            </thead>
            <tbody>
              {currentUsers.map((user) => (
                <tr key={user.id}>
                  <td className="py-2">
                    {user.name} {user.surname}
                  </td>
                  <td>@{user.username}</td>
                  <td>{user.id}</td>
                  {users.length > 10 && (
                    <>
                      <td>{user.createdAt}</td>
                      <td className="d-flex">
                        <button
                          className="btn btn-info fw-semibold me-2 p-2  d-flex align-items-center"
                          type="button"
                        >
                          <span className="material-symbols-outlined text-light">
                            edit
                          </span>
                        </button>
                        <button
                          className="btn btn-danger fw-semibold p-2 d-flex align-items-center"
                          type="button"
                        >
                          <span className="material-symbols-outlined">
                            delete
                          </span>
                        </button>
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {users.length > usersPerPage && (
          <div className="w-100 d-flex justify-content-center">
            <nav aria-label="Page navigation example">
              <ul className="pagination">
                <li
                  className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
                >
                  <button
                    className="page-link d-flex align-items-center h-100 "
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    <span className="material-symbols-outlined fs-6">
                      arrow_back_ios
                    </span>
                  </button>
                </li>
                {Array.from({ length: totalPages }, (_, index) => (
                  <li
                    key={index + 1}
                    className={`page-item ${
                      currentPage === index + 1 ? "active" : ""
                    }`}
                  >
                    <button
                      className="page-link"
                      onClick={() => handlePageChange(index + 1)}
                    >
                      {index + 1}
                    </button>
                  </li>
                ))}
                <li
                  className={`page-item ${
                    currentPage === totalPages ? "disabled" : ""
                  }`}
                >
                  <button
                    className="page-link d-flex align-items-center h-100"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  >
                    <span className="material-symbols-outlined fs-6">
                      arrow_forward_ios
                    </span>
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        )}
      </div>
    </div>
  );
};

export default UsersList;
