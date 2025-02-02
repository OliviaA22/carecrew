import React, { ReactNode } from "react";
import SideBar from "./SideBar";
import AdminHeader from "./adminHeader";
import { useAuth } from "../../../pages/LogIn/AuthContext"; // Adjust the import path as needed

interface PageLayoutProps {
  children: ReactNode;
  text: string;
}

const PageLayout: React.FC<PageLayoutProps> = ({ children, text }) => {
  const { userData } = useAuth(); // Get user data from AuthContext

  return (
    <div>
      <div className="fixed">
        <SideBar role={userData?.role} /> {/* Pass the role to SideBar */}
      </div>
      <div className="flex w-full flex-col">
        <div className="fixed pl-[262px] w-full">
          <AdminHeader text={text} />
        </div>
        <div className="ml-[262px] mt-[65px]">{children}</div>
      </div>
    </div>
  );
};

export default PageLayout;
