import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [error, setError] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    setError(null);

    try {
      const res = await axios.post(
        BASE_URL + "/login",
        { emailId, password },
        { withCredentials: true }
      );

      dispatch(addUser(res?.data));

      navigate("/", { state: { showToast: true } });
    } catch (error) {
      if (error.response) {
        setError(error?.response?.data || "Something went wrong");
      } else {
        navigate("/error");
      }
    }
  };

  const handleSignUp = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/signup",
        { firstName, lastName, emailId, password },
        { withCredentials: true }
      );
      dispatch(addUser(res?.data?.data));
      navigate("/profile");
    } catch (err) {
      const errMsg = err?.response?.data?.message || "Something went wrong";
      setError(errMsg);
    }
  };

  return (
  <div
    className="min-h-screen bg-cover bg-center flex items-center justify-center"
    style={{
      backgroundImage: `url(https://user-gen-media-assets.s3.amazonaws.com/gpt4o_images/aed8863f-8439-4732-8525-81615e00b881.png)`,
    }}
  >
    <div className="card bg-base-transparent bg-opacity-80 w-96 shadow-lg backdrop-blur-lg border border-white">
      <div className="card-body">
        <h2 className="card-title justify-center">
          {isLoginForm ? "Login" : "Sign Up"}
        </h2>

        {!isLoginForm && (
          <>
            <label className="pl-2">
              <fieldset className="fieldset ">
                <legend className="fieldset-legend ">First Name</legend>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="p-2 bg-base-transparent backdrop-blur-sm bg-opacity-80 border border-white text-white-800 text-sm"
                />
              </fieldset>
            </label>

            <label className="pl-2">
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Last Name</legend>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="p-2 bg-base-transparent backdrop-blur-sm bg-opacity-80 border border-white text-white-800 text-sm"
                />
              </fieldset>
            </label>
          </>
        )}

        <label className="pl-2">
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Email ID</legend>
            <input
              type="text"
              value={emailId}
              onChange={(e) => setEmailId(e.target.value)}
              className="p-2 bg-base-transparent backdrop-blur-sm bg-opacity-80 border border-white text-white-800 text-sm"
            />
          </fieldset>
        </label>

        <label className="pl-2">
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Password</legend>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="p-2 bg-base-transparent backdrop-blur-sm bg-opacity-80 border border-white text-white-800 text-sm"
            />
          </fieldset>
        </label>

        {error && <p className="text-red-300 pl-2 text-[12px]">{error}</p>}

        <div className="card-actions justify-center py-4">
          <button
            className="bg-base-transparent border border-white px-6 py-2 cursor-pointer"
            onClick={isLoginForm ? handleLogin : handleSignUp}
          >
            {isLoginForm ? "Login" : "Sign up"}
          </button>
        </div>

        <button>
          <p
            onClick={() => setIsLoginForm((value) => !value)}
            className="cursor-pointer"
          >
            {isLoginForm
              ? "New User? Sign Up Now"
              : "Already registered? Sign In"}
          </p>
        </button>
      </div>
    </div>
  </div>
);

};

export default Login;
