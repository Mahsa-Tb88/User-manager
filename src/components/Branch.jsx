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
  }, [searchParams]);

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

  return (
    <div className="mx-auto w-75 branch mt-5">
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
