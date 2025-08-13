"use client";

import Title from "@/components/Title";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import CreateOrEditProductForm from "./CreateOrEditProductForm";
import { useState } from "react";
import { productType } from "@/utils/type";

const CreateOrEditProductPage = () => {
  // ROuter
  const router = useRouter();

  // States
  const [createProductData, setCreateProductData] = useState<productType>({
    name: "",
    description: "",
    price: 0,
    discount: 0,
    hasTax: false,
    category: null,
    subCategory: null,
    coupons: [],
  });
  const [images, setImages] = useState<File[]>([]);

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

      <CreateOrEditProductForm
        data={createProductData}
        setData={setCreateProductData}
        images={images}
        setImages={setImages}
      />
    </section>
  );
};

export default CreateOrEditProductPage;
