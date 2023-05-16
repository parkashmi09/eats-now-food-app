import React, { useState } from "react";
import { motion } from "framer-motion";
import { fadeInOut } from "../animations";

export default function LoginInput({
  placeholder,
  signUp,
  icon,
  inputState,
  inputStateFunc,
  type,
}) {
  const [isFocus, setIsFocus] = useState(false);
  return (
    <motion.div
      {...fadeInOut}
      className={`flex items-center justify-center gap-4 bg-lightOverlay backdrop-blur-md w-full px-4 py-2 rounded-md ${
        isFocus ? "shadow-md shadow-red-400" : "shadow-none"
      }`}
    >
      {icon}
      <input
        type={type}
        placeholder={placeholder}
        className="w-full h-full bg-transparent text-headingColor text-sm font-semibold border-none outline-none"
        value={inputState}
        onChange={(e) => inputStateFunc(e.target.value)}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
      />
    </motion.div>
  );
}
