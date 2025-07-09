import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import UserCard from "./UserCard";
import { useNavigate, useLocation } from "react-router-dom";

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [showToast, setShowToast] = useState(false);

  const getFeed = async () => {
    try {
      if (feed) return;
      const res = await axios.get(BASE_URL + "/user/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(res?.data?.data));
    } catch (error) {
      if (error) {
        navigate("/error");
      }
    }
  };

  useEffect(() => {
    getFeed();

    if (location.state?.showToast) {
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 2000);
    }
  }, [location.state]);

  return (
    <>
      {showToast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>Logged in successfully.</span>
          </div>
        </div>
      )}

      {feed && (
        <div>
          <UserCard user={feed[7]} />
        </div>
      )}
    </>
  );
};

export default Feed;
