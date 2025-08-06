import Products from "@/containers/Products";
import React, { Suspense } from "react";

const page = () => {
  return (
    <Suspense>
      <Products />
    </Suspense>
  );
};

export default page;
