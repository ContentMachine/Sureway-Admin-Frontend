import Input from "@/components/Input";
import React from "react";

const SinglyOrderCoupon = () => {
  return (
    <section className="flex-1 bg-white p-7 rounded-md font-sans">
      <h2 className="mb-6 text-black-600 text-xl font-bold ">Coupon</h2>
      <div className="flex flex-col gap-6">
        <Input label="Coupon Code" />
        <Input label="Discount" />
      </div>
    </section>
  );
};

export default SinglyOrderCoupon;
