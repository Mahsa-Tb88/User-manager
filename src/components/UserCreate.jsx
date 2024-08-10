import React, { useEffect } from "react";
import EditForm from "./EditForm";
import { UseUserContext } from "../context/AppContext";


export default function UserCreate() {
  const { state, dispatch } = UseUserContext();
  useEffect(() => {
    dispatch({ type: "setPageTitle", payload: "Create User" });
  }, []);

  return (
    <div>
      <EditForm type="new" />
    </div>
  );
}
