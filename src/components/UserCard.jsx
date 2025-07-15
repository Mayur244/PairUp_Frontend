import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { removeUserFromFeed } from "../utils/feedSlice";
import { BASE_URL } from "../utils/constants";

const UserCard = ({ user }) => {
  const [hoverButton, setHoverButton] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { firstName, lastName, age, gender, about, photoUrl, _id } = user;

  const handleSendRequest = async (status, userId) => {
    try {
      console.log("Sending request:", status, userId);

      const res = await axios.post(BASE_URL +
        "/request/send/" + status + "/" + userId,
        {},
        { withCredentials: true }
      );
      dispatch(removeUserFromFeed(userId));
      console.log(res);
    } catch (error) {
      if (error) {
        console.log(error);
      } else {
        navigate("/error");
      }
    }
  };
  const handleCardShadow = () => {
    switch (hoverButton) {
      case "ignored": {
        return "shadow-lg shadow-indigo-500/50";
      }
      case "interested": {
        return "shadow-lg shadow-pink-500/50";
      }
      default: {
        return "shadow-lg";
      }
    }
  };

  return (
    <div className="min-h-screen">
      <div className="flex justify-center mt-35">
        <div
          className={`card bg-base-300 w-75 transition-shadow duration-300 ${handleCardShadow()}`}
        >
          {photoUrl ? (
            <figure>
              <img
                className="object-fill h-80 w-75"
                src={photoUrl}
                alt="User"
              />
            </figure>
          ) : (
            <div className="h-80 w-75 flex items-center justify-center bg-gray-200 text-gray-500">
              No Image
            </div>
          )}
          <div className="card-body">
            <h2 className="card-title">{firstName + " " + lastName}</h2>
            {age && gender && (
              <p>
                {gender.charAt(0).toUpperCase() +
                  gender.slice(1).toLowerCase() +
                  ", " +
                  age +
                  " yr"}
              </p>
            )}
            <p>{about}</p>
            {location.pathname === "/" && (
              <div className="flex justify-evenly mt-4">
                <div className="card-actions justify-center">
                  <button
                    onMouseEnter={() => setHoverButton("ignored")}
                    onMouseLeave={() => setHoverButton(null)}
                    onClick={() => handleSendRequest("ignored", _id)}
                    className="btn btn-primary"
                  >
                    Ignore
                  </button>
                </div>
                <div className="card-actions justify-center">
                  <button
                    onMouseEnter={() => setHoverButton("interested")}
                    onMouseLeave={() => setHoverButton(null)}
                    onClick={() => handleSendRequest("interested", _id)}
                    className="btn btn-secondary"
                  >
                    Interested
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
