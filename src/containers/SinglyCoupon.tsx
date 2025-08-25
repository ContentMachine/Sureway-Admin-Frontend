"use client";

import Button from "@/components/Button";
import LoaderComponent from "@/components/Loader";
import Title from "@/components/Title";
import { useCouponById } from "@/hooks/useCoupons";
import useRequest from "@/hooks/useRequest";
import { couponType, requestType } from "@/utils/type";
import { ChevronLeft, PackageCheck } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import SinglyCouponInformation from "./SinglyCouponInformation";
import moment from "moment";
import { mutate } from "swr";

interface Props {
  isEdit?: boolean;
}

const SinglyCoupon: React.FC<Props> = ({ isEdit }) => {
  // Router
  const router = useRouter();
  const { couponId } = useParams();

  //   Hooks
  const { requestHandler } = useRequest();

  //   States
  const [coupon, setCoupon] = useState<couponType>({
    name: "",
    code: "",
    discountType: "percentage",
    discountValue: 0,
    maxUses: 0,
    validFrom: "",
    validUntil: "",
    active: false,
  });
  const [requestState, setRequestState] = useState<requestType>({
    isLoading: false,
    data: null,
    error: null,
  });

  //   Requests
  const createCoupon = () => {
    if (couponId) {
      requestHandler({
        url: `/coupon/${couponId}`,
        method: "PUT",
        data: coupon,
        state: requestState,
        setState: setRequestState,
        successMessage: "Coupon updated successfully",
        successFunction() {
          mutate(`/coupon/${couponId}`);
        },
      });
    } else {
      requestHandler({
        url: "/coupon",
        method: "POST",
        data: coupon,
        state: requestState,
        setState: setRequestState,
        successMessage: "Coupon created successfully",
        successFunction() {
          setCoupon({
            name: "",
            code: "",
            discountType: "percentage",
            discountValue: 0,
            maxUses: 0,
            validFrom: "",
            validUntil: "",
            active: true,
          });
        },
      });
    }
  };
  const { isLoading, data: couponData } = useCouponById(couponId as string);

  //   Effects
  useEffect(() => {
    if (couponData) {
      const {
        name,
        code,
        discountType,
        discountValue,
        maxUses,
        validFrom,
        validUntil,
        active,
      } = couponData?.data;

      setCoupon({
        name,
        code,
        discountType,
        discountValue,
        maxUses,
        validFrom: moment(validFrom).format("YYYY-MM-DD"),
        validUntil: moment(validUntil).format("YYYY-MM-DD"),
        active,
      });
    }
  }, [couponData]);

  return (
    <section className="flex flex-col gap-7.5">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <ChevronLeft
            className="cursor-pointer"
            color="#909090"
            onClick={() => router.back()}
          />
          <Title>
            {couponId ? `Edit ${coupon?.name || "coupon"}` : "Add Coupon"}{" "}
          </Title>
        </div>
      </div>

      {isLoading ? (
        <LoaderComponent />
      ) : (
        <div className="flex gap-6 flex-1 flex-wrap">
          <SinglyCouponInformation coupon={coupon} setCoupon={setCoupon} />

          <div className="flex items-center gap-3 border-t-1 pt-6 border-0.5 border-t-[#ebebeb] basis-full">
            <Button
              type="tertiary"
              className="ml-auto"
              onClick={() => router.back()}
            >
              <ChevronLeft />
              Back
            </Button>

            <Button
              onClick={(e) => {
                e.preventDefault();
                createCoupon();
              }}
              disabled={
                !coupon?.code ||
                !coupon?.discountType ||
                !coupon?.discountValue ||
                !coupon?.maxUses ||
                !coupon?.name ||
                !coupon?.validFrom ||
                !coupon?.validUntil
              }
              loading={requestState?.isLoading}
            >
              <PackageCheck />
              <span>Save</span>
            </Button>
          </div>
        </div>
      )}
    </section>
  );
};

export default SinglyCoupon;
