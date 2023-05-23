import React from "react";
import { Delivery, HeroBg } from "../assets";
import { showData } from "../utils/data";
import { motion } from "framer-motion";
import { steggerFadeInOut } from "../animations";

export default function Home() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-2 w-full">
      <div className="py-2 flex-1 flex flex-col items-start  justify-center gap-6">
        <div className="flex items-center gap-2 justify-center bg-orange-100  rounded-full px-4 py-1">
          <p className="text-base text-orange-500 font-semibold">
            Bike Delievery
          </p>
          <div className="w-6 h-6 bg-white rounded-full overflow-hidden drop-shadow-xl">
            <img
              src={Delivery}
              className="w-full h-full object-contain"
              alt="delievery"
            />
          </div>
        </div>
        <p className="text-[2.5rem] lg:text-[4.5rem] font-bold tracking-wide text-headingColor">
          The Fastest Delievery in{" "}
          <span className="text-orange-700 text-[3rem] lg:text-[5rem] font-extrabold">
            Your Town
          </span>
        </p>
        <p className="text-base text-textColor text-center md:text-left md:w-[80%]">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          trinagele.
        </p>
        <a
          href="#fruit"
          type="button"
          className=" md:w-auto bg-gradient-to-br from-orange-400 to-orange-500 w-full px-4 py-2 rounded-lg hover:shadow-lg transition-all ease-in-out duration-100"
        >
          Order Now
        </a>
      </div>
      {/* <div className="py-2  flex-1 flex items-center relative">
        <img
          className="h-420 full-width lg:w-auto lg:h-[650px] ml-auto"
          src={HeroBg}
          alt="hero"
        />

        <div className="h-full w-full absolute top-0 left-0 flex  flex-wrap justify-center items-center px-32 py-4 gap-2">
          {showData &&
            showData.map((data) => (
              <div
                key={data.id}
                className="w-190 min-w-[190px] bg-cardOverlay backdrop-blur-md p-4 rounded-md flex flex-col items-center justify-center"
              >
                <img
                  src={data.imageSrc}
                  className="w-20 lg:w-40 -mt-10 lg:-mt-20"
                  alt="I1"
                />
                <p className="text-textColor mt-2 lg:text-xl text-base font-semibold">
                  {data.name}
                </p>
                <p className="text-[12px] lg:text-sm text-gray-700 my-1 lg:my-3">
                  {data.des}
                </p>
                <p className="text-sm font-semibold text-headingColor">
                  <span className="text-xs text-orange-600">$</span>
                  {data.price}
                </p>
              </div>
            ))}
        </div>
      </div> */}
    </section>
  );
}
