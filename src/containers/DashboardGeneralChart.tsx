"use client";

interface Props {
  data: ordersOverTimeType[];
}

import { ordersOverTimeType } from "@/utils/type";
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

const DashboardGeneralChart: React.FC<Props> = ({ data }) => {
  const date = new Date();
  const month = date.getMonth();
  const orderThisMonth = data[month].totalOrders;

  return (
    <div className="rounded-lg bg-white p-6 w-full h-[600px] flex flex-col box-shadow2">
      <div className="mb-6">
        <h2 className="font-sans font-bold text-xl">Orders Over Time</h2>
      </div>

      <div className="flex gap-10 mb-6">
        <div>
          <h4 className="text-xl font-bold font-sans text-black">
            {orderThisMonth}
          </h4>
          <p className="text-sm text-gray-600 font-sans font-normal">
            Orders this month
          </p>
        </div>
      </div>

      <div className="w-full flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis dataKey="totalOrders" />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="totalOrders"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DashboardGeneralChart;
