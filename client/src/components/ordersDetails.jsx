import React from "react";
import { motion } from "framer-motion";
import { buttonClick, steggerFadeInOut } from "../animations";
import { HiCurrencyRupee } from "../assets/icons";
import { getAllOrders, updateOrderStatus } from "../helpers";
import { useDispatch } from "react-redux";
import { setOrder } from "../redux/actions/orderAction";
import { alertNull, alertSuccess } from "../redux/actions/alertActions";

export default function OrderDetails({ index, data, admin }) {
  const dispatch = useDispatch();
  const handleClick = (orderId, status) => {
    updateOrderStatus(orderId, status).then((res) =>
      getAllOrders().then((data) => {
        dispatch(setOrder(data));
        dispatch(alertSuccess("Order Status has been Changed"));
        setTimeout(() => {
          dispatch(alertNull());
        }, 2000);
      })
    );
  };
  return (
    <motion.div
      {...steggerFadeInOut(index)}
      className="w-full flex flex-col items-start justify-start px-3 py-2 border relative border-gray-300 bg-lightOverlay drop-shadow-md rounded-mg gap-4"
    >
      <div className="w-full flex items-center justify-between">
        <h1 className="text-xl text-headingColor font-semibold">Orders</h1>
        <div className="flex items-center gap-3">
          <p className="flex items-center gap-1 text-textColor">
            Total:
            <HiCurrencyRupee className="text-orange-500 text-lg" />
            <span className="text-headingColor font-bold">{data?.total}</span>
          </p>
          <p className="my-auto px-2 py-[2px] text-sm text-headingColor font-semibold capitalize rounded-md bg-emerald-500">
            {data?.status}
          </p>
          <p
            className={`my-auto text-base font-semibold capitalize border boreder-gray-300 px-2 py-[2px] rounded-md ${
              (data?.sts === "preparing" && "text-orange-500 bg-orange-100") ||
              (data?.sts === "cancelled" && "text-red-500 bg-red-100") ||
              (data?.sts === "delivered" && "text-emerald-500 bg-emerald-100")
            } `}
          >
            {data?.sts}
          </p>
          {admin && (
            <div className="flex  items-center justify-center gap-2">
              <p className="text-lg font-semibold text-headingColor">Mark As</p>
              <motion.p
                {...buttonClick}
                onClick={() => handleClick(data?.orderId, "preparing")}
                className={`text-orange-500 text-base font-semibold capitalize border border-gray-300 px-2 py-[2px] rounded-md cursor-pointer  my-auto`}
              >
                Preparing
              </motion.p>
              <motion.p
                {...buttonClick}
                onClick={() => handleClick(data?.orderId, "cancelled")}
                className={`text-red-500 text-base font-semibold capitalize  my-auto border border-gray-300 px-2 py-[2px] rounded-md cursor-pointer`}
              >
                Cancelled
              </motion.p>
              <motion.p
                {...buttonClick}
                onClick={() => handleClick(data?.orderId, "delivered")}
                className={`text-emerald-500 text-base font-semibold  my-auto capitalize border border-gray-300 px-2 py-[2px] rounded-md cursor-pointer`}
              >
                Preparing
              </motion.p>
            </div>
          )}
        </div>
      </div>
      <div className="flex items-center justify-start flex-wrap w-full">
        <div className="flex items-center gap-4">
          {data?.items &&
            data?.items?.map((d, i) => (
              <motion.div
                {...steggerFadeInOut(i)}
                key={i}
                className="flex items-center gap-1 "
              >
                <div className="flex items-start flex-col">
                  <p className="text-sm text-headingColor">{d?.productName}</p>
                  <p className="flex items-center gap-1 text-textColor">
                    <HiCurrencyRupee className="text-base text-red-500" />
                    {parseFloat(d.productPrice).toFixed(2)}
                  </p>
                </div>
              </motion.div>
            ))}
        </div>
        <div className="flex items-start justify-start flex-col gap-2 px-6 ml-auto w-full md:w-460">
          <h1 className="text-lg text-headingColor font-semibold">
            {data?.shipping_details?.name}
          </h1>
          <p className="text-base text-headingColor -mt-2">
            {data?.customer?.email} {data?.customer?.phone}
          </p>
          <p className=" text-base text-textColor -mt-2">
            {data?.shipping_details?.address.line1},
            {data?.shipping_details?.address.line2}{" "}
            {data?.shipping_details?.address.country},
            {data?.shipping_details?.address.state}-
            {data?.shipping_details?.address.postal_code},
          </p>
        </div>
      </div>
    </motion.div>
  );
}
