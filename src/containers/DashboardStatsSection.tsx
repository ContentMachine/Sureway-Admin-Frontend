import StatCard from "@/components/StatCard";
import {
  ChartBarBig,
  ChartGantt,
  DollarSign,
  ShoppingCart,
} from "lucide-react";
import React from "react";

const DashboardStatsSection = () => {
  return (
    <div className="flex items-center gap-4">
      <StatCard
        amount="$10.54"
        label="Total Revenue"
        icon={<DollarSign size={20} />}
        percentage={22.45}
      />

      <StatCard
        amount="100"
        label="Orders"
        icon={<ShoppingCart size={20} />}
        percentage={-15.45}
      />

      <StatCard
        amount="10"
        label="New users"
        icon={<ChartBarBig size={20} />}
        percentage={22.45}
      />

      <StatCard
        amount="50"
        label="Unique Visits"
        icon={<ChartGantt size={20} />}
        percentage={-21}
      />
    </div>
  );
};

export default DashboardStatsSection;
