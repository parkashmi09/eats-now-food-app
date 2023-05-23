import React, { useEffect } from "react";
import { FilterSection, Header, Home, HomeSlider } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../helpers";
import { setProducts } from "../redux/actions/productActions";
import Cart from "../components/cart";

export default function Main() {
  const products = useSelector((state) => state?.products);
  const isCart = useSelector((state) => state?.isCart);
  const dispatch = useDispatch();
  useEffect(() => {
    getAllProducts().then((res) => {
      dispatch(setProducts(res));
    });
  }, []);
  return (
    <main className="w-screen min-h-screen flex items-center  justify-center flex-col bg-primary">
      <Header />
      <div className="w-full flex flex-col items-center justify-start mt-40 px-6 md:px-24 2xl:px-96 gap-12 pb-24 overflow-x-hidden">
        <Home />
        <HomeSlider />
        <FilterSection />
      </div>
      {isCart && <Cart />}
    </main>
  );
}
