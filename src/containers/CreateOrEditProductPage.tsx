"use client";

import Title from "@/components/Title";
import { ChevronLeft } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import CreateOrEditProductForm from "./CreateOrEditProductForm";
import { useEffect, useState } from "react";
import { productType } from "@/utils/type";
import { useProductById } from "@/hooks/useProducts";
import LoaderComponent from "@/components/Loader";

const CreateOrEditProductPage = () => {
  // ROuter
  const router = useRouter();
  const { productId } = useParams();

  // States
  const [createProductData, setCreateProductData] = useState<productType>({
    name: "",
    description: "",
    price: 0,
    internationalPrice: 0,
    discount: 0,
    hasTax: false,
    category: null,
    subCategory: null,
    coupons: [],
    quantity: 0,
  });
  const [images, setImages] = useState<File[]>([]);

  // Requests
  const { isLoading, data } = useProductById(productId as string);

  // Effects
  useEffect(() => {
    if (data && productId) {
      setCreateProductData({
        name: data?.data?.name,
        description: data?.data?.description,
        price: data?.data?.price,
        discount: data?.data?.discount,
        hasTax: data?.data?.hasTax,
        category: data?.data?.category?._id,
        subCategory: data?.data?.subCategory,
        coupons: data?.data?.coupons?.map((c: any) => c._id),
        quantity: data?.data?.quantity,
        internationalPrice: data?.data?.internationalPrice,
      });
    }
  }, [data, productId]);

  return (
    <section className="flex flex-col gap-7.5">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <ChevronLeft
            className="cursor-pointer"
            color="#909090"
            onClick={() => router.back()}
          />
          <Title>
            {productId
              ? `Edit ${createProductData?.name || "Product"}`
              : " Create Product"}
          </Title>
        </div>
      </div>

      {isLoading ? (
        <LoaderComponent />
      ) : (
        <CreateOrEditProductForm
          data={createProductData}
          setData={setCreateProductData}
          images={images}
          setImages={setImages}
        />
      )}
    </section>
  );
};

export default CreateOrEditProductPage;
