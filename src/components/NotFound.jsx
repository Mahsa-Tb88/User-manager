import React, { useEffect } from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  useEffect(() => {
    document.title = "User Manager App";
  }, []);
  return (
    <div className="text-center  m-5">
      <p className="fs-4 ">Not Found</p>
      <Link to="/" className="btn btn-primary">
        Go to Home
      </Link>
    </div>
  );
}
