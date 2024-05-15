import React from "react";
import { UseUserContext } from "../context/AppContext";
import { Link } from "react-router-dom";

export default function ({ reload }) {
  const { state } = UseUserContext();
  return (
    <div className="text-center">
      <h3 className="mb-5">{state.singleLoadingError.message}</h3>
      {state.singleLoadingError.code == 404 ? (
        <Link to="/" className="btn btn-primary">
          Back to Home
        </Link>
      ) : (
        <button className="btn btn-primary" onClick={reload}>
          Try Again
        </button>
      )}
    </div>
  );
}
