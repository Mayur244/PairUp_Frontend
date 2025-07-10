import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequests } from "../utils/requestSlice";
import { Link, useNavigate } from "react-router-dom";

const Requests = () => {
  const requests = useSelector((store) => store.requests);

  const dispatch = useDispatch();
  const navigate = useNavigate()

  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });

      dispatch(addRequests(res?.data?.data));
    } catch (error) {
      if (error) {
        navigate("/error")
      }
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (!requests) return;

  if (requests.length === 0)
    return (
      <div className="my-30 min-h-screen">
        <h2 className="text-center font-bold text-xl">No requests found</h2>
        <div className="flex justify-center py-4">
          <Link to={"/"}>
            <button className="btn btn-active py-6 px-8">Back to feed</button>
          </Link>
        </div>
      </div>
    );

  return (
    requests && (
      <div className="min-h-screen my-25">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Request received</h1>
        </div>
        <div className="my-8">
          {requests.map((request) => {
            const { firstName, lastName, about, photoUrl, _id } =
              request.fromUserId;
            return (
              <div key={_id} className="flex justify-center py-2">
                <ul className="list bg-base-300 w-180 rounded-box shadow-md">
                  <div className="m-1">
                    <div className="list-row flex items-center">
                      <div>
                        <img
                          className="rounded-full h-35 w-30 object-cover"
                          src={photoUrl}
                        />
                      </div>
                      <div>
                        <div className="text-lg h-10">
                          {firstName + " " + lastName}
                        </div>
                        <p className="list-col-wrap text-sm">{about}</p>
                      </div>
                      <div className="flex">
                          <button className="btn btn-primary w-20 ">Accept</button>
                          <button className="btn btn-secondary ml-4 w-20">
                            Reject
                          </button>
                        </div>
                    </div>
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

export default Requests;
