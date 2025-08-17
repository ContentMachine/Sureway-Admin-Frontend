import { formatCurrency } from "@/helpers/formatAmount";
import { topProductsType } from "@/utils/type";
import Image from "next/image";
import React from "react";

interface Props {
  topProducts: topProductsType[];
}

const tableHeaders = ["Name", "Price", "Units Sold"];

const DashboardTopProducts: React.FC<Props> = ({ topProducts }) => {
  return (
    <div className="rounded-lg bg-white p-6 flex-1  flex flex-col box-shadow2 font-sans">
      <h2 className="font-sans font-bold text-xl mb-5">
        Top Products by Units Sold
      </h2>

      <div className="flex items-center border-b-1 border-b-[#E6E9F4]">
        {tableHeaders.map((data, i) => {
          return (
            <span
              key={data}
              className={`${
                i === 0 ? "flex-3" : "flex-1"
              } font-sans font-regular text-sm text-gray-600 py-2.5`}
            >
              {data}
            </span>
          );
        })}
      </div>

      <div>
        {topProducts.map((data, i) => {
          return (
            <div
              key={i}
              className={`flex items-center ${
                i < topProducts?.length - 1 && "border-b-1 border-b-[#E6E9F4]"
              }`}
            >
              <span className="flex-3 flex items-center py-2.5 gap-3">
                <span className="font-sans font-medium text-sm text-black ">
                  {data?.name}
                </span>
              </span>
              <span className="flex-1 font-sans font-regular text-sm text-black py-2.5">
                ₦{formatCurrency(data?.price)}
              </span>
              <span className="flex-1 font-sans font-regular text-sm text-black py-2.5">
                {data?.orderCount}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DashboardTopProducts;
