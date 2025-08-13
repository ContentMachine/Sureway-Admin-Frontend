import FileUploadInput from "@/components/FIleUploadInput";
import Input from "@/components/Input";
import TextArea from "@/components/Textarea";
import { TextareaWithOptions } from "@/components/TextareaWithOptions";
import Toggle from "@/components/Toggle";
import { STATES } from "@/utils/constants";
import React, { useState } from "react";

const CreateOrEditProductInformation = () => {
  // States
  const [files, setFiles] = useState<File[]>([]);
  const [addTax, setAddTaxTax] = useState(false);
  const [deliveryStates, setDeliveryStates] = useState([""]);

  return (
    <section className="basis-[70%] bg-white p-7 rounded-md font-sans">
      <h2 className="mb-6 text-black-600 text-xl font-bold ">Information</h2>
      <form
        className="flex flex-col gap-6"
        onSubmit={(e) => e.preventDefault()}
      >
        <Input label="Product Name" />
        <TextArea label="Product Description" />

        <hr className="border-0.5 border-[#ebebeb]" />

        <h2 className="mb-0 text-black-600 text-xl font-bold ">Images</h2>
        <FileUploadInput
          files={files}
          setFiles={setFiles}
          title="Upload Product Images"
        />

        <hr className="border-0.5 border-[#ebebeb]" />

        <h2 className="mb-0 text-black-600 text-xl font-bold ">Price</h2>
        <div className="flex flex-start gap-7 flex-wrap">
          <Input label="Product Price" className="flex-1" type="number" />
          <Input label="Discount Price" className="flex-1" type="number" />
          <div className="basis-[100%] flex items-center gap-3">
            <Toggle checked={addTax} setChecked={setAddTaxTax} />
            <label
              htmlFor=""
              className="font-sans text-black text-main font-medium"
            >
              Add tax for this product
            </label>
          </div>
        </div>

        <hr className="border-0.5 border-[#ebebeb]" />

        <h2 className="mb-0 text-black-600 text-xl font-bold ">Delivery</h2>
        <div className="flex flex-col flex-start gap-7 flex-wrap">
          <Input label="Weight" className="flex-1" type="number" />
          <TextareaWithOptions
            options={deliveryStates}
            setOptions={setDeliveryStates}
            label="Select States"
            suggestions={STATES}
          />
        </div>
      </form>
    </section>
  );
};

export default CreateOrEditProductInformation;
