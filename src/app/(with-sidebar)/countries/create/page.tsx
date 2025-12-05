import LoaderComponent from "@/components/Loader";
import SinglyCountry from "@/containers/SinglyCountry";
import React, { Suspense } from "react";

const page = () => {
  return (
    <Suspense fallback={<LoaderComponent />}>
      <SinglyCountry />
    </Suspense>
  );
};

export default page;
