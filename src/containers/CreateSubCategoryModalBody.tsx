import Button from "@/components/Button";
import Input from "@/components/Input";
import { Trash2, X } from "lucide-react";
import React from "react";

interface Props {
  onClose?: () => void;
}

const CreateSubCategoryModalBody: React.FC<Props> = ({ onClose }) => {
  return (
    <div className="max-w-[400px]">
      <h4 className="font-sans font-bold text-xl text-black mb-2">
        Add a new sub category
      </h4>
      <p className="font-sans font-medium text-sm text-gray-700 mb-4">
        Add a new sub-category to allow for better organization of products in
        this category
      </p>

      <form>
        <Input label="Sub-category name" />

        <div className="flex items-center gap-4 mt-8 justify-end">
          <Button
            type="tertiary"
            className="px-4 py-2 text-md"
            onClick={onClose}
          >
            <X size={18} />
            <span>Cancel</span>
          </Button>

          <Button className="px-4 py-2 text-md" type="delete">
            <Trash2 size={18} />
            <span>Delete</span>
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateSubCategoryModalBody;
