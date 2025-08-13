"use client";

import Button from "@/components/Button";
import Title from "@/components/Title";
import { ChevronLeft, PackageCheck } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import SinglyOrderCoupon from "./SinglyOrderCoupon";
import SinglyOrderInformation from "./SinglyOrderInformation";

const SinglyOrder = () => {
  // ROuter
  const router = useRouter();

  return (
    <section className="flex flex-col gap-7.5">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <ChevronLeft
            className="cursor-pointer"
            color="#909090"
            onClick={() => router.back()}
          />
          <Title>Order #12345</Title>
        </div>
      </div>
      <div className="flex items-start gap-7.5 flex-wrap">
        <SinglyOrderInformation />
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
          <Button>
            <PackageCheck />
            <span>Mark as Delivered</span>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default SinglyOrder;
