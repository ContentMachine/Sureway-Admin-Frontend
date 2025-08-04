import { navRoutes } from "@/utils/routes";
import Link from "next/link";
import React from "react";

const Sidenav = () => {
  return (
    <nav className="border-2 w-[250px]">
      {navRoutes.map((data) => {
        return (
          <Link href={data?.route} key={data?.route}>
            <span>{data?.icon}</span>
            <span>{data?.title}</span>
          </Link>
        );
      })}
    </nav>
  );
};

export default Sidenav;
