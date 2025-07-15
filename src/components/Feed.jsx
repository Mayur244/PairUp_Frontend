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
    window.history.replaceState({}, document.title);
  }, [location.state]);

  if (!feed) return;

  if (feed.length === 0)
    return (
      <div className="my-30 min-h-screen">
        <h2 className="text-center font-bold text-xl">No more users</h2>
      </div>
    );

  return (
    <>
      {showToast && (
        <div className="toast toast-top toast-center my-15 z-50">
          <div className="alert alert-success">
            <span>Logged in successfully.</span>
          </div>
        </div>
      )}

      {feed && (
        <UserCard user={feed[0]} />
      )}
    </>
  );
};

export default Feed;
