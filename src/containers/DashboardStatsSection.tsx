import StatCard from "@/components/StatCard";
import { formatCurrency } from "@/helpers/formatAmount";
import { statsType } from "@/utils/type";
import {
  ChartBarBig,
  ChartGantt,
  DollarSign,
  ShoppingCart,
} from "lucide-react";
import React from "react";

interface Props {
  stats: statsType;
}

const DashboardStatsSection: React.FC<Props> = ({ stats }) => {
  return (
    <div className="flex items-center gap-4">
      <StatCard
        amount={`₦${formatCurrency(stats?.revenue)}`}
        label="Total Revenue"
        icon={<DollarSign size={20} />}
      />

      <StatCard
        amount={stats?.orders}
        label="Orders"
        icon={<ShoppingCart size={20} />}
      />

      <StatCard
        amount={stats?.users}
        label="New users"
        icon={<ChartBarBig size={20} />}
      />
    </div>
  );
};

export default DashboardStatsSection;
