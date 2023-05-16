import React from "react";
import { motion } from "framer-motion";
import { fadeInOut } from "../animations";
import { FaCheck, BsExclamationTriangleFill } from "../assets/icons";

export default function Alert({ type, message }) {
  switch (type) {
    case "success":
      return (
        <motion.div
          {...fadeInOut}
          className="fixed z-50 top-32 right-12 px-4 py-2  bg-emerald-300 shadow-md flex items-center justify-center gap-6 rounded-mdF backdrop-blur-sm"
        >
          <FaCheck className="text-xl text-emerald-700" />
          <p className="text-xl text-emerald-700">{message}</p>
        </motion.div>
      );
    case "warning":
      return (
        <motion.div
          {...fadeInOut}
          className="fixed z-50 top-32 right-12 px-4 py-2  bg-orange-300 shadow-md flex items-center justify-center gap-6 rounded-mdF backdrop-blur-sm"
        >
          <BsExclamationTriangleFill className="text-xl text-orange-700" />
          <p className="text-xl text-orange-700">{message}</p>
        </motion.div>
      );
    case "danger":
      return (
        <motion.div
          {...fadeInOut}
          className="fixed z-50 top-32 right-12 px-4 py-2  bg-red-300 shadow-md flex items-center justify-center gap-6 rounded-mdF backdrop-blur-sm"
        >
          <FaCheck className="text-xl text-red-700" />
          <p className="text-xl text-red-700">{message}</p>
        </motion.div>
      );
    case "info":
      return (
        <motion.div
          {...fadeInOut}
          className="fixed z-50 top-32 right-12 px-4 py-2  bg-blue-300 shadow-md flex items-center justify-center gap-6 rounded-mdF backdrop-blur-sm"
        >
          <FaCheck className="text-xl text-blue-700" />
          <p className="text-xl text-blue-700">{message}</p>
        </motion.div>
      );
    default:
      return null;
  }
}
