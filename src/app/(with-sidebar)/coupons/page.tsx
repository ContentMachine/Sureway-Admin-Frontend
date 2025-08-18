import LoaderComponent from "@/components/Loader";
import Coupons from "@/containers/Coupons";
import { Suspense } from "react";

const page = () => {
  return (
    <Suspense fallback={<LoaderComponent />}>
      <Coupons />
    </Suspense>
  );
};

export default page;
