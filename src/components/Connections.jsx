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

  if (!connections) return;

  if (connections.length === 0)
    return (
      <div className="my-30 min-h-screen">
        <h2 className="text-center font-bold text-xl">No connections found</h2>
        <div className="flex justify-center py-4"><Link to={"/"}><button className="btn btn-active py-6 px-8">Back to feed</button></Link></div>
      </div>
    );

  return (
    connections && (
      <div className="min-h-screen my-25">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Your Connections</h1>
        </div>
        <div className="my-8">
          {connections.map((connection) => {
            const { firstName, lastName, age, gender, about, photoUrl, _id } =
              connection;
            return (
          
                <div key={_id} className="px-120 py-2">
                  <ul className="list bg-base-300 rounded-box shadow-md">
                    <div className="m-1">
                      <li className="list-row flex items-center">
                        <div>
                          <img
                            className="rounded-xl h-35 w-40 object-cover"
                            src={photoUrl}
                          />
                        </div>
                        <div>
                          <div className="text-lg">
                            {firstName + " " + lastName}
                          </div>
                          <div className="text-xs font-semibold opacity-60">
                            {gender.charAt(0).toUpperCase() +
                              gender.slice(1).toLowerCase() +
                              ", " +
                              age +
                              " yr"}
                          </div>
                          <p className="list-col-wrap mt-2 text-sm">
                            {about}
                          </p>
                        </div>
                      </li>
                    </div>
                  </ul>
                </div>
              
            );
          })}
        </div>
      </div>
    )
  );
};

export default Connections;
