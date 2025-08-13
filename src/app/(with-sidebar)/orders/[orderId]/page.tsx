import SinglyOrder from "@/containers/SinglyOrder";
import { Suspense } from "react";

const page = () => {
  return (
    <Suspense>
      <SinglyOrder />
    </Suspense>
  );
};

export default page;
