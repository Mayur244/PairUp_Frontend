import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="hero  min-h-screen">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-6xl font-bold text-white-600">404</h1>
          <p className="text-xl  mt-4">Oops! Page not found.</p>
          <p className="py-6">
            The page you're looking for doesn't exist or was moved.
          </p>
          <Link to={"/"}><button className="btn btn-active">Go Back Home</button></Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
