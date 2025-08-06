"use client";

import { navRoutes } from "@/utils/routes";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const Sidenav = () => {
  // Router
  const pathname = usePathname();

  return (
    <nav className="w-[250px] bg-blue-100 text-white font-sans p-4">
      <div className="flex flex-col ">
        {navRoutes.map((data) => {
          return (
            <Link
              href={data?.route}
              key={data?.route}
              className={`flex items-center gap-4 text-[14px]  font-medium px-4 py-2.5 rounded-sm mb-2 hover:bg-white hover:text-blue-200 transition-all ease-in-out duration-200 ${
                pathname?.includes(data?.route)
                  ? "text-blue-200 bg-white"
                  : "text-white bg-transparent"
              }`}
            >
              <span>{data?.icon}</span>
              <span>{data?.title}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default Sidenav;
