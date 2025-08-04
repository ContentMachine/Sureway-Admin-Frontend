import Dashboard from "@/containers/Dashboard";
import React, { Suspense } from "react";

const page = () => {
  return (
    <Suspense>
      <Dashboard />
    </Suspense>
  );
};

export default page;
