import Checkbox from "@/components/Checkbox";
import NoData from "@/components/NoData";
import { activeToggler } from "@/helpers/activeHandlers";
import { ROUTES } from "@/utils/routes";
import { couponResponseType } from "@/utils/type";
import { capitalize } from "@mui/material";
import moment from "moment";
import { useRouter } from "next/navigation";
import React, { Dispatch, SetStateAction } from "react";

interface Props {
  coupons: couponResponseType[];
  setCoupons: Dispatch<SetStateAction<couponResponseType[]>>;
}

const tableHeader = ["Coupon Name", "Usage", "Status", "Coupon Type"];

const CouponsTable: React.FC<Props> = ({ coupons, setCoupons }) => {
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
                  checked={coupons.every((data) => data?.isActive)}
                  onChange={() => {
                    if (coupons.some((data) => data?.isActive)) {
                      setCoupons((prevState) => {
                        return prevState.map((data) => {
                          return { ...data, isActive: true };
                        });
                      });
                    }
                    setCoupons((prevState) => {
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
        {coupons.length < 1 ? (
          <NoData>No coupons available at the moment</NoData>
        ) : (
          coupons.map((data, i) => {
            return (
              <div
                key={i}
                className={`flex items-center gap-3 ${
                  i < coupons?.length - 1 && "border-b-1 border-b-[#E6E9F4]"
                }`}
              >
                <span className="flex-2 font-sans font-medium text-sm text-black py-2.5 flex items-center gap-3">
                  <Checkbox
                    onChange={() => {
                      activeToggler(i, coupons, setCoupons);
                    }}
                    checked={data?.isActive as boolean}
                  />
                  <div className="flex items-center gap-4">
                    <span className="font-sans flex flex-col cursor-pointer">
                      <span
                        className="font-medium text-sm text-black hover:underline"
                        onClick={() => {
                          router.push(`${ROUTES.COUPONS}/${data?._id}`);
                        }}
                      >
                        {data?.name}
                      </span>
                      <span className="font-medium text-sm text-gray-600">
                        {data?.code}
                      </span>
                    </span>
                  </div>
                </span>

                <span className="flex-1 font-sans font-medium text-sm text-black py-2.5">
                  Used {data?.usedCount} times
                </span>
                <span className="flex-1 font-sans font-regular text-sm text-black py-2.5 truncate">
                  {moment(data?.validUntil).format("Do MMM, YYYY")}
                </span>
                <span className="flex-1 font-sans font-regular text-sm text-black py-2.5 truncate">
                  {capitalize(data?.discountType)}
                </span>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default CouponsTable;
