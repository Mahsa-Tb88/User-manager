import React, { useEffect } from "react";
import { UseUserContext } from "../context/AppContext";

export default function Welcome() {
  const { dispatch } = UseUserContext();
  useEffect(() => {
    dispatch({ type: "setPageTitle", payload: "Home" });
    document.title = "User Manager App";
  }, []);
  return (
    <div className="text-center mt-5 welcome">
      <h1>Welcome to User Manager App</h1>
      <p className="mt-5 welcome">
        Use Above Button For Adding User and Adding Branch
      </p>
      <p className="welcome">
        Use Left Menu For Observing and Editing Branch & User
      </p>
    </div>
  );
}
