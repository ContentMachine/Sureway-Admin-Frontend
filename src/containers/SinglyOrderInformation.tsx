import Input from "@/components/Input";
import TextArea from "@/components/Textarea";
import Image from "next/image";
import React from "react";

const images = [1, 2, 3, 4, 5];
const tags = ["Check", "Test", "Passed", "Being"];

const SinglyOrderInformation = () => {
  return (
    <section className="bg-white basis-[70%] p-7 rounded-md font-sans">
      <h2 className="mb-6 text-black-600 text-xl font-bold ">
        Order Information
      </h2>
      <div className="flex flex-col gap-6">
        <Input label="Id" />
        <Input label="Product Name" />
        <TextArea label="Custom Text" />
        <TextArea label="Comment" />
        <Input label="Dimension" />

        <div className="flex items-center gap-2 flex-wrap">
          <p className="font-sans text-black text-main font-medium basis-full">
            Images
          </p>

          {images.map((data) => {
            return (
              <Image
                key={data}
                src="/product.svg"
                alt="Product name"
                width={80}
                height={40}
                className="rounded-md object-cover"
              />
            );
          })}
        </div>

        <Input label="Quantity" />
        <Input label="Category" />
        <Input label="Sub-Category" />

        <div className="flex items-center gap-4 flex-wrap">
          <p className="font-sans text-black text-main font-medium basis-full">
            Tags
          </p>

          {tags.map((data) => {
            return (
              <div className="font-geist font-medium text-sm text-[#7E84A3] px-2 py-0.5 rounded-l-[2px] bg-[#E6E9F4] flex items-center justify-center">
                {data}
              </div>
            );
          })}
        </div>

        <hr className="border-0.5 border-[#ebebeb]" />

        <h2 className="mb-0 text-black-600 text-xl font-bold ">
          User Information
        </h2>

        <Input label="Customer Name" />
        <Input label="Email Address" />
        <Input label="Phone" />

        <hr className="border-0.5 border-[#ebebeb]" />

        <h2 className="mb-0 text-black-600 text-xl font-bold ">
          Order Location
        </h2>
        <Input label="Order Address" />
      </div>
    </section>
  );
};

export default SinglyOrderInformation;
