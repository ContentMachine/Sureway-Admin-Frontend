import SinglyCategory from "@/containers/SinglyCategory";
import { Suspense } from "react";

const page = () => {
  return (
    <Suspense>
      <SinglyCategory />
    </Suspense>
  );
};

export default page;
