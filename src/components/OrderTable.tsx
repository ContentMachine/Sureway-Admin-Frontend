"use client";

import Checkbox from "@/components/Checkbox";
import { activeToggler } from "@/helpers/activeHandlers";
import { formatCurrency } from "@/helpers/formatAmount";
import { ROUTES } from "@/utils/routes";
import { orderResponseType, OrderType } from "@/utils/type";
import { capitalize } from "@mui/material";
import moment from "moment";
import Link from "next/link";
import { Dispatch, SetStateAction } from "react";

type Props = {
  orders: orderResponseType[];
  setOrders: Dispatch<SetStateAction<orderResponseType[]>>;
};

const tableHeader = [
  "Order ID",
  "Date",
  "Customer Name",
  "Payment Status",
  "Order Status",
  "Amount Paid",
];

const OrderTable: React.FC<Props> = ({ orders, setOrders }) => {
  return (
    <div className="overflow-hidden">
      <div className="flex items-center shrink-0 grow-0  gap-3 border-b-1 border-b-[#E6E9F4]">
        {tableHeader.map((data, i) => {
          if (i === 0) {
            return (
              <span
                key={data}
                className={`${
                  i === 0 ? "flex-1" : "flex-1"
                } font-sans font-regular text-sm text-gray-600 py-2.5 flex items-center gap-3`}
              >
                <Checkbox
                  checked={orders.every((data) => data?.isActive)}
                  onChange={() => {
                    if (orders.some((data) => data?.isActive)) {
                      setOrders((prevState) => {
                        return prevState.map((data) => {
                          return { ...data, isActive: true };
                        });
                      });
                    }
                    setOrders((prevState) => {
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
                i === 0 ? "flex-1" : "flex-1"
              } font-sans font-regular text-sm text-gray-600 py-2.5`}
            >
              <span>{data}</span>
            </span>
          );
        })}
      </div>

      <div>
        {orders.map((data, i) => {
          const paymentIsPaid = data?.paymentStatus === "Successful";
          const paymentIsFailed = data?.paymentStatus === "Failed";
          const paymentIsPending = data?.paymentStatus === "Pending";

          const statusIsReady = data?.status === "ready";
          const statusIsDelivered = data?.status === "delivered";
          const statusIsProcessing = data?.status === "processing";
          const statusIsFailed = data?.status === "failed";

          console.log(data?.status, statusIsDelivered, "dd");

          return (
            <div
              key={i}
              className={`flex items-center gap-3 flex-shrink-0 flex-grow-0  ${
                i < orders?.length - 1 && "border-b-1 border-b-[#E6E9F4]"
              }`}
            >
              <span className="flex-1 font-sans font-medium text-sm text-black py-4 flex items-center gap-3">
                <Checkbox
                  onChange={() => {
                    activeToggler(i, orders, setOrders);
                  }}
                  checked={data?.isActive as boolean}
                />
                <span className="flex items-center gap-4 ">
                  <Link
                    className="font-medium text-sm text-black visited:text-blue-200 hover:underline "
                    href={`${ROUTES.ORDERS}/${data?._id}`}
                  >
                    {data?._id?.slice(0, 15)}...
                  </Link>
                </span>
              </span>

              <span className="flex-1 font-sans font-medium text-sm text-black py-2.5">
                {moment(data?.createdAt).format("Do MMM, YYYY")}
              </span>
              <span className="flex-1 font-sans font-regular text-sm text-black py-2.5">
                {capitalize(data?.fullName)}
              </span>
              <span className="flex-1 font-sans font-regular text-sm  py-2.5">
                <span
                  className={`py-0.5 px-2 rounded-md ${
                    paymentIsPaid
                      ? "bg-[#C4F8E2] text-[#06A561]"
                      : paymentIsPending
                      ? "bg-[#E6E9F4] text-[#5A607F]"
                      : paymentIsFailed
                      ? "bg-red-200 text-red-500"
                      : "text-black bg-none"
                  }`}
                >
                  {capitalize(data?.paymentStatus)}
                </span>
              </span>
              <span className="flex-1 font-sans font-regular text-sm text-black py-2.5">
                <span
                  className={`py-0.5 px-2 rounded-md ${
                    statusIsDelivered
                      ? "bg-[#C4F8E2] text-[#06A561]"
                      : statusIsProcessing
                      ? "bg-[#E6E9F4] text-[#5A607F]"
                      : statusIsFailed
                      ? "bg-red-200 text-red-500"
                      : statusIsReady
                      ? "text-blue-200 bg-[#ECF2FF]"
                      : "text-black bg-none"
                  }`}
                >
                  {capitalize(data?.status)}
                </span>
              </span>
              <span className="flex-1 font-sans font-regular text-sm text-black py-2.5">
                ₦{formatCurrency(data?.price)}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OrderTable;
