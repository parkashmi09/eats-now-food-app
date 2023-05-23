import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "../assets/css/swiperStyles.css";
import "swiper/css/bundle";
import { useSelector } from "react-redux";
import { SliderCard } from "../components";

export default function Slider() {
  const products = useSelector((state) => state?.products);
  console.log("products", products);
  const [fruits, setFruits] = useState(null);
  console.log("fruits is", fruits);

  useEffect(() => {
    setFruits(products?.filter((p) => p.productCategory === "fruits"));
  }, [products]);
  return (
    <div className="w-full pt-24">
      <Swiper
        slidesPerView={4}
        centeredSlides={true}
        spaceBetween={30}
        grabCursor={true}
      >
        {fruits &&
          fruits?.map((data, i) => (
            <SwiperSlide key={i}>
              <SliderCard data={data} index={i} key={i} />
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
}
