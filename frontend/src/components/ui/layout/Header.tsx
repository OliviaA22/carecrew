import { motion } from "framer-motion";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import bgPreview from "@/assets/icon/LOGO.png";

const Help: React.FC = () => {
  return (
    <motion.div
      key="help-modal"
      initial={{ opacity: 0, scale: 0.2 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.2 }}
      transition={{
        duration: 0.6,
        ease: [0, 0.71, 0.2, 1.01],
      }}
      className="absolute h-40 z-3"
    >
      <div className="w-[320px] p-4 ml-[-200px] mt-[120px] rounded-lg bg-white">
        <h3>Help Center</h3>
        <p>This is where you can add your help content.</p>
      </div>
    </motion.div>
  );
};

const Header: React.FC = () => {
  const [help, setHelp] = useState<boolean>(false);

  const toggle = () => {
    setHelp(!help);
  };

  return (
    <div className="bg-blue-600 w-full h-16 items-center flex px-20">
      <div className="flex flex-row justify-between w-full">
        <Link
          to="/"
          className="z-10 flex flex-row items-center inter text-white font-medium text-2xl"
        >
          <img
            src={bgPreview}
            alt="Icon"
            style={{ height: "50px", width: "auto" }}
            className="z-10"
          />
        </Link>
        {help && (
          <div
            onClick={toggle}
            className="w-full z-2 fixed hover:cursor-pointer h-screen top-0 left-0 right-0 bottom-0"
          ></div>
        )}
        <div className="flex flex-row items-center gap-6">
          <div
            onClick={toggle}
            className="flex transition duration-300 ease-in pb-2 hover:cursor-pointer hover:bg-[#f1f1f1aa] p-2 py-1 rounded-lg z-10 items-center gap-1"
          >
            <div className="text-white text-sm inter">Help center</div>
          </div>
          {help && <Help />}
          <div className="flex flex-row items-center gap-4">
            <Link
              to="/signup"
              className="z-10 text-white transition duration-300 ease-in pb-2 hover:cursor-pointer hover:bg-[#f1f1f1aa] p-2 py-1 rounded-lg text-sm inter"
            >
              Book a demo
            </Link>
            <Link
              to="/signin"
              className="z-10 text-white transition duration-300 ease-in pb-2 hover:cursor-pointer hover:bg-[#f1f1f1aa] p-2 py-1 rounded-lg text-sm inter"
            >
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
