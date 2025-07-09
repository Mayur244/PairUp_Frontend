import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import UserCard from "./UserCard";

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();

  const getFeed = async () => {
    try {
      if(feed) return;
      const res = await axios.get(
        BASE_URL + "/user/feed",
        { withCredentials: true }
      );
      dispatch(addFeed(res?.data?.data));
      console.log(res?.data?.data)
    } catch (error) {
      console.log("Error :", error);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  return feed && <div>
    <UserCard feed={feed[8]} />
  </div>;
};

export default Feed;
