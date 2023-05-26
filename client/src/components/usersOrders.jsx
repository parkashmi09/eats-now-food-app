import React, { useEffect, useState } from "react";
import { Header, OrderDetails } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrders } from "../helpers";
import { setOrder } from "../redux/actions/orderAction";

export default function UsersOrders() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const orders = useSelector((state) => state.orders);
  const [userOrders, setUserOrders] = useState([]);
  console.log("users data comes like", userOrders);
  console.log("orders are", orders)

  useEffect(() => {
    const fetchOrders = async () => {
      if (!orders) {
        const res = await getAllOrders();
        console.log("res", res)
        dispatch(setOrder(res));
        setUserOrders(
            res.filter((data) => data?.userId === user?.data?.user_id)
            );
        } else {
          console.log("users are", user?.data?.user_id)
        setUserOrders(
          orders.filter((data) => data?.userId === user?.data?.user_id)
        );
      }
    };

    fetchOrders();
  }, [orders, user]);

  return (
    <main className="w-screen min-h-screen flex items-center justify-center flex-col bg-primary">
      <Header />
      <div className="w-full flex flex-col items-center justify-start mt-40 px-6 md:px-24 2xl:px-96 gap-12 pb-24 overflow-x-hidden">
        {userOrders.length > 0 ? (
          userOrders.map((item, i) => (
            <OrderDetails key={i} index={i} data={item} admin={true} />
          ))
        ) : (
          <h1 className="text-6xl text-headingColor font-bold">No Data</h1>
        )}
      </div>
    </main>
  );
}
