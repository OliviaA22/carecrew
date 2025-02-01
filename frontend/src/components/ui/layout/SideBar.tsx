import React, { JSX } from "react";
import { NavLink } from "react-router-dom";
import { LuLayoutDashboard } from "react-icons/lu";
import { FaUserDoctor } from "react-icons/fa6";
import {
  MdManageAccounts,
  MdOutlineManageHistory,
  MdOutlineHome,
  MdPerson,
} from "react-icons/md";
import { useAuth } from "../../../pages/LogIn/AuthContext";

interface SideBarProps {
  role?: string;
}

interface NavLinkItem {
  name: string;
  link: string;
  icon: JSX.Element;
}

const SideBar: React.FC<SideBarProps> = ({ role }) => {
  const { userData } = useAuth(); // Get user data from AuthContext

  const getNavLinks = (): NavLinkItem[] => {
    const commonLinks: NavLinkItem[] = [
      {
        name: "Dashboard",
        link:
          userData?.role === "admin" ? "/admindashboard" : "/nursedashboard",
        icon: <LuLayoutDashboard size={20} />,
      },
      {
        name: "Patients",
        link: "/patients",
        icon: <MdPerson size={24} />,
      },
      {
        name: "News",
        link: "/news",
        icon: <MdOutlineManageHistory size={22} />,
      },
    ];

    if (userData?.role === "admin") {
      return [
        ...commonLinks,
        {
          name: "Nurses",
          link: "/nurses",
          icon: <FaUserDoctor size={24} />,
        },
      ];
    }

    return commonLinks;
  };

  const navLinks = getNavLinks();

  return (
    <div className="w-[262px] h-screen py-4 px-4 flex flex-col bg-blue-600">
      <div className="text-white italia text-2xl font-semibold">
        CareCrew MedAssist
      </div>
      <div className="flex flex-col gap-6 mt-14">
        {navLinks.map((link, index) => (
          <NavLink
            to={link.link}
            key={index}
            className={({ isActive }) =>
              isActive
                ? "flex flex-row gap-[6px] items-center bg-white h-12 rounded-[50px] pl-4 text-black font-medium"
                : "flex flex-row gap-[6px] items-center h-12 rounded-[50px] pl-4 transition text-white hover:text-black hover:bg-white duration-200 font-normal"
            }
          >
            {link.icon}
            <span>{link.name}</span>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default SideBar;
