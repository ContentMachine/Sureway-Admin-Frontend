"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "4am", uv: 4000, pv: 2400, amt: 2400 },
  { name: "5am", uv: 3000, pv: 1398, amt: 2210 },
  { name: "6am", uv: 2000, pv: 9800, amt: 2290 },
  { name: "7am", uv: 2780, pv: 3908, amt: 2000 },
  { name: "8am", uv: 1890, pv: 4800, amt: 2181 },
  { name: "9am", uv: 2390, pv: 3800, amt: 2500 },
  { name: "10am", uv: 3490, pv: 4300, amt: 2100 },
  { name: "11am", uv: 4000, pv: 2400, amt: 2400 },
  { name: "12pm", uv: 3000, pv: 1398, amt: 2210 },
  { name: "1pm", uv: 2000, pv: 9800, amt: 2290 },
  { name: "2pm", uv: 2780, pv: 3908, amt: 2000 },
  { name: "3pm", uv: 1890, pv: 4800, amt: 2181 },
];

const DashboardGeneralChart = () => {
  return (
    <div className="rounded-lg bg-white p-6 w-full h-[600px] flex flex-col box-shadow2">
      <div className="mb-6">
        <h2 className="font-sans font-bold text-xl">Orders Over Time</h2>
      </div>

      <div className="flex gap-10 mb-6">
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

      <div className="w-full flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="pv"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
            />
            <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DashboardGeneralChart;
