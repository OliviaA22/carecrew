import React from "react";
import { AnnouncementIcon, Cart, HeartIcon } from "../../assets/img/assets";
import { TbHelp } from "react-icons/tb";

const Services: React.FC = () => {
  return (
    <div className="h-screen p-20 flex flex-col gap-11">
      <h1 className="font-semibold text-2xl text-center">
        We are at the service of nurses.
      </h1>
      <div className="flex flex-col gap-10 w-full items-center">
        <div className="flex flex-row items-center justify-center gap-20">
          <div className="items-center max-w-[340px] justify-center flex flex-col gap-5">
            <img src={Cart} alt="" />
            <div className="text-center">
              <span>Administer</span>{" "}
              <span className="font-semibold">
                easily and quickly medication{" "}
              </span>
              <span className="text-blue-600">in your ward or hospitals.</span>
            </div>
          </div>
          <div className="items-center max-w-[340px] justify-center flex flex-col gap-5">
            <img src={HeartIcon} alt="" />
            <div className="text-center">
              <span>Help nurses</span>{" "}
              <span className="font-semibold">be healthy and relaxed</span>
              <span>
                {" "}
                while they{" "}
                <span className="font-semibold">can provide quality care </span>
                to improve{" "}
                <span className="font-semibold">patient outcomes.</span>
              </span>
            </div>
          </div>
        </div>
        <div className="items-center max-w-[240px] justify-center flex flex-col gap-4">
          <img src={AnnouncementIcon} alt="" />
          <div className="text-center">
            Learn about <span className="font-bold">health precautions</span> to
            protect yourself and stay healthy.
          </div>
        </div>
      </div>
      <div className="flex flex-row items-center justify-center mt-8 gap-4">
        <h1 className="text-3xl font-bold text-blue-900">
          CareCrew in the future
        </h1>
        <div className="flex flex-col items-center justify-center">
          <h2 className="font-semibold text-2xl text-blue-500">millions of</h2>
          <div className="flex flex-row items-center">
            <span className="">Patients</span>
            <TbHelp />
          </div>
        </div>
        <div className="flex flex-col items-center justify-center">
          <h2 className="font-semibold text-2xl text-blue-500">thousands of</h2>
          <div className="flex flex-row items-center">
            <span className="">Nurses</span>
            <TbHelp />
          </div>
        </div>
        <div className="flex flex-col items-center justify-center">
          <h2 className="font-semibold text-2xl text-blue-500">
            with about 97%
          </h2>
          <div className="flex flex-row items-center">
            <span className="">satisfaction</span>
            <TbHelp />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
