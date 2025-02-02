import React from "react";
import bgPreview from "@/assets/img/doctors-grid/heroNurse.png";
import sadPreview from "@/assets/img/doctors-grid/overworked-nurse.png";

const HeroSection: React.FC = () => {
  return (
    <div className="relative bg-blue-600 h-[350px] rounded-bl-3xl shadow-custom">
      <div className="flex flex-col lg:flex-row h-full px-4 lg:px-12 justify-between items-center">
        {/* Text Section */}
        <div className="text-center lg:text-left text-white max-w-sm">
          <h1 className="text-2xl lg:text-3xl font-bold leading-snug mb-3">
            Make Your Nurses <span className="text-yellow-300">Happy</span>
          </h1>
          <p className="text-sm lg:text-base">
            Empower your healthcare team with tools that make their work easier
            and more efficient.
          </p>
        </div>

        {/* Images Section */}
        <div className="flex flex-row items-center gap-0.5 mt-0.5 lg:mt-0">
          <img
            src={sadPreview}
            alt="Overworked Nurse"
            className="h-[50px] w-[50px] object-cover rounded-sm"
            style={{ width: "300px", height: "300px" }}
          />
          <img
            src={bgPreview}
            alt="Happy Nurse"
            className="h-[200px] w-[200px] object-cover rounded-sm"
            style={{ width: "500px", height: "500" }}
          />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
