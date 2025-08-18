"use client";

import Input from "@/components/Input";
import { inputChangeHandler } from "@/helpers/inputChangeHandler";
import { couponType } from "@/utils/type";
import { Banknote, Percent } from "lucide-react";
import React, { Dispatch, SetStateAction } from "react";

interface Props {
  coupon: couponType;
  setCoupon: Dispatch<SetStateAction<couponType>>;
}

const SinglyCouponInformation: React.FC<Props> = ({ coupon, setCoupon }) => {
  const couponTypes = [
    {
      title: "Fixed Discount",
      id: "fixed",
      icon: <Banknote size={20} />,
    },
    {
      title: "Percentage Discount",
      id: "percentage",
      icon: <Percent size={20} />,
    },
  ];

  return (
    <section className="bg-white basis-full p-7 rounded-md font-sans ">
      <h2 className=" text-black-600 text-xl font-bold ">Coupon Information</h2>
      <p className="mb-6 text-gray-600 text-sm font-medium ">
        Code will be used by users in checkout
      </p>

      <div className="flex items-center gap-6 w-full pb-4">
        <Input
          label="Coupon Code"
          className="flex-1"
          placeholder="Shipfree20"
          name="code"
          value={coupon?.code}
          onChange={(e) => inputChangeHandler(e, setCoupon)}
        />
        <Input
          label="Coupon Name"
          className="flex-1"
          placeholder="Free Shipping"
          name="name"
          value={coupon?.name}
          onChange={(e) => inputChangeHandler(e, setCoupon)}
        />
      </div>

      <hr className="border-0.5 border-[#ebebeb]" />
      <h2 className="mb-0 text-black-600 text-xl font-bold pt-4 ">
        Coupon Type
      </h2>
      <p className="mb-6 text-gray-600 text-sm font-medium ">
        Type of coupon you want to create
      </p>

      <div className="flex items-stretch gap-4">
        {couponTypes?.map((data) => {
          return (
            <div
              key={data?.id}
              className={`flex flex-col items-center p-8 basis-[25%] rounded-sm border-1 gap-3 cursor-pointer ${
                data?.id === coupon?.discountType
                  ? "border-blue-200 text-blue-200"
                  : "border-gray-600 text-gray-600"
              }`}
              onClick={() => {
                setCoupon((prevState) => ({
                  ...prevState,
                  discountType: data?.id,
                }));
              }}
            >
              <span className="font-sans text-base font-medium">
                {data?.icon}
              </span>
              <p>{data?.title}</p>
            </div>
          );
        })}
      </div>

      <hr className="border-0.5 border-[#ebebeb] my-4" />
      <h2 className="text-black-600 text-xl font-bold mb-4">Coupon Value</h2>
      <div className="flex items-center gap-6">
        <Input
          label="Discount Value"
          type="number"
          className="w-[50%]"
          name="discountValue"
          value={String(coupon?.discountValue)}
          onChange={(e) => inputChangeHandler(e, setCoupon)}
        />
      </div>

      <hr className="border-0.5 border-[#ebebeb] my-4" />
      <h2 className="text-black-600 text-xl font-bold mb-4">Coupon Duration</h2>
      <div className="flex items-center gap-6">
        <Input
          label="Start Date"
          type="date"
          className="flex-1"
          name="validFrom"
          value={String(coupon?.validFrom)}
          onChange={(e) => inputChangeHandler(e, setCoupon)}
        />
        <Input
          label="End Date"
          type="date"
          className="flex-1"
          name="validUntil"
          value={String(coupon?.validUntil)}
          onChange={(e) => inputChangeHandler(e, setCoupon)}
        />
      </div>

      <hr className="border-0.5 border-[#ebebeb] my-4" />
      <h2 className="-black-600 text-xl font-bold mb-4">Coupon Limit</h2>

      <Input
        label="Usage Limit"
        type="number"
        className="w-[50%]"
        name="maxUses"
        value={String(coupon?.maxUses)}
        onChange={(e) => inputChangeHandler(e, setCoupon)}
      />
    </section>
  );
};

export default SinglyCouponInformation;
