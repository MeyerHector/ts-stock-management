import React from "react";

const UserCard = ({ user }) => {
  return (
    <div className="card w-100 p-2">
      <div className="d-flex align-items-center">
        <span className="fs-5 fw-semibold">
          {user.name} {user.surname}
        </span>
        <h6 className="card-subtitle text-muted">@{user.username}</h6>
        <p className="card-text">ID: {user.id}</p>
      </div>
    </div>
  );
};

export default UserCard;
