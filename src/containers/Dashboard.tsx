"use client";

import Title from "@/components/Title";
import React, { useMemo } from "react";
import DashboardStatsSection from "./DashboardStatsSection";
import DashboardGeneralChart from "./DashboardGeneralChart";
import DashboardLastSenevDays from "./DashboardLastSenevDays";
import DashboardRecentTransactions from "./DashboardRecentTransactions";
import DashboardTopProducts from "./DashboardTopProducts";
import {
  useOrdersOverTime,
  useStats,
  useTopProducts,
  useTransactions,
} from "@/hooks/stats";
import LoaderComponent from "@/components/Loader";

const Dashboard = () => {
  // Requests
  const { isLoading: statsIsLoading, data: statsData } = useStats();
  const { isLoading: ordersOverTimeIsLoading, data: ordersOverTimeData } =
    useOrdersOverTime();
  const { isLoading: transactionsIsLoading, data: transactionsData } =
    useTransactions();
  const { isLoading: topProductsIsLoading, data: topProductsData } =
    useTopProducts();

  // Memos
  const stats = useMemo(() => {
    return statsData?.data;
  }, [statsData]);

  const ordersOverTime = useMemo(() => {
    return ordersOverTimeData?.data;
  }, [ordersOverTimeData]);

  const transactions = useMemo(() => {
    return transactionsData?.data;
  }, [transactionsData]);

  const topProducts = useMemo(() => {
    return topProductsData?.data;
  }, [topProductsData]);

  console.log(topProductsData, "Data");

  return (
    <section className="flex flex-col gap-6">
      <Title>Dashboard</Title>

      {statsIsLoading ||
      ordersOverTimeIsLoading ||
      transactionsIsLoading ||
      topProductsIsLoading ? (
        <LoaderComponent />
      ) : (
        <>
          <DashboardStatsSection stats={stats} />
          <section className="flex items-stretch gap-6">
            <DashboardGeneralChart data={ordersOverTime} />
            {/* <DashboardLastSenevDays /> */}
          </section>

          <section className="flex items-stretch gap-6">
            <DashboardRecentTransactions transactions={transactions} />
            <DashboardTopProducts topProducts={topProducts} />
          </section>
        </>
      )}
    </section>
  );
};

export default Dashboard;
