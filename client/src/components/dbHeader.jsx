import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAuth } from "firebase/auth";
import {
  BsToggles2,
  MdSearch,
  Bs,
  BsFillBellFill,
  MdLogout,
} from "../assets/icons";
import { motion } from "framer-motion";
import { buttonClick } from "../animations";
import { Avater } from "../assets";
import { app } from "../config/firebase.config";
import { useNavigate } from "react-router-dom";
import { deleteUsers } from "../redux/actions/userActions";

export default function DBHeader() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const firebaseAuth = getAuth(app);
  const navigate = useNavigate();
  const handleLogout = () => {
    firebaseAuth
      .signOut()
      .then(() => {
        dispatch(deleteUsers());
        navigate("/login", { replace: true });
      })
      .catch((err) => console.log("error", err));
  };
  return (
    <div className="w-full flex items-center justify-between gap-3">
      <p className="text-2xl text-headingColor">
        Welcome to City
        {user?.data?.name && (
          <span className="block text-base text-gray-500">{`Hello ${user?.data?.name}...!`}</span>
        )}
      </p>
      <div className="flex items-center justify-center gap-4">
        <div className="flex items-center justify-center gap-3 py-2 px-4 bg-lightOverlay backdrop-blur-md shadow-md rouded-md">
          <MdSearch className="text-gray-400 text-2xl" />
          <input
            className="border-none outline-none bg-transparent w-32"
            type="text"
            placeholder="Search Here..."
          />
          <BsToggles2 className="text-gray-400 text-2xl" />
        </div>
        <motion.div
          {...buttonClick}
          className="w-10  h-10 rounded-md cursor-pointer bg-lightOverlay backdrop-blur-md shadow-md flex items-center justify-center"
        >
          <BsFillBellFill className="text-gray-400 text-xl" />
        </motion.div>
        <div className=" w-12 h-12 rounded-full shadow-md  cursor-pointer overflow-hidden flex items-center justify-center">
          <motion.img
            whileHover={{ scale: 1.15 }}
            className="w-full h-full object-cover"
            src={user?.data?.picture ? user?.data?.picture : Avater}
            alt="img"
          />
        </div>
        <motion.div
          {...buttonClick}
          onClick={handleLogout}
          className="group flex items-center justify-center px-3 py-2 rounded-md shadow-md bg-gray-200 hover:bg-gray-300 gap-3"
        >
          <MdLogout className="text-2xl text-textColor group-hover::text-headingColor" />
        </motion.div>
      </div>
    </div>
  );
}
