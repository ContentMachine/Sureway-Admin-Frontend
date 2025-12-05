"use client";

import Logo from "@/components/Logo";
import User from "@/components/User";
import { AuthContext } from "@/context/AuthContext";
import { Bell } from "lucide-react";
import React, { useContext } from "react";

const DashboardHeader = () => {
  //
  const { user, requestState } = useContext(AuthContext);

  return (
    <header className="flex items-center bg-blue-300 px-8 h-17 gap-4">
      <Logo />
      {/* <div className="ml-auto w-10 h-10 flex items-center justify-center rounded-full hover:opacity-50 cursor-pointer">
        <Bell size={18} color="#fff" />
      </div> */}
      <User
        lastName={user?.name?.split(" ")?.[0] || ""}
        firstName={user?.name?.split(" ")?.[1] || ""}
        isLoading={requestState?.isLoading}
      />
    </header>
  );
};

export default DashboardHeader;
