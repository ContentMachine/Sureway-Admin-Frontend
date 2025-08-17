import { formatCurrency } from "@/helpers/formatAmount";
import { orderResponseType } from "@/utils/type";
import moment from "moment";
import React from "react";

const tableHeaders = ["Name", "Date", "Amount", "Status"];

interface Props {
  transactions: orderResponseType[];
}

const DashboardRecentTransactions: React.FC<Props> = ({ transactions }) => {
  return (
    <div className="rounded-lg bg-white p-6 flex-1  flex flex-col box-shadow2 font-sans">
      <h2 className="font-sans font-bold text-xl mb-5">Recent Transactions </h2>

      <div className="flex items-center border-b-1 border-b-[#E6E9F4]">
        {tableHeaders.map((data) => {
          return (
            <span
              key={data}
              className="flex-1 font-sans font-regular text-sm text-gray-600 py-2.5"
            >
              {data}
            </span>
          );
        })}
      </div>

      <div>
        {transactions?.map((data, i) => {
          const isPaid = data?.status?.toLowerCase() === "successful";

          return (
            <div
              key={data?._id}
              className={`flex items-center ${
                i < transactions?.length - 1 && "border-b-1 border-b-[#E6E9F4]"
              }`}
            >
              <span className="flex-1 font-sans font-medium text-sm text-black py-2.5">
                {data?.fullName}
              </span>
              <span className="flex-1 font-sans font-regular text-sm text-black py-2.5">
                {moment(data?.createdAt).format("DD/MM/YYYY")}
              </span>
              <span className="flex-1 font-sans font-regular text-sm text-black py-2.5">
                ₦{formatCurrency(data?.price)}
              </span>
              <span
                className={`flex-1 font-sans font-regular text-sm text-black py-2.5 inline-flex `}
              >
                <span
                  className={` py-0.5 px-1 ${
                    isPaid
                      ? "bg-[#C4F8E2] text-[#06A561]"
                      : "bg-[#E6E9F4] text-[#5A607F]"
                  }`}
                >
                  {data?.paymentStatus}
                </span>
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DashboardRecentTransactions;
