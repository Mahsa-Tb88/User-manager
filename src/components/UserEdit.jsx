import React, { useEffect, useState } from "react";
import "./EditForm";
import EditForm from "./EditForm";
import { useNavigate, useParams } from "react-router-dom";
import { getUserById, updateUser } from "../utils/api";
import { UseUserContext } from "../context/AppContext";
import LoadingError from "./LoadingError";
import { toast } from "react-toastify";
export default function UserEdit() {
  const { state, dispatch } = UseUserContext();
  const [loaded, setLoaded] = useState(false);
  const [user, setUser] = useState({});
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch({ type: "setPageTitle", payload: "Edit User" });
  }, []);
  useEffect(() => {
    const timeOut = setTimeout(fetchUserById, 20);
    return () => clearTimeout(timeOut);
  }, []);
  async function fetchUserById() {
    dispatch({ type: "setIsSingleLoading", dispatch: true });
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
    dispatch({ type: "setIsSingleLoading", dispatch: false });
    setLoaded(true);
  }
  async function handleSubmit(data) {
    console.log(data);
    const { firstname, lastname, phone, emial, province, description, branch } =
      data;
    const result = await updateUser({
      firstname,
      lastname,
      phone,
      emial,
      province,
      description,
      branch,
      id: user._id,
    });
    if (result.success) {
      dispatch({ type: "updateUser", payload: result.body });
      navigate("/user/" + user._id);
      toast.success(result.message);
    } else {
      toast.error(result.message);
    }
  }
  let content = "";
  if (state.isSingleLoading) {
    content = <Loading />;
  } else if (state.singleLoadingError) {
    content = <LoadingError reload={fetchUserById} />;
  } else if (loaded) {
    content = <EditForm onSubmit={handleSubmit} type="edit" user={user} />;
  }
  return <div>{content}</div>;
}
