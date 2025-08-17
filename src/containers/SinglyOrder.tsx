"use client";

import Button from "@/components/Button";
import LoaderComponent from "@/components/Loader";
import Title from "@/components/Title";

import { useOrdersById } from "@/hooks/useOrders";
import useRequest from "@/hooks/useRequest";
import { orderResponseType, requestType } from "@/utils/type";
import { ChevronLeft, PackageCheck } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React, { useMemo, useState } from "react";
import { mutate } from "swr";
import SinglyOrderCoupon from "./SinglyOrderCoupon";
import SinglyOrderInformation from "./SinglyOrderInformation";

const SinglyOrder = () => {
  // ROuter
  const router = useRouter();
  const { orderId } = useParams();

  // States
  const [requestState, setRequestState] = useState<requestType>({
    data: null,
    error: null,
    isLoading: false,
  });

  // Custom Hooks
  const { requestHandler } = useRequest();

  // Requests
  const { isLoading, data } = useOrdersById(orderId as string);

  const updateOrder = (isFailed?: boolean) => {
    const status =
      orderStatus === "processing"
        ? "ready"
        : orderStatus === "ready"
        ? "delivered"
        : "processing";

    requestHandler({
      url: `/order/${orderId as string}/status`,
      method: "PATCH",
      data: { status: isFailed ? "failed" : status },
      state: requestState,
      setState: setRequestState,
      successFunction(res) {
        mutate(`/order/${orderId}`);
      },
      successMessage: "Order successfully updated",
    });
  };

  // Memos
  const order: orderResponseType = useMemo(() => data?.data, [data]);
  const orderStatus = useMemo(() => order?.status, [data]);

  // Utils
  const buttonText =
    orderStatus === "processing"
      ? "Mark as ready"
      : orderStatus === "ready"
      ? "Mark as delivered"
      : "Done";

  if (isLoading) {
    return <LoaderComponent />;
  }

  return (
    <section className="flex flex-col gap-7.5">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <ChevronLeft
            className="cursor-pointer"
            color="#909090"
            onClick={() => router.back()}
          />
          <Title>Order #{order?._id}</Title>
        </div>
      </div>
      <div className="flex items-start gap-7.5 flex-wrap">
        <SinglyOrderInformation order={order} />
        <SinglyOrderCoupon />

        <div className="basis-[100%] flex items-center gap-3 border-t-1 pt-6 border-0.5 border-t-[#ebebeb]">
          <Button
            type="tertiary"
            className="ml-auto"
            onClick={() => router.back()}
          >
            <ChevronLeft />
            Back
          </Button>

          {/* This changes based on the current state of the order */}
          <Button
            loading={requestState?.isLoading}
            onClick={() => {
              updateOrder(false);
            }}
          >
            <PackageCheck />
            <span>{buttonText}</span>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default SinglyOrder;
