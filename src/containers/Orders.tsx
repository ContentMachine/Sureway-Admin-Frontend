"use client";

import Button from "@/components/Button";
import OrderTable from "@/components/OrderTable";
import Paginator from "@/components/Paginator";
import SearchAndFilter from "@/components/SearchAndFIlter";
import Title from "@/components/Title";
import { OrderType } from "@/utils/type";
import { FolderOutput } from "lucide-react";
import React from "react";
import { useState } from "react";

const tableData = [
  {
    id: "Men Grey Hoodie",
    date: "May 5, 4:20 PM",
    customerName: "Tom Anderson",
    paymentStatus: "Paid",
    orderSttus: "Ready",
    total: 49.0,
  },
  {
    id: "Men Grey Hoodie",
    date: "May 5, 4:20 PM",
    customerName: "Tom Anderson",
    paymentStatus: "Pending",
    orderSttus: "Ready",
    total: 49.0,
  },
  {
    id: "Men Grey Hoodie",
    date: "May 5, 4:20 PM",
    customerName: "Tom Anderson",
    paymentStatus: "Failed",
    orderSttus: "Ready",
    total: 49.0,
  },
  {
    id: "Men Grey Hoodie",
    date: "May 5, 4:20 PM",
    customerName: "Tom Anderson",
    paymentStatus: "Paid",
    orderSttus: "Delivered",
    total: 49.0,
  },
  {
    id: "Men Grey Hoodie",
    date: "May 5, 4:20 PM",
    customerName: "Tom Anderson",
    paymentStatus: "Paid",
    orderSttus: "Processing",
    total: 49.0,
  },
  {
    id: "Men Grey Hoodie",
    date: "May 5, 4:20 PM",
    customerName: "Tom Anderson",
    paymentStatus: "Paid",
    orderSttus: "Failed",
    total: 49.0,
  },
  {
    id: "Men Grey Hoodie",
    date: "May 5, 4:20 PM",
    customerName: "Tom Anderson",
    paymentStatus: "Paid",
    orderSttus: "Ready",
    total: 49.0,
  },
];

const Orders = () => {
  // States
  const [orderState, setOrderState] = useState<OrderType[]>(
    tableData?.map((data) => ({ ...data, isActive: false }))
  );

  return (
    <section className="flex flex-col gap-6 min-h-[calc(100vh-116px)]">
      <div className="flex items-center gap-3">
        <Title>Orders</Title>
        <Button className="ml-auto" type="tertiary">
          <FolderOutput size={16} />
          <span>Export </span>
        </Button>
      </div>

      <div className="bg-white p-6 rounded-lg flex flex-col gap-6 flex-1">
        <SearchAndFilter products={orderState as any} />
        <OrderTable orders={orderState} setOrders={setOrderState} />

        <div className="mt-auto flex items-center justify-between">
          <Paginator data={orderState} maxLimit={10} />
          <p className="font-sans font-medium text-base text-gray-600">
            146 Results
          </p>
        </div>
      </div>
    </section>
  );
};

export default Orders;
