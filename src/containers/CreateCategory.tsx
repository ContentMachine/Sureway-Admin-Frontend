"use client";

import Button from "@/components/Button";
import FileUploadInput from "@/components/FIleUploadInput";
import Input from "@/components/Input";
import Title from "@/components/Title";
import { inputChangeHandler } from "@/helpers/inputChangeHandler";
import useRequest from "@/hooks/useRequest";
import { requestType } from "@/utils/type";
import { Check, ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const CreateCategory = () => {
  // States
  const [image, setImage] = useState<File[]>([]);
  const [categoryName, setCategoryName] = useState("");
  const [createCategoryState, setCreateCategoryState] = useState<requestType>({
    isLoading: false,
    data: null,
    error: null,
  });
  const [formDataState, setFormDataState] = useState(new FormData());

  //   Router
  const router = useRouter();

  // Hooks
  const { requestHandler } = useRequest();

  // Requests
  const createCategory = () => {
    requestHandler({
      url: "/category",
      method: "POST",
      data: formDataState,
      isMultipart: true,
      state: createCategoryState,
      setState: setCreateCategoryState,
      successMessage: `${categoryName} created successfully!`,
      successFunction(res) {
        setCategoryName("");
        setImage([]);
      },
    });
  };

  // Effects
  useEffect(() => {
    const categoryFormData = new FormData();

    categoryFormData.append("name", categoryName);
    if (image.length > 0) {
      categoryFormData.append("image", image[0]);
    }

    setFormDataState(categoryFormData);
  }, [categoryName, image]);

  return (
    <section className="flex flex-col gap-6 min-h-full">
      <div className="flex items-center gap-3">
        <Title>Add a New Category</Title>
      </div>

      <div className="bg-white basis-[70%] p-7 rounded-md font-sans ">
        <h2 className="mb-6 text-black text-xl font-bold">Category Info</h2>

        <form className="flex flex-col gap-4">
          <Input
            label="Category Name"
            name="categoryName"
            value={categoryName}
            onChange={(e) => inputChangeHandler(e, setCategoryName, true)}
          />
          <FileUploadInput
            title="Image"
            files={image}
            setFiles={setImage}
            accept="image/*"
          />
        </form>
      </div>

      <div className="flex items-center gap-3 border-t-1 pt-6 border-0.5 border-t-[#ebebeb] basis-full mt-auto">
        <Button
          type="tertiary"
          className="ml-auto"
          onClick={() => router.back()}
        >
          <ChevronLeft />
          Back
        </Button>

        <Button
          onClick={createCategory}
          disabled={!categoryName || image.length < 1}
          loading={createCategoryState?.isLoading}
        >
          <Check />
          <span>Save</span>
        </Button>
      </div>
    </section>
  );
};

export default CreateCategory;
