import Button from "@/components/Button";
import FileUploadInput from "@/components/FIleUploadInput";
import Input from "@/components/Input";
import { inputChangeHandler } from "@/helpers/inputChangeHandler";
import useRequest from "@/hooks/useRequest";
import { requestType } from "@/utils/type";
import { Trash2, X } from "lucide-react";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { mutate } from "swr";

interface Props {
  onClose?: () => void;
}

const CreateSubCategoryModalBody: React.FC<Props> = ({ onClose }) => {
  // States
  const [createSubCategoryState, setCreateSubCategoryState] =
    useState<requestType>({ isLoading: false, data: null, error: null });
  const [name, setName] = useState("");
  const [subCategoryData, setSubCategoryData] = useState({
    name: "",
    description: "",
  });
  const [images, setImages] = useState<File[]>([]);
  const [formData, setFormData] = useState(new FormData());

  // Hooks
  const { requestHandler } = useRequest();

  // ROuter
  const { categoryId } = useParams();

  // Requests
  const handleAddSubCategory = (e: any) => {
    e.preventDefault();
    requestHandler({
      url: `/category/${categoryId}/subCategory`,
      isMultipart: true,
      method: "POST",
      data: formData,
      state: createSubCategoryState,
      setState: setCreateSubCategoryState,
      successFunction(res) {
        mutate(`/category/${categoryId}`);
        onClose && onClose();
        setName("");
      },
    });
  };

  // Effects
  useEffect(() => {
    const subFormData = new FormData();

    subFormData.append("name", subCategoryData?.name);
    subFormData.append("description", subCategoryData?.description);
    images.forEach((image) => {
      return subFormData.append("images", image);
    });

    setFormData(subFormData);
  }, [createSubCategoryState, images, subCategoryData]);

  return (
    <div className="max-w-[550px]">
      <h4 className="font-sans font-bold text-xl text-black mb-2">
        Add a new sub category
      </h4>
      <p className="font-sans font-medium text-sm text-gray-300 mb-4">
        Add a new sub-category to allow for better organization of products in
        this category
      </p>

      <form className="flex flex-col gap-4">
        <Input
          label="Sub-category name"
          name="name"
          onChange={(e) => inputChangeHandler(e, setSubCategoryData)}
          value={subCategoryData?.name}
        />

        <Input
          label="Sub-category Description"
          name="description"
          onChange={(e) => inputChangeHandler(e, setSubCategoryData)}
          value={subCategoryData?.description}
        />
        <FileUploadInput
          files={images}
          setFiles={setImages}
          title="Upload Sub-category Images (max 4)"
          multiple
          accept="images/*"
        />

        <div className="flex items-center gap-4 mt-8 justify-end">
          <Button
            type="tertiary"
            className="px-4 py-2 text-md"
            onClick={(e) => {
              e.preventDefault();
              onClose && onClose();
            }}
          >
            <X size={18} />
            <span>Cancel</span>
          </Button>

          <Button
            className="px-4 py-2 text-md"
            type="delete"
            onClick={handleAddSubCategory}
            loading={createSubCategoryState?.isLoading}
            disabled={!subCategoryData?.name || !subCategoryData?.description}
          >
            <Trash2 size={18} />
            <span>Add Sub-category</span>
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateSubCategoryModalBody;
