import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { Dashboard, Login, Main } from "./containers";
import { getAuth } from "firebase/auth";
import { app } from "./config/firebase.config";
import { motion } from "framer-motion";
import { getAllCartItems, validateJwtToken } from "./helpers";
import { useDispatch, useSelector } from "react-redux";
import { setUserDetails } from "./redux/actions/userActions";
import { Loader } from "rsuite";
import { Alert, Checkout, UserOrders } from "./components";
import { setCartItems } from "./redux/actions/cartAction";

export default function App() {
  const [laoding, setLoading] = useState(false);
  const auth = getAuth(app);
  const dispatch = useDispatch();
  const alert = useSelector((state) => state.alert);
  useEffect(() => {
    setLoading(true);
    auth.onAuthStateChanged((cred) => {
      if (cred) {
        cred.getIdToken().then((token) =>
          validateJwtToken(token).then((data) => {
            if (data) {
              getAllCartItems(data?.user_id).then((items) => {
                dispatch(setCartItems(items));
              });
            }
            dispatch(setUserDetails(data));
          })
        );
      }
    });
    setInterval(() => {
      setLoading(false);
    }, 3000);
  }, []);
  return (
    <div className="w-screen min-h-screen h-auto flex flex-col items-center justify-center">
      {laoding && (
        <motion.div className="fixed z-50 inset-0 bg-lightOverlay backdrop-blur-md flex items-center justify-center w-full">
          <Loader size="lg" />
        </motion.div>
      )}
      <Routes>
        <Route path="/*" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard/*" element={<Dashboard />} />
        <Route path="/checkout-success" element={<Checkout />} />
        <Route path="/user-orders" element={<UserOrders />} />
      </Routes>
      {alert?.type && <Alert type={alert?.type} message={alert?.message} />}
    </div>
  );
}
