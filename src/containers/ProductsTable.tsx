"use client";

import Checkbox from "@/components/Checkbox";
import { activeToggler, activeTogglerRestAll } from "@/helpers/activeHandlers";
import { ProductType } from "@/utils/type";
import Image from "next/image";
import { Dispatch, SetStateAction } from "react";

type Props = {
  products: ProductType[];
  setProducts: Dispatch<SetStateAction<ProductType[]>>;
};

const tableHeader = ["Product", "Inventory", "Color", "Price", "Rating"];

const ProductsTable: React.FC<Props> = ({ products, setProducts }) => {
  return (
    <div className="overflow-hidden">
      <div className="flex items-center border-b-1 border-b-[#E6E9F4]">
        {tableHeader.map((data, i) => {
          if (i === 0) {
            return (
              <span
                key={data}
                className={`${
                  i === 0 ? "flex-2" : "flex-1"
                } font-sans font-regular text-sm text-gray-600 py-2.5 flex items-center gap-3`}
              >
                <Checkbox
                  checked={products.every((data) => data?.isActive)}
                  onChange={() => {
                    if (products.some((data) => data?.isActive)) {
                      setProducts((prevState) => {
                        return prevState.map((data) => {
                          return { ...data, isActive: true };
                        });
                      });
                    }
                    setProducts((prevState) => {
                      return prevState.map((data) => {
                        return { ...data, isActive: !data?.isActive };
                      });
                    });
                  }}
                />
                <span>{data}</span>
              </span>
            );
          }
          return (
            <span
              key={data}
              className={`${
                i === 0 ? "flex-2" : "flex-1"
              } font-sans font-regular text-sm text-gray-600 py-2.5`}
            >
              <span>{data}</span>
            </span>
          );
        })}
      </div>

      <div>
        {products.map((data, i) => {
          return (
            <div
              key={i}
              className={`flex items-center ${
                i < products?.length - 1 && "border-b-1 border-b-[#E6E9F4]"
              }`}
            >
              <span className="flex-2 font-sans font-medium text-sm text-black py-2.5 flex items-center gap-3">
                <Checkbox
                  onChange={() => {
                    activeToggler(i, products, setProducts);
                  }}
                  checked={data?.isActive as boolean}
                />
                <div className="flex items-center gap-4">
                  <Image
                    src={data?.image}
                    alt={data?.name}
                    width={48}
                    height={48}
                    className="rounded-sm"
                  />
                  <span className="font-sans flex flex-col">
                    <span className="font-medium text-sm text-black">
                      {data?.name}
                    </span>
                    <span className="font-medium text-sm text-gray-600">
                      {data?.category}
                    </span>
                  </span>
                </div>
              </span>

              <span className="flex-1 font-sans font-medium text-sm text-black py-2.5">
                {data?.invetory} in stock
              </span>
              <span className="flex-1 font-sans font-regular text-sm text-black py-2.5">
                {data?.color}
              </span>
              <span className="flex-1 font-sans font-regular text-sm text-black py-2.5">
                {data?.price}
              </span>
              <span
                className={`flex-1 font-sans font-regular text-sm text-black py-2.5 inline-flex `}
              >
                <span className={` py-0.5 px-1`}>
                  {data?.rating} ({data?.votes} votes)
                </span>
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProductsTable;
