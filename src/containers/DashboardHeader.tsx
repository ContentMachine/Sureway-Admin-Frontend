import Logo from "@/components/components/Logo/Logo";
import User from "@/components/User";
import React from "react";

const DashboardHeader = () => {
  return (
    <header className="flex items-center">
      <Logo />
      <User lastName="Ezimorah" firstName="Tobenna"  />
    </header>
  );
};

export default DashboardHeader;
