import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "../redux/actions/productActions";
import { getAllProducts } from "../helpers";

export default function DashboardHome() {
  // const products = useSelector((state) => state);
  // console.log("products comes like", products);
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   getAllProducts().then((res) => dispatch(setProducts(res)));
  // }, []);
  return <div>DdashboardHome</div>;
}
