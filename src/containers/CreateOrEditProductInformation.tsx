import FileUploadInput from "@/components/FIleUploadInput";
import Input from "@/components/Input";
import TextArea from "@/components/Textarea";
import React, { useState } from "react";

const CreateOrEditProductInformation = () => {
  // States
  const [files, setFiles] = useState<File[]>([]);

  return (
    <section className="basis-[70%] bg-white p-7 rounded-md font-sans">
      <h2 className="mb-6 text-black-600 text-xl font-bold ">Information</h2>
      <form className="flex flex-col gap-6">
        <Input label="Product Name" />
        <TextArea label="Product Description" />
        <FileUploadInput
          files={files}
          setFiles={setFiles}
          title="Upload Product Images"
        />
      </form>
    </section>
  );
};

export default CreateOrEditProductInformation;
