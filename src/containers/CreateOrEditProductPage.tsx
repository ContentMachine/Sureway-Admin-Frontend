"use client";

import Title from "@/components/Title";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import CreateOrEditProductForm from "./CreateOrEditProductForm";

const CreateOrEditProductPage = () => {
  // ROuter
  const router = useRouter();

  return (
    <section className="flex flex-col gap-7.5">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <ChevronLeft
            className="cursor-pointer"
            color="#909090"
            onClick={() => router.back()}
          />
          <Title>Create Product</Title>
        </div>
      </div>

      <CreateOrEditProductForm />
    </section>
  );
};

export default CreateOrEditProductPage;
