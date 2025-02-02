import React from "react";

const Footer: React.FC = () => {
  return (
    <div className="mx-20 py-8 border-t-2 border-blue-50 flex flex-col gap-10">
      <div className="flex flex-row items-center gap-14">
        <h1 className="text-blue-400 text-3xl italia font-semibold">
          CareCrew
        </h1>
        <span className="text-gray-500">
          Copyright © 2024 CareCrew, All rights reserved.
        </span>
      </div>
      <div className="flex flex-row gap-10">
        <div className="flex flex-col w-48 gap-6">
          <h1 className="font-medium text-blue-900">Our company</h1>
          <div className="flex flex-col gap-1">
            <span>About us</span>
            <span>Values</span>
          </div>
        </div>
        <div className="flex flex-col w-48 gap-6">
          <h1 className="font-medium text-blue-900">
            For health professionals
          </h1>
          <div className="flex flex-col gap-1">
            <span>CareCrew Community</span>
          </div>
        </div>
      </div>
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-row items-center gap-14">
          <div className="flex flex-row items-center gap-2">
            <span className="font-semibold">Country:</span>
            <span>Deutschland</span>
          </div>
          <div className="flex flex-row items-center gap-2">
            <span className="font-semibold">Language:</span>
            <span>English</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
