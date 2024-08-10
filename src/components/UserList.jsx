import React from "react";
import { useNavigate } from "react-router-dom";
import { UseUserContext } from "../context/AppContext";
export default function UserList() {
  const { state, dispatch } = UseUserContext();
  const navigate = useNavigate();

  const listOfProvince = [
    "British Columbia",
    "Alberta",
    "Manitoba",
    "New Brunswick",
    "Nova Scotia",
    "Ontario",
    "Newfoundland and Labrador",
    "Prince Edward Island",
    "Quebec",
    "Saskatchewan",
  ];

  function userInfoHandler(id) {
    navigate(`/user/${id}`);
  }

  return (
    <div>
      <div>
        <table className="table table-hover table-bordered text-center">
          <thead className="table-dark">
            <tr className="table-row">
              <th scope="col">row</th>
              <th scope="col">Image</th>
              <th scope="col">Full Name</th>
              <th scope="col">Phone</th>
              <th scope="col">Province</th>
            </tr>
          </thead>
          <tbody className="body bg-blac">
            {state.users.map((user, index) => (
              <tr
                key={user._id}
                className="table-row user-row"
                onClick={() => userInfoHandler(user._id)}
              >
                <th scope="row">{index + 1}</th>
                <td>
                  <img
                    className="img-user"
                    width="30"
                    src={
                      user.image
                        ? SERVER_URL + user.image
                        : SERVER_URL + "/uploads/user-1723232043280.png"
                    }
                  />
                </td>
                <td>{user.firstname + " " + user.lastname}</td>
                <td>{user.phone}</td>
                <td>{listOfProvince[user.province]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
