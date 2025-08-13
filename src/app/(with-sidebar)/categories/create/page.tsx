import CreateCategory from "@/containers/CreateCategory";
import { Suspense } from "react";

const page = () => {
  return (
    <Suspense>
      <CreateCategory />
    </Suspense>
  );
};

export default page;
