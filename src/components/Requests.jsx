import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequests } from "../utils/requestSlice";
import { Link, useNavigate } from "react-router-dom";

const Requests = () => {
  const requests = useSelector((store) => store.requests);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const reviewrequests = async (status, _id) => {
    try {
      await axios.post(
        `${BASE_URL}/request/review/${status}/${_id}`,
        {},
        { withCredentials: true }
      );
      dispatch(removeRequests(_id));
    } catch (error) {
      if (error) {
        navigate("/error");
      }
    }
  };

  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });

      dispatch(addRequests(res?.data?.data));
    } catch (error) {
      if (error) {
        navigate("/error");
      }
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (!requests) return;

  if (requests.length === 0)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-gradient-to-r from-purple-500 to-pink-500">
        <h2 className="text-center font-bold text-xl">No requests found</h2>
        <Link to="/" className="mt-4">
          <button className="btn btn-active px-6">Back to feed</button>
        </Link>
      </div>
    );

  return (
    <div className="min-h-screen ">
      {requests && (
        <div className="p-25">
          <h1 className="md:text-3xl text-xl font-bold text-center">
            Request received
          </h1>
          <div className="my-5">
            {requests.map((request) => {
              const { firstName, lastName, about, photoUrl, _id } =
                request.fromUserId;
              return (
                <div key={_id} className="flex justify-center py-2">
                  <ul className="list bg-base-300 h-22 md:h-30 w-90 md:w-180 rounded-box shadow-md">
                    <div className="m-1">
                      <div className="list-row h-20 md:h-30 w-90 md:w-180 flex  items-center">
                        <div className="h-20 mt-5 md:mt-0 w-60 md:h-20 md:w-35">
                          <img
                            className="h-15 w-50 md:h-20 md:w-20 rounded-full object-cover"
                            src={photoUrl}
                          />
                        </div>
                        <div className="h-20 md:h-45 w-80 md:w-180 mt-10 md:mt-25">
                          <div className="md:text-lg md:h-8 w-18 md:w-35 text-[12px]">
                            {firstName + " " + lastName}
                          </div>
                          <p className="hidden md:block">{about}</p>
                        </div>
                        <div className="flex">
                          <button
                            onClick={() =>
                              reviewrequests("accepted", request._id)
                            }
                            className="btn btn-primary w-20 h-8 md:h-10 md:w-20 text-[9px] md:text-sm "
                          >
                            Accept
                          </button>
                          <button
                            onClick={() =>
                              reviewrequests("rejected", request._id)
                            }
                            className="btn btn-secondary w-20 h-8 md:h-10 ml-4 md:mx-2 md:w-20 text-[9px] md:text-sm"
                          >
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
      )}
    </div>
  );
};

export default Requests;
