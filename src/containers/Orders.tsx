"use client";

import Button from "@/components/Button";
import LoaderComponent from "@/components/Loader";
import OrderTable from "@/components/OrderTable";
import Paginator from "@/components/Paginator";
import SearchAndFilter from "@/components/SearchAndFIlter";
import Title from "@/components/Title";
import { useOrders } from "@/hooks/useOrders";
import useUpdateSearchParams from "@/hooks/useUpdateSearchParams";
import { orderResponseType, OrderType } from "@/utils/type";
import { FolderOutput } from "lucide-react";
import React, { useEffect } from "react";
import { useState } from "react";

const Orders = () => {
  // States
  const [orderState, setOrderState] = useState<orderResponseType[]>([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  // Hooks

  const { updateSearchParams } = useUpdateSearchParams();
  const searchQuery = updateSearchParams("search", undefined, "get");

  // Requests
  const { isLoading, data } = useOrders({
    page,
    search: searchQuery as string,
    pageLimit: 20,
  });

  // Effects
  useEffect(() => {
    if (data) {
      setOrderState(
        data?.data?.orders?.map((data: orderResponseType) => {
          return { ...data, isActive: false };
        })
      );
    }
  }, [data]);

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
        <SearchAndFilter
          products={orderState as any}
          search={search}
          setSearch={setSearch}
        />

        {isLoading ? (
          <LoaderComponent />
        ) : (
          <OrderTable orders={orderState} setOrders={setOrderState} />
        )}

        <div className="mt-auto flex items-center justify-between">
          <Paginator
            data={orderState}
            maxLimit={10}
            pages={data?.data?.totalPages}
            isBackend
            setActiveNumberState={setPage}
          />
          <p className="font-sans font-medium text-base text-gray-600">
            {orderState?.length || 0} results
          </p>
        </div>
      </div>
    </section>
  );
};

export default Orders;
