import Categories from "@/containers/Categories";
import { Suspense } from "react";

const page = () => {
  return (
    <Suspense>
      <Categories />
    </Suspense>
  );
};

export default page;
