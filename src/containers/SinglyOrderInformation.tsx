import Input from "@/components/Input";
import Modal from "@/components/Modal";
import TextArea from "@/components/Textarea";
import { setAllModalsFalse, setModalTrue } from "@/helpers/modalHandlers";
import {
  objectGenericType,
  orderResponseType,
  productResponseType,
} from "@/utils/type";
import Image from "next/image";
import React, { useState } from "react";
import ImagePreviewModal from "./ImagePreviewModal";

const images = [1, 2, 3, 4, 5];
const tags = ["Check", "Test", "Passed", "Being"];

interface Props {
  order: orderResponseType;
}

const SinglyOrderInformation: React.FC<Props> = ({ order }) => {
  // states
  const [modals, setModals] = useState<objectGenericType>({
    image: false,
  });
  const [selectedImage, setSelectedImage] = useState<null | string>(null);

  // Handlers
  const handleCloseModas = () => {
    setAllModalsFalse(setModals);
    setSelectedImage(null);
  };

  const handlePreviewImage = (imageUrl: string) => {
    setSelectedImage(imageUrl);
    setModalTrue(setModals, "image");
  };

  return (
    <>
      {modals.image && (
        <Modal
          body={
            <ImagePreviewModal
              image={selectedImage!}
              onClose={handleCloseModas}
              order={order}
            />
          }
          onClick={handleCloseModas}
        />
      )}
      <section className="bg-white basis-[70%] p-7 rounded-md font-sans">
        <h2 className="mb-6 text-black-600 text-xl font-bold ">
          Order Information
        </h2>
        <div className="flex flex-col gap-6">
          <Input
            label="Product Name"
            value={(order?.productId as productResponseType)?.name}
            readOnly
          />
          {order?.customText && (
            <TextArea label="Custom Text" value={order?.customText} readOnly />
          )}
          {order?.whatToAchieve && (
            <TextArea
              label="What to Achieve"
              value={order?.whatToAchieve}
              readOnly
            />
          )}

          {order?.images?.length > 0 && (
            <div className="flex items-center gap-2 flex-wrap">
              <p className="font-sans text-black text-main font-medium basis-full">
                Images
              </p>

              {order?.images?.map((data) => {
                return (
                  <div
                    className="hover:opacity-70 cursor-pointer"
                    onClick={() => handlePreviewImage(data)}
                  >
                    <img
                      key={data}
                      src={data}
                      alt="Product name"
                      width={80}
                      height={40}
                      className="rounded-md object-cover"
                    />
                  </div>
                );
              })}
            </div>
          )}

          <Input label="Quantity" value={order?.quantity} readOnly />
          <Input
            label="Category"
            value={(order?.productId as productResponseType).category?.name}
            readOnly
          />
          <Input
            label="Sub-Category"
            value={order?.subCategory?.name}
            readOnly
          />

          <hr className="border-0.5 border-[#ebebeb]" />

          <h2 className="mb-0 text-black-600 text-xl font-bold ">
            User Information
          </h2>

          <Input label="Customer Name" value={order?.fullName} readOnly />
          <Input label="Email Address" value={order?.email} readOnly />
          <Input label="Phone" value={order?.phone} readOnly />

          <hr className="border-0.5 border-[#ebebeb]" />

          <h2 className="mb-0 text-black-600 text-xl font-bold ">
            Order Location
          </h2>
          <Input
            label="Order Address"
            value={order?.deliveryAddress}
            readOnly
          />
        </div>
      </section>
    </>
  );
};

export default SinglyOrderInformation;
