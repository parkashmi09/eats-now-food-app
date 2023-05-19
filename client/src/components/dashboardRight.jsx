import React, { useEffect } from "react";
import DBHeader from "./dbHeader";
import { Route, Routes } from "react-router-dom";
import { DBHome, DBItems, DBNewItem, DBOrders, DBUsers } from ".";
import { setProducts } from "../redux/actions/productActions";
import { getAllProducts } from "../helpers";
import { useDispatch } from "react-redux";
export default function DashboardRight() {
  const dispatch = useDispatch();
  useEffect(() => {
    getAllProducts().then((res) => dispatch(setProducts(res)));
  }, []);
  return (
    <div className="flex flex-col py-12 flex-1 h-full px-12">
      <DBHeader />
      <div className="flex flex-col overflow-y-scroll">
        <Routes>
          <Route path="/home" element={<DBHome />} />
          <Route path="/orders" element={<DBOrders />} />
          <Route path="/items" element={<DBItems />} />
          <Route path="/new-item" element={<DBNewItem />} />
          <Route path="/users" element={<DBUsers />} />
        </Routes>
      </div>
    </div>
  );
}
