import Image from "next/image";

const tableHeaders = ["Name", "Price", "Units Sold"];
const tableBody = [
  {
    name: "Jagarnath S.",
    date: "24.05.2023",
    units: "204",
    image: "/product.svg",
  },
  {
    name: "Jagarnath S.",
    date: "24.05.2023",
    units: "204",
    image: "/product.svg",
  },
  {
    name: "Jagarnath S.",
    date: "24.05.2023",
    units: "204",
    image: "/product.svg",
  },
  {
    name: "Jagarnath S.",
    date: "24.05.2023",
    units: "204",
    image: "/product.svg",
  },
];

const DashboardTopProducts = () => {
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
        {tableBody.map((data, i) => {
          return (
            <div
              key={i}
              className={`flex items-center ${
                i < tableBody?.length - 1 && "border-b-1 border-b-[#E6E9F4]"
              }`}
            >
              <span className="flex-3 flex items-center py-2.5 gap-3">
                <Image
                  src={data?.image}
                  alt={data?.name}
                  width={36}
                  height={36}
                  className="rounded-md"
                />
                <span className="font-sans font-medium text-sm text-black ">
                  {data?.name}
                </span>
              </span>
              <span className="flex-1 font-sans font-regular text-sm text-black py-2.5">
                {data?.date}
              </span>
              <span className="flex-1 font-sans font-regular text-sm text-black py-2.5">
                {data?.units}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DashboardTopProducts;
