import LoaderComponent from "@/components/Loader";
import Countries from "@/containers/Countries";
import React, { Suspense } from "react";

const page = () => {
  return (
    <Suspense fallback={<LoaderComponent />}>
      <Countries />
    </Suspense>
  );
};

export default page;
