"use client";

import Button from "@/components/Button";
import LoaderComponent from "@/components/Loader";
import Title from "@/components/Title";
import { useCoupons } from "@/hooks/useCoupons";
import { ROUTES } from "@/utils/routes";
import { couponResponseType } from "@/utils/type";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import CouponSearch from "./CouponSearch";
import CouponsTable from "./CouponsTable";

const Coupons = () => {
  // Router
  const router = useRouter();

  //   States
  const [coupons, setCoupons] = useState<couponResponseType[]>([]);

  // Requests
  const { isLoading, data } = useCoupons();

  //   Effects
  useEffect(() => {
    if (data?.data) {
      setCoupons(
        data?.data?.map((c: couponResponseType) => ({ ...c, isActive: false }))
      );
    }
  }, [data]);

  return (
    <section className="flex flex-col gap-6">
      <div className="flex items-center gap-3">
        <Title>Coupons</Title>

        <Button
          onClick={() => {
            router.push(ROUTES.CREATE_COUPONS);
          }}
          className="ml-auto"
        >
          <Plus size={16} />
          <span>Coupons</span>
        </Button>
      </div>

      <div className="bg-white p-6 rounded-lg flex flex-col gap-6">
        <CouponSearch />

        {isLoading ? (
          <LoaderComponent />
        ) : (
          <>
            <CouponsTable coupons={coupons} setCoupons={setCoupons} />
          </>
        )}
      </div>
    </section>
  );
};

export default Coupons;
