import Link from "next/link";
import Image from "next/image";
import { ROUTES } from "@/utils/routes";

type LogoTypes = {
  dimensions?: { width: number; height: number };
};

const Logo = ({ dimensions }: LogoTypes) => {
  return (
    <Link href={ROUTES.BASE}>
      <Image src="/logo.svg" alt="SureWay Logo" width={86} height={38} />
    </Link>
  );
};

export default Logo;
