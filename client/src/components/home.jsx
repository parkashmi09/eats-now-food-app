import React from "react";
import { Delivery, HeroBg } from "../assets";
import { showData } from "../utils/data";
import { motion } from "framer-motion";
import { steggerFadeInOut } from "../animations";

export default function Home() {
  return (
    <section className="w-full h-auto flex flex-col items-center justify-center">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 w-full">
        <div className="py-2 flex-1 flex flex-col items-start justify-center gap-6">
          <div className="flex items-center gap-2 justify-center bg-orange-100 px-4 py-1 rounded-full">
            <p className="text-base text-red-500 font-semibold">
              Bike Delievery
            </p>
            <div className="w-8 h-8 bg-white rounded-full overflow-hidden drop-shadow-xl">
              <img
                src={Delivery}
                alt="dle"
                className="h-full w-full object-contain"
              />
            </div>
          </div>
          <p className="text-[2.5rem] lg:text-[4.5rem] font-bold tracking-wide text-headingColor">
            The Fastest Delievery In
            <span className="text-red-500 text-[3rem] lg:text-[5rem]">
              Your City
            </span>
          </p>
          <p className="text-base text-textColor text-center md:text-left md:w-[80%]">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and trinagele.
          </p>
          <a
            href="#fruit"
            type="button"
            className="flex justify-center md:w-auto bg-gradient-to-br from-red-400 to-red-500 w-full px-4 py-2 rounded-lg hover:shadow-lg transition-all ease-in-out duration-100"
          >
            Order Now
          </a>
        </div>
        <div className="py-2 flex-1 flex justify-end items-center relative">
          <img
            src={HeroBg}
            className="absolute top-0 right-0 w-full h-420 md:w-auto md:h-650"
          />
          <div className="w-full md:w-460 ml-0 flex flex-wrap items-center justify-center gap-4 gap-y-14">
            {showData &&
              showData.map((data, i) => (
                <motion.div
                  key={i}
                  {...steggerFadeInOut(i)}
                  className="w-32 h-36 md:h-auto md:w-190 p-4 bg-lightOverlay backdrop-blur-md rounded-3xl flex flex-col items-center justify-center drop-shadow-lg"
                >
                  <img
                    className="w-12 h-12 md:w-32 md:h-32  object-contain"
                    src={data.imageSrc}
                  />
                  <p className="text-sm lg:text-xl font-semibold text-textColor capitalize">{data.name}</p>
                </motion.div>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
}
