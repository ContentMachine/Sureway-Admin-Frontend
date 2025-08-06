import CreateOrEditProductPage from "@/containers/CreateOrEditProductPage";
import React, { Suspense } from "react";

const page = () => {
  return (
    <Suspense>
      <CreateOrEditProductPage />
    </Suspense>
  );
};

export default page;
