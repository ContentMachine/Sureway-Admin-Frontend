"use client";

import Button from "@/components/Button";
import Title from "@/components/Title";
import { ChevronLeft, PackageCheck } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";
import SinglyCategoryName from "./SinglyCategoryName";
import SinglyCategoryProduct from "./SinglyCategoryProduct";
import { useCategoryById, useCategoryProducts } from "@/hooks/useCategories";
import LoaderComponent from "@/components/Loader";
import { categoryType, requestType } from "@/utils/type";
import { capitalize } from "@mui/material";
import useRequest from "@/hooks/useRequest";
import { mutate } from "swr";

const SinglyCategory = () => {
  // ROuter
  const router = useRouter();
  const { categoryId } = useParams();

  // States
  const [category, setCategory] = useState<null | categoryType>(null);
  const [image, setImage] = useState<File[]>([]);
  const [updateCategoryRequestState, setUpdatectegoryRequestState] =
    useState<requestType>({ isLoading: false, error: null, data: null });
  const [changeImage, setChangeImage] = useState(false);

  // Hooks
  const { requestHandler } = useRequest();

  // Requests
  const { isLoading, data } = useCategoryById(categoryId as string);
  const { isLoading: categoryProductsIsLoading, data: categoryProductsData } =
    useCategoryProducts(categoryId as string);
  const [categoryUpdateFormData, setCategoryUpdateFormData] = useState(
    new FormData()
  );

  const handleUpdateCategory = () => {
    requestHandler({
      url: `/category/${categoryId}`,
      isMultipart: true,
      method: "PUT",
      data: categoryUpdateFormData,
      state: updateCategoryRequestState,
      setState: setUpdatectegoryRequestState,
      successMessage: "Category updated successfully",
      successFunction() {
        mutate(`/category/${categoryId}`);
        setChangeImage(false);
      },
    });
  };

  // Effects
  useEffect(() => {
    if (data) {
      setCategory(data?.data);
    }
  }, [data]);

  useEffect(() => {
    const formDataState = new FormData();

    formDataState.append("name", category?.name as string);
    if (image.length > 0) {
      formDataState.append("image", image[0]);
    }

    setCategoryUpdateFormData(formDataState);
  }, [category, image]);

  if (isLoading || categoryProductsIsLoading) {
    return <LoaderComponent />;
  }

  return (
    <section className="flex flex-col gap-7.5">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <ChevronLeft
            className="cursor-pointer"
            color="#909090"
            onClick={() => router.back()}
          />
          <Title>{capitalize(category?.name as string)}</Title>
        </div>
      </div>

      <div className="flex gap-6 flex-1 flex-wrap">
        <SinglyCategoryProduct />
        <SinglyCategoryName
          category={category}
          setCategory={setCategory}
          image={image}
          setImage={setImage}
          changeImage={changeImage}
          setChangeImage={setChangeImage}
        />

        <div className="flex items-center gap-3 border-t-1 pt-6 border-0.5 border-t-[#ebebeb] basis-full">
          <Button
            type="tertiary"
            className="ml-auto"
            onClick={() => router.back()}
          >
            <ChevronLeft />
            Back
          </Button>

          <Button
            onClick={(e) => {
              handleUpdateCategory();
            }}
            loading={updateCategoryRequestState?.isLoading}
          >
            <PackageCheck />
            <span>Save</span>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default SinglyCategory;
