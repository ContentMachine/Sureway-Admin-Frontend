import Title from "@/components/Title";
import React from "react";
import DashboardStatsSection from "./DashboardStatsSection";
import DashboardGeneralChart from "./DashboardGeneralChart";
import DashboardLastSenevDays from "./DashboardLastSenevDays";
import DashboardRecentTransactions from "./DashboardRecentTransactions";
import DashboardTopProducts from "./DashboardTopProducts";

const Dashboard = () => {
  return (
    <section className="flex flex-col gap-6">
      <Title>Dashboard</Title>
      <DashboardStatsSection />
      <section className="flex items-stretch gap-6">
        <DashboardGeneralChart />
        <DashboardLastSenevDays />
      </section>

      <section className="flex items-stretch gap-6">
        <DashboardRecentTransactions />
        <DashboardTopProducts />
      </section>
    </section>
  );
};

export default Dashboard;
