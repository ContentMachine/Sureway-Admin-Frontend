import Button from "@/components/Button";
import Dropdown from "@/components/Dropdown";
import FileUploadInput from "@/components/FIleUploadInput";
import Input from "@/components/Input";
import TextArea from "@/components/Textarea";
import { TextareaWithOptions } from "@/components/TextareaWithOptions";
import Toggle from "@/components/Toggle";
import { inputChangeHandler } from "@/helpers/inputChangeHandler";
import { STATES } from "@/utils/constants";
import { productType } from "@/utils/type";
import { Trash2 } from "lucide-react";
import Image from "next/image";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";

interface Props {
  data: productType;
  setData: Dispatch<SetStateAction<productType>>;
  images: File[];
  setImages: Dispatch<SetStateAction<File[]>>;
}

const CreateOrEditProductInformation: React.FC<Props> = ({
  data,
  setData,
  images,
  setImages,
}) => {
  // States
  const [addTax, setAddTaxTax] = useState(false);
  const [showImageFiles, setShowImageFiles] = useState(false);

  // Effects
  useEffect(() => {
    setData((prevState) => ({ ...prevState, hasTax: addTax }));
  }, [addTax]);

  return (
    <section className="basis-[70%] bg-white p-7 rounded-md font-sans">
      <h2 className="mb-6 text-black-600 text-xl font-bold ">Information</h2>
      <form
        className="flex flex-col gap-6"
        onSubmit={(e) => e.preventDefault()}
      >
        <Input
          label="Product Name"
          name="name"
          value={data?.name}
          onChange={(e) => inputChangeHandler(e, setData)}
        />
        <TextArea
          label="Product Description"
          name="description"
          value={data?.description}
          onChange={(e) => inputChangeHandler(e, setData)}
        />

        <hr className="border-0.5 border-[#ebebeb]" />

        <h2 className="mb-0 text-black-600 text-xl font-bold ">Images</h2>
        {showImageFiles && (
          <FileUploadInput
            files={images}
            setFiles={setImages}
            title="Upload Product Images"
            accept="image/*"
            multiple
          />
        )}
        <div className="flex items-center gap-3 flex-wrap">
          {Array.isArray(images) &&
            !showImageFiles &&
            images?.map((data) => {
              if (typeof data === "string")
                return (
                  <Image
                    src={data as string}
                    alt="Image"
                    key={data as string}
                    width={120}
                    height={120}
                    className="w-30 h-30 "
                  />
                );
            })}
          {!showImageFiles && (
            <div className="basis-full mt-4">
              <Button
                className="px-4 py-2 text-sm rounded-sm"
                type="tertiary"
                onClick={() => {
                  setShowImageFiles(true);
                  setImages([]);
                }}
              >
                <Trash2 size={16} />
                <span>Delete all images</span>
              </Button>
            </div>
          )}
        </div>

        <hr className="border-0.5 border-[#ebebeb]" />

        <h2 className="mb-0 text-black-600 text-xl font-bold ">Price</h2>
        <div className="flex flex-start gap-7 flex-wrap">
          <Input
            label="Product Price"
            className="flex-1"
            type="number"
            name="price"
            value={String(data?.price)}
            onChange={(e) => inputChangeHandler(e, setData)}
          />
          <Input
            label="Discount Price in percentage"
            className="flex-1"
            type="number"
            max={100}
            name="discount"
            value={String(data?.discount)}
            onChange={(e) => inputChangeHandler(e, setData)}
            condition={data?.discount <= 100}
          />
          <div className="basis-[100%] flex items-center gap-3">
            <Toggle checked={data?.hasTax} setChecked={setAddTaxTax} id="tax" />
            <label
              htmlFor="tax"
              className="font-sans text-black text-main font-medium"
            >
              Add tax for this product
            </label>
          </div>
        </div>

        <hr className="border-0.5 border-[#ebebeb]" />
        <h2 className="mb-0 text-black-600 text-xl font-bold ">Coupons</h2>
        <div>
          <Dropdown label="Select Coupon Code" options={["TOBE"]} />

          <p className="text-gray-600 text-xs font-medium mt-2">
            Coupons already come with a discount, therefore discounts and coupon
            codes cannot go hand in hand
          </p>

          <Button type="null" className="px-0">
            Create new
          </Button>
        </div>
      </form>
    </section>
  );
};

export default CreateOrEditProductInformation;
