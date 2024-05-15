import React from "react";
import { NavLink } from "react-router-dom";
import noAvatar from "../assets/image/no-avatar.png";
export default function User({ user }) {
  const userClass = [
    "d-flex justify-content-start align-items-center user mb-3 py-2 ",
  ].join(" ");

  return (
    <NavLink to={`/user/${user.id}`} className={userClass}>
      <div className="w-25">
        <img className="w-50 rounded-circle" src={user.avatarURL || noAvatar} />
      </div>
      <div>
        <span className="name">{user.firstname} </span>
        <span className="family">{user.lastname}</span>
      </div>
    </NavLink>
  );
}
