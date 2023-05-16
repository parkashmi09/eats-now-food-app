import React from "react";
import { NavLink } from "react-router-dom";
import { isActiveStyles, isNotActiveStyles } from "../utils/styles";

export default function DashboardLeft() {
  return (
    <div className="h-full py-12 flex flex-col  bg-lightOverlay backdrop-blur-md shadow-md min-w-210 w-300 gap-3">
      <NavLink
        to={"/dashboard/home"}
        className="flex items-center justify-start px-6 gap-4"
      >
        Logo
      </NavLink>
      <hr />
      <ul className="flex flex-col gap-4">
        <NavLink
          className={({ isActive }) =>
            isActive
              ? `${isActiveStyles} px-4 py-2 border-l-8 border-orange-500 `
              : isNotActiveStyles
          }
          to={"/"}
        >
          Home
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? `${isActiveStyles} px-4 py-2 border-l-8 border-orange-500 `
              : isNotActiveStyles
          }
          to={"/dashboard/orders"}
        >
          Orders
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? `${isActiveStyles} px-4 py-2 border-l-8 border-orange-500 `
              : isNotActiveStyles
          }
          to={"/dashboard/items"}
        >
          Items
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? `${isActiveStyles} px-4 py-2 border-l-8 border-orange-500 `
              : isNotActiveStyles
          }
          to={"/dashboard/newItem"}
        >
          Add New Item
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? `{isActiveStyles} px-4 py-2 border-l-8 border-orange-500 `
              : isNotActiveStyles
          }
          to={"/dashboard/users"}
        >
          Users
        </NavLink>
      </ul>
      <div className="w-full items-center justify-center flex h-225 mt-auto px- text-center">
        <div className="w-full h-full rounded-md bg-orange-400 flex items-center justify-center flex-col gap-3 px-3">
          <div className="w-12 h-12 border  bg-white rounded-full flex items-center justify-center">
            <p className="text-2xl font-bold text-orange-500">?</p>
          </div>
          <p className="text-xl text-primary text-center">Help Center</p>
          <p>Having trouble in City, Please Contact us for more questions</p>
          <p className="px-4 py-2 bg-white  rounded-full cursor-pointer text-orange-400">Get In Touch</p>
        </div>
      </div>
    </div>
  );
}
