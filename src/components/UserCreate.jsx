import React, { useEffect } from "react";
import EditForm from "./EditForm";
import { UseUserContext } from "../context/AppContext";
import { createUser } from "../utils/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function UserCreate() {
  const { state, dispatch } = UseUserContext();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch({ type: "setPageTitle", payload: "Create User" });
  }, []);
  async function handleSubmit(data) {
    const { firstname, lastname, phone, email, branch, description, province } =
      data;
    const result = await createUser({
      firstname,
      lastname,
      phone,
      email,
      branch,
      description,
      province,
    });
    if (result.success) {
      dispatch({ type: "createNewUser", payload: result.body });
      toast.success(result.message);
      navigate("/");
    } else {
      toast.error(result.message);
    }
  }
  return (
    <div>
      <EditForm onSubmit={handleSubmit} type="new" />
    </div>
  );
}
