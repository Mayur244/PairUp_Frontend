import React, { useEffect } from "react";
import Navbar from "./Navbar";
import { Outlet, useNavigate } from "react-router-dom";
import Footer from "./Footer";
import axios from "axios";
import {BASE_URL} from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userData = useSelector((store) => store.user)

  const fetch = async () => {
    try {
      if(userData) return;
      const res = await axios.get(BASE_URL + "/profile/view", {
        withCredentials: true,
      });

      dispatch(addUser(res.data));
    } catch (error) {
      if (error?.status === 401) {
        navigate("/login");
      }else{
        navigate("/error")
      }
    }
  };

  useEffect(() => {
      fetch();
  },[])
  
  return (
    <div className="bg-gradient-to-r from-purple-500 to-pink-500">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Body;
