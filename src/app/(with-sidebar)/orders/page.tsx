import Orders from "@/containers/Orders";
import React, { Suspense } from "react";

const page = () => {
  return (
    <Suspense>
      <Orders />
    </Suspense>
  );
};

export default page;
