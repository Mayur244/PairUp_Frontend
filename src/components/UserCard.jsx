import React, { useState } from "react";
import { useLocation } from "react-router-dom";

const UserCard = ({ user }) => {
  const { firstName, lastName, age, gender, about, photoUrl } = user;

  const location = useLocation();

  const [hoverButton, setHoverButton] = useState(null);

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
    <div className="flex justify-center mt-8">
      <div
        className={`card bg-base-300 w-80 transition-shadow duration-300 ${handleCardShadow()}`}
      >
        {photoUrl && (
          <figure>
            <img src={photoUrl} alt="User" />
          </figure>
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
                  className="btn btn-primary"
                >
                  Ignore
                </button>
              </div>
              <div className="card-actions justify-center">
                <button
                  onMouseEnter={() => setHoverButton("interested")}
                  onMouseLeave={() => setHoverButton(null)}
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
  );
};

export default UserCard;
