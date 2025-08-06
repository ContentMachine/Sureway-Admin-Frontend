import Logo from "@/components/components/Logo/Logo";
import User from "@/components/User";
import { Bell } from "lucide-react";
import React from "react";

const DashboardHeader = () => {
  return (
    <header className="flex items-center bg-blue-300 px-8 h-17 gap-4">
      <Logo />
      <div className="ml-auto w-10 h-10 flex items-center justify-center rounded-full hover:opacity-50 cursor-pointer">
        <Bell size={18} color="#fff" />
      </div>
      <User lastName="Ezimorah" firstName="Tobenna" />
    </header>
  );
};

export default DashboardHeader;
