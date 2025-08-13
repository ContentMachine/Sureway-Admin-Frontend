"use client";

import Button from "@/components/Button";
import FileUploadInput from "@/components/FIleUploadInput";
import Input from "@/components/Input";
import Title from "@/components/Title";
import { Check, ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const CreateCategory = () => {
  // States
  const [image, setImage] = useState<File[]>([]);

  //   Router
  const router = useRouter();

  return (
    <section className="flex flex-col gap-6 min-h-full">
      <div className="flex items-center gap-3">
        <Title>Add a New Category</Title>
      </div>

      <div className="bg-white basis-[70%] p-7 rounded-md font-sans ">
        <h2 className="mb-6 text-black text-xl font-bold">Category Info</h2>

        <form className="flex flex-col gap-4">
          <Input label="Category Name" />
          <FileUploadInput title="Image" files={image} setFiles={setImage} />
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

        <Button>
          <Check />
          <span>Save</span>
        </Button>
      </div>
    </section>
  );
};

export default CreateCategory;
