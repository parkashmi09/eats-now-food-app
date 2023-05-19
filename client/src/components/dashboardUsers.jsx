import React, { useEffect } from "react";
import { getAllUsers } from "../helpers";
import { useSelector, useDispatch } from "react-redux";
import { setAllUserDetails } from "../redux/actions/allUsersAction";
import DataTable from "./dataTable";
import { Avater } from "../assets";

export default function DashboardUsers() {
  const users = useSelector((state) => state?.allUsers);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!users) {
      getAllUsers().then((res) => dispatch(setAllUserDetails(res)));
    }
  }, [users]);
  return (
    <div className="flex items-center justify-self-center gap-4 pt-6 w-full">
      <DataTable
        columns={[
          {
            title: "Image",
            field: "photoURL",
            render: (rowData) => (
              <img
                className="w-32 h-16 object-contain rounded-md"
                src={rowData?.photoURL ? rowData?.photoURL : Avater}
              />
            ),
          },
          {
            title: "Name",
            field: "displayName",
          },
          {
            title: "Category",
            field: "productCategory",
          },
          {
            title: "E-mail",
            field: "email",
          },
          {
            title: "Verified",
            field: "emailVerified",
            render: (rowData) => (
              <p
                className={`px-2 py-1 w-32 text-center text-primary rounded-md ${
                  rowData?.emailVerified ? "bg-emerald-500" : "bg-orange-500"
                }`}
              >
                {rowData?.emailVerified ? "Verified" : "Not Verified"}
              </p>
            ),
          },
        ]}
        data={users}
        title="List of Users"
      />
    </div>
  );
}
