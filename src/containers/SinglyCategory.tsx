"use client";

import Button from "@/components/Button";
import Title from "@/components/Title";
import { ChevronLeft, PackageCheck, Trash2 } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";
import SinglyCategoryName from "./SinglyCategoryName";
import SinglyCategoryProduct from "./SinglyCategoryProduct";
import { useCategoryById, useCategoryProducts } from "@/hooks/useCategories";
import LoaderComponent from "@/components/Loader";
import {
  categoryResponseType,
  categoryType,
  objectGenericType,
  requestType,
} from "@/utils/type";
import { capitalize } from "@mui/material";
import useRequest from "@/hooks/useRequest";
import { mutate } from "swr";
import { ROUTES } from "@/utils/routes";
import Modal from "@/components/Modal";
import DeleteModalBody from "@/components/DeleteModalBody";
import { setAllModalsFalse, setModalTrue } from "@/helpers/modalHandlers";

const SinglyCategory = () => {
  // ROuter
  const router = useRouter();
  const { categoryId } = useParams();

  // States
  const [category, setCategory] = useState<null | categoryResponseType>(null);
  const [image, setImage] = useState<File[]>([]);
  const [updateCategoryRequestState, setUpdatectegoryRequestState] =
    useState<requestType>({ isLoading: false, error: null, data: null });
  const [changeImage, setChangeImage] = useState(false);
  const [requestState, setRequestState] = useState<requestType>({
    isLoading: false,
    data: null,
    error: null,
  });
  const [modals, setModals] = useState<objectGenericType>({
    deleteSubcategory: false,
    deleteCategory: false,
  });

  // Hooks
  const { requestHandler } = useRequest();

  // Requests
  const { isLoading, data } = useCategoryById(categoryId as string);
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

  const handleDeleteCategory = () => {
    requestHandler({
      url: `/category/${categoryId}`,
      isMultipart: true,
      method: "DELETE",
      state: requestState,
      setState: setRequestState,
      successMessage: "Category deleted successfully",
      successFunction() {
        mutate(`/category`);
        mutate(`/category/category/${categoryId}`);
        setChangeImage(false);
        router.push(ROUTES.CATEGORIES);
      },
      id: "delete-category",
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
    formDataState.append("description", category?.description as string);

    if (image.length > 0) {
      image.forEach((data) => {
        return formDataState.append("images", data);
      });
    }

    setCategoryUpdateFormData(formDataState);
  }, [category, image]);

  if (isLoading) {
    return <LoaderComponent />;
  }

  return (
    <>
      {modals?.deleteCategory && (
        <Modal
          body={
            <DeleteModalBody
              title="Delete this category"
              caption="All products and subcategories tied to this category will be deleted and will not be retrieved after deletion."
              onDelete={handleDeleteCategory}
              loading={
                requestState?.isLoading &&
                requestState?.id === "delete-category"
              }
              onClose={() => setAllModalsFalse(setModals)}
            />
          }
          onClick={() => {
            setAllModalsFalse(setModals);
          }}
        />
      )}
      <section className="flex flex-col gap-7.5">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <ChevronLeft
              className="cursor-pointer"
              color="#909090"
              onClick={() => router.back()}
            />
            <Title>
              {capitalize((category?.name as string) || "Category")}
            </Title>
          </div>

          <Button
            type="null"
            onClick={() => setModalTrue(setModals, "deleteCategory")}
            loading={requestState?.isLoading}
            className="ml-auto text-red-500"
          >
            <Trash2 />
          </Button>
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
              onClick={() => router.back()}
              className="ml-auto"
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
    </>
  );
};

export default SinglyCategory;
