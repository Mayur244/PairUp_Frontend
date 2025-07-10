import React, { useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const EditProfile = ({ user }) => {
  const [firstName, setFisrtName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
  const [age, setAge] = useState(user.age);
  const [gender, setGender] = useState(user.gender);
  const [about, setAbout] = useState(user.about);
  const [error, setError] = useState(null);

  const [showToast, setShowToast] = useState(false);

  const dispatch = useDispatch();

  const saveProfile = async () => {
    setError(null);
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        { firstName, lastName, age, gender, about, photoUrl },
        { withCredentials: true }
      );
      dispatch(addUser(res.data.data));
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false)
      }, 2000);
    } catch (err) {
      const message =
        err.response?.data || "Something went wrong. Please try again.";
      setError(message);
    }
  };

  return (
    <>
      <div className="flex justify-evenly">
        <div className="flex justify-center">
          <div className="card bg-base-300 w-110 shadow-sm my-25">
            <div className="card-body">
              <h2 className="card-title justify-center">Edit Profile</h2>
              <label className="pl-4">
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">First Name</legend>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFisrtName(e.target.value)}
                    className="input w-90"
                  />
                </fieldset>
              </label>
              <label className="pl-4">
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">Last Name</legend>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="input w-90"
                  />
                </fieldset>
              </label>
              <label className="pl-4">
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">Photo Url</legend>
                  <input
                    type="text"
                    value={photoUrl}
                    onChange={(e) => setPhotoUrl(e.target.value)}
                    className="input w-90"
                  />
                </fieldset>
              </label>
              <label className="pl-4">
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">Age</legend>
                  <input
                    type="text"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    className="input w-90"
                  />
                </fieldset>
              </label>
              <div className="pl-3">
                <fieldset className="fieldset pl-1">
                  <legend className="fieldset-legend">Gender</legend>
                </fieldset>
                <div className="dropdown dropdown-right">
                  <div
                    tabIndex={0}
                    role="button"
                    className="btn bg-base-100 m-1 w-90  border border-base-100 font-normal"
                  >
                    {gender}
                  </div>
                  <ul
                    tabIndex={0}
                    className="dropdown-content menu bg-base-200 rounded-box z-1 w-25 pl-2 shadow-sm"
                  >
                    <li>
                      <a onClick={() => setGender("male")}>male</a>
                    </li>
                    <li>
                      <a onClick={() => setGender("female")}>female</a>
                    </li>
                    <li>
                      <a onClick={() => setGender("other")}>other</a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="pl-4">
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">Your bio</legend>
                  <textarea
                    onChange={(e) => setAbout(e.target.value)}
                    value={about}
                    className="textarea h-24 w-90"
                  ></textarea>
                </fieldset>
              </div>
              {error && (
                <div className="pl-2">
                  <p className="text-red-300 pl-2 text-[12px]">{error}</p>
                </div>
              )}
              <div className="card-actions justify-center py-4">
                <button onClick={saveProfile} className="btn btn-primary">
                  Save Profile
                </button>
              </div>
            </div>
          </div>
        </div>
        <div>
          <UserCard
            user={{ firstName, lastName, age, gender, about, photoUrl }}
          />
        </div>
      </div>
      {showToast && <div className="toast toast-top toast-center my-18">
        <div className="alert alert-success">
          <span>Profile saved successfully.</span>
        </div>
      </div>}
    </>
  );
};

export default EditProfile;
