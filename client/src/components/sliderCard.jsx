import React from "react";
import { HiCurrencyRupee, IoMdBasket } from "../assets/icons";
import { motion } from "framer-motion";
import { buttonClick } from "../animations";
import { useDispatch, useSelector } from "react-redux";
import { addNewItemToCart, getAllCartItems } from "../helpers";
import { alertNull, alertSuccess } from "../redux/actions/alertActions";
import { setCartItems } from "../redux/actions/cartAction";

export default function SliderCard({ key, data, index }) {
  const user = useSelector((state) => state?.user);
  const dispatch = useDispatch();
  console.log("user id", user?.data?.user_id);
  const addToCart = () => {
    addNewItemToCart(user?.data?.user_id, data).then((res) => {
      dispatch(alertSuccess("Added to Cart"));
      getAllCartItems(user?.data?.user_id).then((res) => {
        dispatch(setCartItems(res));
      });
      setTimeout(() => {
        dispatch(alertNull());
      }, 2000);
    });
  };
  return (
    <div className="bg-lightOverlay hover:drop-shadow-lg backdrop-blur-md  rounded-xl flex items-center justify-between relative px-4 py-2 w-full md:w-340 md:min-w-350 gap-3">
      <img
        src={data?.productImage}
        alt=""
        className="w-40 h-40 object-contain"
      />
      <div className="relative pt-12">
        <p className="text-xl text-headingColor font-semibold">
          {data?.productName}
        </p>
        <p className="text-lg font-semibold text-orange-500 flex gap-1 justify-center items-center">
          <HiCurrencyRupee className="text-orange-500" />{" "}
          {parseFloat(data?.productPrice).toFixed(2)}
        </p>
        <motion.div
          {...buttonClick}
          onClick={addToCart}
          className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center absolute -top-4 right-2 cursor-pointer"
        >
          <IoMdBasket />
        </motion.div>
      </div>
    </div>
  );
}
