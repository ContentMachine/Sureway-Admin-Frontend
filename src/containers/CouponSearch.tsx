import Input from "@/components/Input";
import React from "react";

const CouponSearch = () => {
  return (
    <div className="flex items-center gap-3">
      <Input
        placeholder="Search"
        label="Search"
        name="search"
        type="search"
        className="w-[400px]"
      />
    </div>
  );
};

export default CouponSearch;
