"use client";

import Button from "@/components/Button";
import { navRoutes, ROUTES } from "@/utils/routes";
import { DoorOpen } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

const Sidenav = () => {
  // Router
  const pathname = usePathname();
  const router = useRouter();

  return (
    <nav className="w-[250px] bg-blue-100 text-white font-sans p-4 flex flex-col">
      <div className="flex flex-col">
        {navRoutes.map((data) => {
          return (
            <Link
              href={data?.route}
              key={data?.route}
              className={`flex items-center gap-4 text-[14px]  font-medium px-4 py-2.5 rounded-sm mb-2 hover:bg-white hover:text-blue-200 transition-all ease-in-out duration-200 ${
                !data?.isActive
                  ? "cursor-not-allowed pointer-events-none opacity-[0.3]"
                  : "cursor-pointer"
              }  ${
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

      <Button
        type="null"
        className="px-4 py-2.5 text-red-500 mt-auto "
        onClick={() => {
          router.replace(ROUTES.SIGN_IN);
        }}
      >
        <DoorOpen />
        <span>Logout</span>
      </Button>
    </nav>
  );
};

export default Sidenav;
