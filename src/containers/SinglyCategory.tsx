"use client";

import Button from "@/components/Button";
import Paginator from "@/components/Paginator";
import Title from "@/components/Title";
import { ChevronLeft, PackageCheck } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import SinglyCategoryName from "./SinglyCategoryName";
import SinglyCategoryProduct from "./SinglyCategoryProduct";

const SinglyCategory = () => {
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
          <Title>Category Name</Title>
        </div>
      </div>

      <div className="flex gap-6 flex-1 flex-wrap">
        <SinglyCategoryProduct />
        <SinglyCategoryName />

        <div className="flex items-center gap-3 border-t-1 pt-6 border-0.5 border-t-[#ebebeb] basis-full">
          <Button
            type="tertiary"
            className="ml-auto"
            onClick={() => router.back()}
          >
            <ChevronLeft />
            Back
          </Button>

          <Button>
            <PackageCheck />
            <span>Save</span>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default SinglyCategory;
