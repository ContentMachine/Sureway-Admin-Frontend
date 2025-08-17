import LoaderComponent from "@/components/Loader";
import CreateOrEditProductPage from "@/containers/CreateOrEditProductPage";
import React, { Suspense } from "react";

const page = () => {
  return (
    <Suspense fallback={<LoaderComponent />}>
      <CreateOrEditProductPage />
    </Suspense>
  );
};

export default page;
