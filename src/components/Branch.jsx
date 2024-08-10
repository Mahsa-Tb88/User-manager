import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { UseUserContext } from "../context/AppContext";
import { getUsers, getUsersInBranch } from "../utils/api";
import UserList from "./UserList";

export default function Branch() {
  const { state, dispatch } = UseUserContext();
  const params = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const [isMultiUserLoading, setIsMultiUserLoading] = useState(true);
  const [multiUserLoadingError, setMultiUserLoadingError] = useState(false);

  useEffect(() => {
    dispatch({ type: "setPageTitle", payload: params.BranchName });
    const timeOut = setTimeout(fetchUsers, 1000);
    return () => clearTimeout(timeOut);
  }, [searchParams, params.BranchName]);

  async function fetchUsers() {
    setIsMultiUserLoading(true);
    const result = await getUsers(searchParams.get("user"), params.BranchName);
    if (result.success) {
      dispatch({ type: "setUsers", payload: result.body });
    } else {
      setMultiUserLoadingError({
        status: false,
        message: result.message,
        code: result.code,
      });
    }
    setIsMultiUserLoading(false);
  }

  function searchUserHandler(value) {
    setSearchParams({ user: value });
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
        <p className="bg-primary rounded-3 mt-3 p-2 text-white fs-5">
          There is no users
        </p>
      </div>
    );
  } else {
    content = (
      <div>
        <div className="inputSearchUser">
          <input
            type="text"
            placeholder="Search..."
            className="searchUser"
            value={searchParams.get("user") || ""}
            onChange={(e) => searchUserHandler(e.target.value)}
          />
        </div>
        <UserList
          isMultiUserLoading={isMultiUserLoading}
          multiUserLoadingError={multiUserLoadingError}
          fetchUsers={fetchUsers}
        />
      </div>
    );
  }

  return <div className="mx-auto w-75 branch mt-5">{content}</div>;
}
