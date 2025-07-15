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
    <div className="min-h-screen mt-35">
      <div className="flex justify-center">
        <div className="card bg-base-300 w-96 shadow-sm">
          <div className="card-body">
            <h2 className="card-title justify-center">
              {isLoginForm ? "Login" : "Sign Up"}
            </h2>

            {!isLoginForm && (
              <>
                <label className="pl-2">
                  <fieldset className="fieldset">
                    <legend className="fieldset-legend">First Name</legend>
                    <input
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="input"
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
                      className="input"
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
                  className="input"
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
                  className="input"
                />
              </fieldset>
            </label>

            {error && <p className="text-red-300 pl-2 text-[12px]">{error}</p>}

            <div className="card-actions justify-center py-4">
              <button
                className="btn btn-primary"
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
    </div>
  );
};

export default Login;
