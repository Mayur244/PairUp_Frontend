import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {

  return (
    <div className="flex mt-40 justify-center bg-gray-[#0a1a3f] min-h-screen px-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-red-500">404</h1>
        <p className="text-xl  mt-4">Oops! Page not found.</p>
        <p className=" mt-2">The page you're looking for doesn't exist or was moved.</p>
        <Link to="/" className="inline-block mt-6 px-6 py-2 bg-[#0a0a10] text-white rounded-lg transition">
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
