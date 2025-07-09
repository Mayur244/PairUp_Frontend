import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { removeUser } from "../utils/userSlice";
import { useState } from "react";

const Navbar = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const [showToast, setShowToast] = useState(false);


  const handleLogout = async () => {
    try {
      await axios.post(BASE_URL + "/logout", {}, { withCredentials: true });
      dispatch(removeUser());
      setShowToast(true)
      setTimeout(() => {
        setShowToast(false)
      }, 2000);
      return navigate("/login");
    } catch (err) {
      if (err) {
        navigate("/error")
      }
    }
  };

  return (
    <>
      <div className="navbar bg-base-300 shadow-sm">
        <div className="flex-1">
          <Link to={"/"} className="btn btn-ghost text-xl">
            DevConnect❤️
          </Link>
        </div>
        {user && (
          <div className="flex gap-2 items-center">
            <div>
              <p className="">Welcome, {user?.firstName}</p>
            </div>
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar mx-5"
              >
                <div className="w-10 rounded-full">
                  <img
                    alt="User Photo"
                    src={user.photoUrl ? user?.photoUrl : ""}
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
              >
                <li>
                  <Link to={"/profile"} className="justify-between">
                    Profile
                    <span className="badge">New</span>
                  </Link>
                </li>
                <li>
                  <a>Settings</a>
                </li>
                <li>
                  <a onClick={handleLogout}>Logout</a>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
      {showToast && <div className="toast toast-top toast-center">
        <div className="alert alert-success bg-red-500 text-black font-normal border border-red-500">
          <span>Logged out successfully.</span>
        </div>
      </div>}
    </>
  );
};

export default Navbar;
