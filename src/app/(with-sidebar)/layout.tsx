import DashboardHeader from "@/containers/DashboardHeader";
import Sidenav from "@/containers/Sidenav";
import React from "react";

interface Props {
  children: React.ReactNode;
}

const layout: React.FC<Props> = ({ children }) => {
  return (
    <main className="max-h-[100vh] overflow-hidden relative">
      <DashboardHeader />
      <div className="flex flex-1 h-[calc(100vh-68px)]">
        <Sidenav />
        <div className="flex-1 py-6 px-10 bg-[#FFF6F4] overflow-y-auto">
          {children}
        </div>
      </div>
    </main>
  );
};

export default layout;
