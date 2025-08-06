"use client";
import { BarChart, Bar, ResponsiveContainer, YAxis, XAxis } from "recharts";

const data = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

const DashboardLastSenevDays = () => {
  return (
    <div className="rounded-lg bg-white p-6 w-full flex flex-col box-shadow2 basis-[355px]">
      <div className="mb-6 ">
        <h2 className="font-sans font-bold text-xl">Orders Over Time</h2>
      </div>

      <div className="flex flex-col gap-5 mb-6 border-b-1 border-b-[#e6e9f4] pb-5">
        <div>
          <h4 className="text-xl font-bold font-sans text-black">625</h4>
          <p className="text-sm text-gray-600 font-sans font-normal">
            Orders on May 22
          </p>
        </div>

        <div>
          <h4 className="text-xl font-bold font-sans text-black">472</h4>
          <p className="text-sm text-gray-600 font-sans font-normal">
            Orders on May 21
          </p>
        </div>
      </div>

      <div className="flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            width={150}
            height={40}
            data={data}
            barCategoryGap={1}
            barSize={8}
          >
            <Bar dataKey="uv" fill="#1FD286" radius={4} />
            <XAxis />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DashboardLastSenevDays;
