import React from "react";
import Link from "next/link";
import classes from "./Logo.module.css";
import { ROUTES } from "@/utils/routes";
import Image from "next/image";

type LogoTypes = {
  className?: string;
};

const Logo = ({ className }: LogoTypes) => {
  return (
    <Link href={ROUTES.BASE} className={`${classes.logo} ${className}`}>
      <Image
        src="/logo.svg"
        alt="Insure All The Way Logo"
        width={166}
        height={48}
      />
    </Link>
  );
};

export default Logo;
