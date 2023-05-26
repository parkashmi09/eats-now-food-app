import React, { useEffect } from "react";
import { getAllOrders } from "../helpers";
import { useDispatch, useSelector } from "react-redux";
import { setOrder } from "../redux/actions/orderAction";
import OrderDetails from "./ordersDetails";

export default function DBOrders() {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.orders);
  console.log("orders are", orders.length);
  useEffect(() => {
    getAllOrders().then((res) => dispatch(setOrder(res)));
  }, []);
  return (
    <div className="flex flex-col items-center justify-center pt-6 w-full gap-4">
      {orders && orders.length > 0 ? (
        <>
          {orders?.map((item, i) => (
            <OrderDetails key={i} index={i} data={item} admin={true} />
          ))}
        </>
      ) : (
        <>
          <h1 className="text-[72px] text-headingColor font-bold">No Data</h1>
        </>
      )}
    </div>
  );
}
