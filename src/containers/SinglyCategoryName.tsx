"use client";

import Button from "@/components/Button";
import Checkbox from "@/components/Checkbox";
import FileUploadInput from "@/components/FIleUploadInput";
import Input from "@/components/Input";
import Modal from "@/components/Modal";
import Toggle from "@/components/Toggle";
import { activeToggler } from "@/helpers/activeHandlers";
import { setAllModalsFalse, setModalTrue } from "@/helpers/modalHandlers";
import { objectGenericType } from "@/utils/type";
import React, { useState } from "react";
import CreateSubCategoryModalBody from "./CreateSubCategoryModalBody";

const SinglyCategoryName = () => {
  // States
  const [isVisible, setIsVisible] = useState(false);
  const [image, setImage] = useState<File[]>([]);
  const [categories, setCategories] = useState([
    { title: "Women", isActive: false },
    { title: "Men", isActive: false },
    { title: "T-shirts", isActive: false },
    { title: "Hoodies", isActive: false },
    { title: "Dress", isActive: false },
  ]);
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
            {categories?.map((data, i) => {
              return (
                <div className="flex items-center gap-3 mb-3">
                  <Checkbox
                    checked={data?.isActive}
                    onChange={() => activeToggler(i, categories, setCategories)}
                  />
                  <span className="font-sans text-black text-main font-medium">
                    {data?.title}
                  </span>
                </div>
              );
            })}

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
          <h2 className="mb-6 text-black-600 text-xl font-bold ">
            Category Visibility
          </h2>
          <div className="flex items-center gap-2">
            <Toggle
              checked={isVisible}
              setChecked={setIsVisible}
              id="Visible"
            />
            <label
              htmlFor="Visible"
              className="text-black text-base font-medium"
            >
              Visible on site
            </label>
          </div>
        </div>

        <div className="bg-white p-7 rounded-md">
          <h2 className="mb-6 text-black text-xl font-bold">Category Info</h2>

          <div className="flex flex-col gap-4">
            <Input label="Category Name" />
            <FileUploadInput title="Image" files={image} setFiles={setImage} />
          </div>
        </div>
      </section>
    </>
  );
};

export default SinglyCategoryName;
