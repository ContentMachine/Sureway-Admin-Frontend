import LoaderComponent from "@/components/Loader";
import SinglyCoupon from "@/containers/SinglyCoupon";
import React, { Suspense } from "react";

const page = () => {
  return (
    <Suspense fallback={<LoaderComponent />}>
      <SinglyCoupon />
    </Suspense>
  );
};

export default page;
