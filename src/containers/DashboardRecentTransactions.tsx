const tableHeaders = ["Name", "Date", "Amount", "Status"];
const tableBody = [
  {
    name: "Jagarnath S.",
    date: "24.05.2023",
    amount: "$124.97",
    status: "Paid",
  },
  {
    name: "Jagarnath S.",
    date: "24.05.2023",
    amount: "$124.97",
    status: "Paid",
  },
  {
    name: "Jagarnath S.",
    date: "24.05.2023",
    amount: "$124.97",
    status: "Paid",
  },
  {
    name: "Jagarnath S.",
    date: "24.05.2023",
    amount: "$124.97",
    status: "Paid",
  },
  {
    name: "Jagarnath S.",
    date: "24.05.2023",
    amount: "$124.97",
    status: "Pending",
  },
];

const DashboardRecentTransactions = () => {
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
        {tableBody.map((data, i) => {
          const isPaid = data?.status === "Paid";

          return (
            <div
              key={i}
              className={`flex items-center ${
                i < tableBody?.length - 1 && "border-b-1 border-b-[#E6E9F4]"
              }`}
            >
              <span className="flex-1 font-sans font-medium text-sm text-black py-2.5">
                {data?.name}
              </span>
              <span className="flex-1 font-sans font-regular text-sm text-black py-2.5">
                {data?.date}
              </span>
              <span className="flex-1 font-sans font-regular text-sm text-black py-2.5">
                {data?.amount}
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
                  {data?.status}
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
