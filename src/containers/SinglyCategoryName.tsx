"use client";

import Button from "@/components/Button";
import Checkbox from "@/components/Checkbox";
import FileUploadInput from "@/components/FIleUploadInput";
import Input from "@/components/Input";
import Modal from "@/components/Modal";
import Toggle from "@/components/Toggle";
import { activeToggler } from "@/helpers/activeHandlers";
import { setAllModalsFalse, setModalTrue } from "@/helpers/modalHandlers";
import {
  categoryResponseType,
  categoryType,
  objectGenericType,
} from "@/utils/type";
import React, { Dispatch, SetStateAction, useState } from "react";
import CreateSubCategoryModalBody from "./CreateSubCategoryModalBody";
import { inputChangeHandler } from "@/helpers/inputChangeHandler";
import Image from "next/image";
import { UploadCloud } from "lucide-react";
import NoData from "@/components/NoData";

interface Props {
  category: categoryResponseType | null;
  setCategory: Dispatch<SetStateAction<categoryResponseType | null>>;
  image: File[];
  setImage: Dispatch<SetStateAction<File[]>>;
  changeImage: boolean;
  setChangeImage: Dispatch<SetStateAction<boolean>>;
}

const SinglyCategoryName: React.FC<Props> = ({
  category,
  setCategory,
  image,
  setImage,
  changeImage,
  setChangeImage,
}) => {
  const [modals, setModals] = useState<objectGenericType>({
    createSubCategory: false,
  });

  return (
    <>
      {modals.createSubCategory && (
        <Modal
          onClick={() => setAllModalsFalse(setModals)}
          body={
            <CreateSubCategoryModalBody
              onClose={() => setAllModalsFalse(setModals)}
            />
          }
        />
      )}

      <section className="flex-1 font-sans flex flex-col gap-7.5">
        <div className="bg-white p-7 rounded-md">
          <h2 className="mb-6 text-black-600 text-xl font-bold ">
            Sub-Categories
          </h2>
          <div>
            {(category as categoryType)?.subCategories?.length > 0 ? (
              category?.subCategories?.map((data, i) => {
                return (
                  <div className="flex items-center gap-3 mb-3">
                    <Checkbox checked={true} onChange={() => {}} />
                    <span className="font-sans text-black text-main font-medium">
                      {data?.name as string}
                    </span>
                  </div>
                );
              })
            ) : (
              <NoData>
                There are no sun-categories under this product category
              </NoData>
            )}

            <Button
              type="null"
              className="px-0"
              onClick={() => setModalTrue(setModals, "createSubCategory")}
            >
              Create new sub-category
            </Button>
          </div>
        </div>

        <div className="bg-white p-7 rounded-md">
          <h2 className="mb-6 text-black text-xl font-bold">Category Info</h2>

          <div className="flex flex-col gap-4">
            <Input
              label="Category Name"
              name="name"
              value={category?.name}
              onChange={(e) => inputChangeHandler(e, setCategory)}
            />

            <Input
              label="Category Description"
              name="description"
              value={category?.description}
              onChange={(e) => inputChangeHandler(e, setCategory)}
            />
            {!changeImage ? (
              <div className="relative group transition-all ease-in-out duration-200 rounded-lg">
                <Image
                  src={category?.images?.[0] as string}
                  alt={category?.name as string}
                  width={300}
                  height={200}
                  className=" h-60 rounded-lg object-center max-w-[500px] h-50 border-3"
                />

                <div className="absolute w-full top-0 h-full items-center justify-center bg-[rgba(0,0,0,0.4)] group-hover:flex hidden rounded-lg">
                  <Button
                    className="px-4 py-2"
                    type="tertiary"
                    onClick={() => setChangeImage(true)}
                  >
                    <UploadCloud size={16} />
                    <span>Upload new Image</span>
                  </Button>
                </div>
              </div>
            ) : (
              <FileUploadInput
                title="Image"
                files={image}
                setFiles={setImage}
              />
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default SinglyCategoryName;
