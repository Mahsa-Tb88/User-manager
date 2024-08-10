import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { UseUserContext } from "../context/AppContext";
export default function UserList({
  multiUserLoadingError,
  isMultiUserLoading,
  fetchUsers,
}) {
  const { state, dispatch } = UseUserContext();
  const params = useParams();
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

  useEffect(() => {
    dispatch({ type: "setPageTitle", payload: params.BranchName });
    const timeOut = setTimeout(fetchUsers, 20);
    return () => clearTimeout(timeOut);
  }, [params.BranchName]);

  function userInfoHandler(id) {
    navigate(`/user/${id}`);
  }
  let content = "";
  if (isMultiUserLoading) {
    content = (
      <div className="d-flex flex-column justify-content-center align-items-center">
        <span>on loading...</span>
        <span className="spinner-grow text-primary"></span>
      </div>
    );
  } else if (multiUserLoadingError) {
    content = (
      <div>
        <span>{state.multiLoadingError.message}</span>
        <button className="btn btn-primary" onClick={fetchUsers}>
          Try again
        </button>
      </div>
    );
  } else if (!state.users.length) {
    content = (
      <div>
        <p className="bg-primary mt-3 p-2 text-white fs-5">There is no users</p>
      </div>
    );
  } else {
    content = (
      <div className="tableuserlist">
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
          <tbody>
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
                  />{" "}
                </td>
                <td>{user.firstname + " " + user.lastname}</td>
                <td>{user.phone}</td>
                <td>{listOfProvince[user.province]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  return <div>{content}</div>;
}
