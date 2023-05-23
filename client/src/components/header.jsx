import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { isActiveStyles, isNotActiveStyles } from "../utils/styles";
import { motion } from "framer-motion";
import { SlideTop, buttonClick } from "../animations";
import { MdLogout, MdShoppingCart } from "../assets/icons";
import { useDispatch, useSelector } from "react-redux";
import { deleteUsers } from "../redux/actions/userActions";
import { getAuth } from "firebase/auth";
import { app } from "../config/firebase.config";
import { Avater } from "../assets";
import { setCartOn } from "../redux/actions/displayCartAction";

export default function Header() {
  const user = useSelector((state) => state?.user);
  const cartItems = useSelector((state) => state?.cartItems);
  console.log("cartItems", cartItems);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const firebaseAuth = getAuth(app);
  const [isMenu, setIsMenu] = useState(false);
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
    <header className="fixed  backdrop-blur-md z-50 inset-x-0 top-0 flex items-center justify-between py-6">
      <NavLink to={"/"} className="flex items-center justify-center gap-4">
        Logo
      </NavLink>
      <nav className="flex items-center justify-center gap-8">
        <ul className="hidden md:flex items-center justify-center gap-16">
          <NavLink
            className={({ isActive }) =>
              isActive ? isActiveStyles : isNotActiveStyles
            }
            to={"/"}
          >
            Home
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive ? isActiveStyles : isNotActiveStyles
            }
            to={"/menu"}
          >
            Menu
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive ? isActiveStyles : isNotActiveStyles
            }
            to={"/services"}
          >
            Services
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive ? isActiveStyles : isNotActiveStyles
            }
            to={"/about"}
          >
            About Us
          </NavLink>
          <motion.div
            {...buttonClick}
            onClick={() => dispatch(setCartOn())}
            className="relative cursor-pointer"
          >
            <MdShoppingCart className="text-3xl text-textColor " />
            {cartItems?.length > 0 && (
              <div className="absolute -top-4 -right-1 h-6 w-6 rounded-full flex items-center justify-center bg-red-500">
                <p className="text-primary text-base absolute">
                  {cartItems?.length}
                </p>
              </div>
            )}
          </motion.div>
          {user ? (
            <>
              <div
                onMouseEnter={() => setIsMenu(true)}
                className="relative cursor-pointer"
              >
                <div className=" w-12 h-12 rounded-full shadow-md  cursor-pointer overflow-hidden flex items-center justify-center">
                  <motion.img
                    whileHover={{ scale: 1.15 }}
                    className="w-full h-full object-cover"
                    src={user?.data?.picture ? user?.data?.picture : Avater}
                    alt="img"
                  />
                </div>
                {isMenu && (
                  <motion.div
                    {...SlideTop}
                    onMouseLeave={() => setIsMenu(false)}
                    className="px-12 py-4 w-[233px] bg-lightOverlay backdrop-blur-md rounded-md shadow-md absolute top-12 right-0 flex flex-col items-center justify-center gap-4"
                  >
                    <Link
                      to={"/dashboard/home"}
                      className="hover:text-red-500 text-xl text-textColor"
                    >
                      Dasboard
                    </Link>
                    <Link
                      to={"/profile"}
                      className="hover:text-red-500 text-xl text-textColor"
                    >
                      My Profile
                    </Link>
                    <Link
                      to={"/user-orders"}
                      className="hover:text-red-500 text-xl text-textColor"
                    >
                      Orders
                    </Link>
                    <hr />
                    <motion.div
                      {...buttonClick}
                      onClick={handleLogout}
                      className="group flex items-center justify-center px-3 py-2 rounded-md shadow-md bg-gray-200 hover:bg-gray-300 gap-3"
                    >
                      <MdLogout className="text-2xl text-textColor group-hover::text-headingColor" />
                      <p className="text-textColor text-xl group-hover:text-headingColor">
                        Sign Out
                      </p>
                    </motion.div>
                  </motion.div>
                )}
              </div>
            </>
          ) : (
            <NavLink to={"/login"}>
              <motion.button
                className="px-4 py-2 shadow-md rounded-md bg-lightOverlay border border-red-300 cursor-pointer"
                {...buttonClick}
              >
                Login
              </motion.button>
            </NavLink>
          )}
        </ul>
      </nav>
    </header>
  );
}
