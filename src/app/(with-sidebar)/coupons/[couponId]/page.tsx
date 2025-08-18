import SinglyCoupon from "@/containers/SinglyCoupon";
import React, { Suspense } from "react";

const page = () => {
  return (
    <Suspense>
      <SinglyCoupon />
    </Suspense>
  );
};

export default page;
