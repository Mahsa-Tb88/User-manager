import React, { useEffect, useState } from "react";
import { UseUserContext } from "../context/AppContext";
import { useSearchParams } from "react-router-dom";
import { getAllBranches, getBranches } from "../utils/api";
import ListBranch from "./ListBranch";

export default function UserList() {
  const { state, dispatch } = UseUserContext();
  const [searchParams, setSearchParams] = useSearchParams();
  const [isFirstLoading, setIsFirstLoading] = useState(true);

  useEffect(() => {
    if (isFirstLoading) {
      setIsFirstLoading(false);
      return;
    }
    const timeOut = setTimeout(fetchBranches, 1000);
    return () => clearTimeout(timeOut);
  }, [searchParams.get("branch")]);

  async function fetchBranches() {
    dispatch({ type: "setIsMultiLoading", payload: true });
    const result = await getBranches(searchParams.get("branch"));
    if (result.success) {
      dispatch({ type: "setBranches", payload: result.body });
      dispatch({ type: "setMultiLoadingError", payload: false });
    } else {
      dispatch({
        type: "setMultiLoadingError",
        payload: {
          message: result.message,
          code: result.code,
        },
      });
    }
    dispatch({ type: "setIsMultiLoading", payload: false });
  }

  function searchHandler(e) {
    if (e.target.value) {
      setSearchParams({ branch: e.target.value });
    } else {
      setSearchParams({});
    }
  }

  let content = "";
  if (state.isMultiLoading) {
    content = (
      <div className="d-flex flex-column justify-content-center align-items-center">
        <span>on loading...</span>
        <span className="spinner-grow text-primary"></span>
      </div>
    );
  } else if (state.multiLoadingError) {
    content = (
      <div>
        <span>{state.multiLoadingError.message}</span>
        <button className="btn btn-primary" onClick={fetchBranches}>
          Try again
        </button>
      </div>
    );
  } else if (!state.branches.length) {
    content = (
      <p className="bg-primary mt-3 p-2 text-white fs-5 rounded-1">
        There is no branches
      </p>
    );
  } else {
    content = state.branches.map((branch) => (
      <ListBranch key={branch._id} branch={branch} />
    ));
  }

  return (
    <div className="w-25 text-center py-4 px-3 userList">
      <div className="inputSearch">
        <input
          type="text"
          placeholder="Search..."
          className="search"
          onChange={searchHandler}
          value={searchParams.get("branch") || ""}
        />
      </div>
      <div className="list">
        <h2 className="fs-3 py-4 title">Branch List</h2>
        <div className="d-flex flex-column  align-items-center mt-5">
          {content}
        </div>
      </div>
    </div>
  );
}
