import { ROUTES } from "@/utils/routes";
import { countryNameType, countryType } from "@/utils/type";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface Props {
  data: countryType;
}

const Country: React.FC<Props> = ({ data }) => {
  return (
    <Link
      href={`${ROUTES.COUNTRIES}/${data?.slug}`}
      className="basis-[calc(16.6%-16px)] max-w-[250px] rounded-md group"
    >
      <Image
        src={data?.flags?.svg}
        width={300}
        height={120}
        alt="Nigerian Flag"
        className="w-full h-[120px] border-black object-cover rounded-md"
      />
      <p className="px-4 py-2 text-center font-sans font-semibold text-sm text-blue-100 two-sec-transition  group-hover:bg-white rounded-b-md">
        {(data?.name as string) ||
          (data?.name as countryNameType)?.common ||
          "No country name"}
      </p>
    </Link>
  );
};

export default Country;
