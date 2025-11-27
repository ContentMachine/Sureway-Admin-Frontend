"use client";

import Checkbox from "@/components/Checkbox";
import LoaderComponent from "@/components/Loader";
import NoData from "@/components/NoData";
import { activeToggler } from "@/helpers/activeHandlers";
import { formatCurrency } from "@/helpers/formatAmount";
import { ROUTES } from "@/utils/routes";
import { productResponseType } from "@/utils/type";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction } from "react";

type Props = {
  products: productResponseType[];
  setProducts: Dispatch<SetStateAction<productResponseType[]>>;
  isLoading?: boolean;
};

const tableHeader = ["Product", "Inventory", "Description", "Price", "Rating"];

const ProductsTable: React.FC<Props> = ({
  products,
  setProducts,
  isLoading,
}) => {
  // Router
  const router = useRouter();

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
        {isLoading ? (
          <LoaderComponent />
        ) : products.length < 1 ? (
          <NoData>No products available at the moment</NoData>
        ) : (
          products.map((data, i) => {
            return (
              <div
                key={i}
                className={`flex items-center gap-3 ${
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
                      src={data?.images?.[0]}
                      alt={data?.name}
                      width={48}
                      height={48}
                      className="rounded-sm w-12 h-12"
                    />
                    <span className="font-sans flex flex-col cursor-pointer">
                      <span
                        className="font-medium text-sm text-black hover:underline"
                        onClick={() => {
                          router.push(`${ROUTES.PRODUCTS}/${data?.slug}`);
                        }}
                      >
                        {data?.name}
                      </span>
                      <span className="font-medium text-sm text-gray-600">
                        {data?.category?.name}
                      </span>
                    </span>
                  </div>
                </span>

                <span className="flex-1 font-sans font-medium text-sm text-black py-2.5">
                  {data?.quantity} in stock
                </span>
                <span className="flex-1 font-sans font-regular text-sm text-black py-2.5 truncate">
                  {data?.description}
                </span>
                <span className="flex-1 font-sans font-regular text-sm text-black py-2.5">
                  ₦{formatCurrency(data?.price)}
                </span>
                <span
                  className={`flex-1 font-sans font-regular text-sm text-black py-2.5 inline-flex `}
                >
                  <span className={` py-0.5 px-1`}>{data?.rating}/100</span>
                </span>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default ProductsTable;
