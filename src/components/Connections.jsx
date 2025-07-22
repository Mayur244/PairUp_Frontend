import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionsSlice";
import { Link, useNavigate } from "react-router-dom";

const Connections = () => {
  const connections = useSelector((store) => store.connections);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnections(res?.data?.data));
    } catch (error) {
      if (error) {
        navigate("/error");
      }
    }
  };

  useEffect(() => {
    getConnections();
  }, []);

  if (!connections) return null;

  if (connections.length === 0)
    return (
      <div className="my-10 min-h-screen flex flex-col items-center justify-center px-4">
        <h2 className="text-center font-bold text-xl">No connections found</h2>
        <Link to="/" className="mt-4">
          <button className="btn btn-active px-6">Back to feed</button>
        </Link>
      </div>
    );

  return (
    <div className="min-h-screen py-8 px-20 sm:px-40 md:px-40 2xl:px-110">
      <div className="text-center mb-8">
        <h1 className="text-xl mt-15 md:text-3xl font-bold">
          Your Connections
        </h1>
      </div>
      <div className="space-y-6">
        {connections.map(
          ({ firstName, lastName, age, gender, about, photoUrl, _id }) => (
            <div key={_id} className="bg-base-300 rounded-box shadow-md p-4">
              <div className="flex flex-col md:flex-row items-center md:items-start gap-4">
                <img
                  className="rounded-xl w-full md:w-40 h-40 md:object-cover object-contain"
                  src={photoUrl}
                  alt={`${firstName} ${lastName}`}
                />
                <div className="text-center md:text-left">
                  <div className="text-lg font-semibold">
                    {firstName} {lastName}
                  </div>
                  <div className="text-sm font-medium opacity-70">
                    {`${
                      gender.charAt(0).toUpperCase() +
                      gender.slice(1).toLowerCase()
                    }, ${age} yr`}
                  </div>
                  <p className="mt-2 text-sm hidden md:block">{about}</p>
                  <div className="mt-5 flex justify-center md:justify-end">
                    <Link to={`/chat/${_id}`}>
                      <button className="btn btn-info">Message</button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Connections;
