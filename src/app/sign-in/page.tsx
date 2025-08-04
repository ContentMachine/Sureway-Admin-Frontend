import SignIn from "@/containers/SignIn";
import React, { Suspense } from "react";

const page = () => {
  return (
    <Suspense>
      <SignIn />
    </Suspense>
  );
};

export default page;
