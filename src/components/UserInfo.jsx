import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { UseUserContext } from "../context/AppContext";
import { deleteUser, getUserById } from "../utils/api";
import Loading from "./Loading";
import LoadingError from "./LoadingError";

export default function UserInfo() {
  const { state, dispatch } = UseUserContext();
  const [loaded, setLoaded] = useState(false);
  const params = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState({});
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
    dispatch({ type: "setPageTitle", payload: "Info User" });
    document.title = "User Manager App";

    const timeOut = setTimeout(fetchGetUser, 20);
    return () => clearTimeout(timeOut);
  }, [params.id]);

  async function fetchGetUser() {
    setLoaded(false);
    dispatch({ type: "setIsSingleLoading", payload: true });
    const result = await getUserById(params.id);
    if (result.success) {
      setUser(result.body);
      dispatch({ type: "setSingleLoadingError", payload: false });
    } else {
      dispatch({
        type: "setSingleLoadingError",
        payload: { message: result.message, code: result.code },
      });
    }
    dispatch({ type: "setIsSingleLoading", payload: false });
    setLoaded(true);
  }
  let content = "";

  if (state.isSingleLoading) {
    content = <Loading />;
  } else if (state.singleLoadingError) {
    content = <LoadingError reload={fetchGetUser} />;
  } else if (loaded) {
    content = (
      <div className="w-100">
        <div className="d-flex justify-content-start align-items-center">
          <img
            className="w-25 rounded-circle me-5"
            src={
              user.image
                ? SERVER_URL + user.image
                : SERVER_URL + "/uploads/user-1723232043280.png"
            }
          />
          <div className="">
            <p className="fs-4 mb-4">{user.firstname + " " + user.lastname}</p>
            <div className="d-flex justify-content-between align-items-center">
              <button
                className="btn-delete me-3"
                onClick={() => deleteUserHandler(user._id)}
              >
                Delete User
              </button>
              <Link
                className="btn-edit"
                onClick={() => editUserHandler(user._id)}
                to={"/user/" + user._id + "/edit"}
              >
                Edit User
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-4  d-flex flex-column justify-content-start align-items-start">
          <div className="p-2 border-bottom section">
            <span className="fs-5">Phone:</span>
            <span className="fs-5 ms-4">{user.phone}</span>
          </div>
          <div className="p-2 border-bottom section ">
            <span className="fs-5">Province:</span>
            <span className="fs-5 ms-4">
              {listOfProvince[user.province] || user.province}
            </span>
          </div>
          <div className="p-2 border-bottom section ">
            <span className="fs-5">Description:</span>
            <p className="mt-2 ms-4 desc">{user.description}</p>
          </div>
        </div>
      </div>
    );
  }
  async function deleteUserHandler(id) {
    if (!confirm("Are you sure?")) {
      return;
    }
    const result = await deleteUser(id);
    if (result.success) {
      dispatch({ type: "deleteUser", payload: result.body });
      toast.success(result.message);
      navigate("/", { replace: true });
    } else {
      toast.error(result.message);
    }
  }
  async function editUserHandler() {
    dispatch({ type: "setPageTitle", payload: "Edit User" });
  }

  return (
    <div className="w-75 userinfo d-flex flex-column justify-content-start align-items-start">
      {content}
    </div>
  );
}
