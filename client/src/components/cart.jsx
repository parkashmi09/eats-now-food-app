import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { SlideIn, buttonClick, steggerFadeInOut } from "../animations";
import {
  BiChevronsRight,
  FcClearFilters,
  HiCurrencyRupee,
} from "../assets/icons";
import { useDispatch, useSelector } from "react-redux";
import { setCartOff } from "../redux/actions/displayCartAction";
import { baseUrl, getAllCartItems, updateQuanitity } from "../helpers";
import { setCartItems } from "../redux/actions/cartAction";
import { alertNull, alertSuccess } from "../redux/actions/alertActions";
import { clearCartItems } from "../redux/actions/cartAction";
import axios from "axios";

export default function Cart() {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state?.cartItems);
  console.log("cart is", cart)
  const user = useSelector((state) => state?.user);
  const [total, setTotal] = useState(0);
  useEffect(() => {
    let tot = 0;
    if (cart) {
      cart?.map((data) => {
        tot = tot + data?.productPrice * data?.quanitity;
        setTotal(tot);
      });
    }
  }, [cart]);
  const clearCart = () => {
    dispatch(clearCartItems());
    dispatch(alertSuccess("All Cart cleared"));
  };
  const handleCheckout = () => {
    const data = {
      user: user,
      cart: cart,
      total: total,
    };
    axios
      .post(`${baseUrl}/api/products/create-checkout-session`, { data })
      .then((res) => {
        // console.log("response comes like", res);
        if (res?.data?.url) {
          // console.log("url", window.location.href)
          window.location.href = res?.data?.url;
        }
      })
      .catch((err) => {
        console.log("err", err);
      });
  };
  return (
    <motion.div
      className="fixed z-50 top-0 right-0 full-width md:w-375 h-screen bg-lightOverlayF drop-shadow-md  backdrop-blur-md flex flex-col"
      {...SlideIn}
    >
      <div className="w-full flex items-center justify-between py-4 pb-12 px-6 cursor-pointer">
        <motion.div
          {...buttonClick}
          className="cursor-pointer"
          onClick={() => dispatch(setCartOff())}
        >
          <BiChevronsRight className="text-[50px] text-textColor" />
        </motion.div>
        <p className="text-textColor text-lg font-semibold">Cart</p>
        <motion.p
          onClick={clearCart}
          {...buttonClick}
          className="flex items-center gap-2 p-1 px-2 my-2 bg-gray-100 rounded-md hover:shadow-md duration-100 ease-in-out transition-all cursor-pointer text-textColor text-base"
        >
          <FcClearFilters className="text-[30px] text-textColor" />
        </motion.p>
      </div>
      <div className="w-full h-full bg-zinc-900 rounded-t-[2rem] flex flex-col items-start py-6 gap-3 relative">
        {cart && cart?.length > 0 ? (
          <>
            <div className="flex flex-col w-full items-start justify-start gap-3 h-[65%] overflow-y-scroll scrollbar-none px-4">
              {cart &&
                cart?.length > 0 &&
                cart?.map((item, i) => (
                  <CartItemCard key={i} index={i} data={item} />
                ))}
            </div>
            <div className="bg-zinc-800 rounded-t-[60px] w-full h-[35%] flex flex-col items-center justify-center px-4 py-6 gap-24">
              <div className="w-full flex items-center justify-evenly">
                <p className="text-3xl text-zinc-500 font-semibold">Total</p>
                <p className="text-3xl text-orange-500 font-semibold flex gap-1 items-center">
                  <HiCurrencyRupee className="text-primary" />
                  {total}
                </p>
              </div>
              <motion.button
                {...buttonClick}
                onClick={handleCheckout}
                className="bg-orange-500 w-[70%] px-4 py-6 text-xl text-headingColor font-semibold hover:bg-orange-600 drop-shadow-md rounded-2xl"
              >
                Check Out
              </motion.button>
            </div>
          </>
        ) : (
          <>
            <h1 className="text-3xl text-primary font-bold">Empty Cart</h1>
          </>
        )}
      </div>
    </motion.div>
  );
}

export const CartItemCard = ({ index, data }) => {
  const cart = useSelector((state) => state?.cartItems);
  const user_id = useSelector((state) => state?.user?.data?.user_id);
  const dispatch = useDispatch();
  const [itemTotal, setItemTotal] = useState(0);
  const handleIncrement = (id) => {
    dispatch(alertSuccess("Updated the cart item"));
    updateQuanitity(user_id, id, "increment").then((res) => {
      getAllCartItems(user_id).then((items) => {
        dispatch(setCartItems(items));
        dispatch(alertNull());
      });
    });
  };
  const handleDecrement = (id) => {
    dispatch(alertSuccess("Updated the cart item"));
    updateQuanitity(user_id, id, "decrement").then((res) => {
      getAllCartItems(user_id).then((items) => {
        dispatch(setCartItems(items));
        dispatch(alertNull());
      });
    });
  };
  useEffect(() => {
    setItemTotal(data?.productPrice * data?.quanitity);
  }, [cart, itemTotal]);
  return (
    <motion.div
      className="w-full flex  items-center justify-start bg-zinc-800 rounded-md drop-shadow-xl gap-4"
      key={index}
      {...steggerFadeInOut}
    >
      <img
        className="w-24 min-w-[94px] h-24 object-contain"
        src={data?.productImage}
      />
      <div className="flex items-center justify-start gap-1 w-full ">
        <p className="text-lg text-primary font-semibold ">
          {data?.productName}
          <span className="text-sm block capitalize text-gray-400">
            {data?.productCategory}
          </span>
        </p>
        <p className="text-sm font-semibold text-orange-400 ml-auto flex items-center gap-1">
          <HiCurrencyRupee />
          {itemTotal ?? 0}
        </p>
      </div>
      <div className="ml-auto flex items-center justify-center gap-3 ">
        <motion.div
          {...buttonClick}
          onClick={() => handleDecrement(data?.productId)}
          className="w-8 h-8 flex items-center justify-center rounded-md drop-shadow-md bg-zinc-900 cursor-pointer"
        >
          <p className="text-xl font-semibold text-primary">-</p>
        </motion.div>
        <p className="text-lg text-primary font-semibold">{data?.quanitity}</p>
        <motion.div
          {...buttonClick}
          onClick={() => handleIncrement(data?.productId)}
          className="w-8 h-8 flex items-center justify-center rounded-md drop-shadow-md bg-zinc-900 cursor-pointer"
        >
          <p className="text-xl font-semibold text-primary">+</p>
        </motion.div>
      </div>
    </motion.div>
  );
};
