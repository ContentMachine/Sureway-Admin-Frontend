import Input from "@/components/Input";
import { inputChangeHandler } from "@/helpers/inputChangeHandler";
import useUpdateSearchParams from "@/hooks/useUpdateSearchParams";
import React, { useEffect, useState } from "react";

const CouponSearch = () => {
  // States
  const [search, setSearch] = useState("");

  // Hooks
  const { updateSearchParams } = useUpdateSearchParams();

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (search) {
        updateSearchParams("search", search, "set");
      } else {
        updateSearchParams("search", undefined, "delete");
      }
    }, 1000);

    return () => {
      clearTimeout(timeout);
    };
  }, [search]);

  return (
    <div className="flex items-center gap-3">
      <Input
        placeholder="Search by coupon name or code"
        label="Search"
        name="search"
        type="search"
        className="w-[400px]"
        onChange={(e) => inputChangeHandler(e, setSearch, true)}
      />
    </div>
  );
};

export default CouponSearch;
