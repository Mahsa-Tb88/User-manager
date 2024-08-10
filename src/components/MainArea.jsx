import React, { useEffect } from "react";
import { FaUserPlus } from "react-icons/fa6";
import { HiArrowUturnLeft } from "react-icons/hi2";
import { FaFolder } from "react-icons/fa6";
import { UseUserContext } from "../context/AppContext";
import { Link, useLocation, useNavigate } from "react-router-dom";
export default function MainArea() {
  const { state, dispatch } = UseUserContext();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname == "/user/newUser") {
      dispatch({ type: "setPageTitle", payload: "Create  User" });
    } else if (location.pathname == "/branch/newBranch") {
      dispatch({ type: "setPageTitle", payload: "Create Branch" });
    }
  }, []);

  function addUserHandler() {
    if (state.pageTitle == "Home") {
      dispatch({ type: "setPageTitle", payload: "Create  User" });
    } else if (state.pageTitle !== "Home") {
      dispatch({ type: "setPageTitle", payload: "Home" });
      navigate("/");
    }
  }

  function createBranchHandler() {
    if (state.pageTitle != "Create Branch") {
      dispatch({ type: "setPageTitle", payload: "Create Branch" });
    } else {
      dispatch({ type: "setPageTitle", payload: "Home" });
      navigate("/");
    }
  }
  return (
    <div>
      <header className="d-flex justify-content-between align-items-center header">
        <div className="d-flex justify-content-between align-items-center">
          <div className="me-3 btn-group fs-6 d-flex justify-content-between align-items-center">
            {state.pageTitle != "Home" && state.pageTitle != "Create Branch" ? (
              <div className="d-flex justify-content-between align-items-center">
                <button
                  className="btnAdd text-white"
                  onClick={() => addUserHandler()}
                >
                  Back
                </button>
                <HiArrowUturnLeft />
              </div>
            ) : !state.branches.length ? (
              <div className=" d-flex justify-content-between align-items-center">
                <span className="btnAdd opacity-50 text-white">Add User</span>
                <FaUserPlus className="text-white opacity-50" />
              </div>
            ) : (
              <div className=" d-flex justify-content-between align-items-center">
                <Link
                  className="btnAdd text-white"
                  to={"/user/newUser"}
                  onClick={() => addUserHandler()}
                >
                  Add User
                </Link>
                <FaUserPlus className="text-white" />
              </div>
            )}
          </div>
          <div className="btn-group fs-6 d-flex justify-content-between align-items-center">
            {state.pageTitle == "Create Branch" ? (
              <div className="d-flex justify-content-between align-items-center">
                <button
                  className="btnAdd text-white"
                  onClick={() => createBranchHandler()}
                >
                  Back
                </button>
                <HiArrowUturnLeft />
              </div>
            ) : (
              <div className="d-flex justify-content-between align-items-center">
                <Link
                  className="btnAdd text-white"
                  to="/branch/newBranch"
                  onClick={() => createBranchHandler()}
                >
                  Create Branch
                </Link>
                <FaFolder />
              </div>
            )}
          </div>
        </div>

        <h2 className="fs-4">{state.pageTitle}</h2>
      </header>
    </div>
  );
}
