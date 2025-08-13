import Button from "@/components/Button";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import CreateOrEditProductCategories from "./CreateOrEditProductCategories";
import CreateOrEditProductInformation from "./CreateOrEditProductInformation";
import { productType, requestType } from "@/utils/type";
import useRequest from "@/hooks/useRequest";

interface Props {
  data: productType;
  setData: Dispatch<SetStateAction<productType>>;
  images: File[];
  setImages: Dispatch<SetStateAction<File[]>>;
}

const CreateOrEditProductForm: React.FC<Props> = ({
  data,
  setData,
  images,
  setImages,
}) => {
  // States
  const [formData, setFormData] = useState(new FormData());
  const [createProductRequestState, setCreateProductRequestState] =
    useState<requestType>({ isLoading: false, data: null, error: null });

  // Hooks
  const { requestHandler } = useRequest();

  // Requests
  const handleCreateProduct = () => {
    requestHandler({
      url: "/product",
      method: "POST",
      data: formData,
      isMultipart: true,
      state: createProductRequestState,
      setState: setCreateProductRequestState,
      successMessage: "Product created successfully",
      successFunction(res) {
        setData({
          name: "",
          description: "",
          price: 0,
          discount: 0,
          hasTax: false,
          category: null,
          subCategory: null,
          coupons: [],
        });
        setImages([]);
      },
    });
  };

  // Effects
  useEffect(() => {
    const subFormData = new FormData();
    subFormData.append("name", data?.name);
    subFormData.append("description", data?.description);
    subFormData.append("price", String(data?.price));
    subFormData.append("discount", String(data?.discount));
    subFormData.append("hasTax", String(data?.hasTax));
    subFormData.append("category", data?.category as string);
    subFormData.append("subCategory", data?.subCategory as string);
    if (data?.coupons.length > 0) {
      data.coupons.forEach((coupon) => {
        subFormData.append("coupons", coupon);
      });
    }

    if (images.length > 0) {
      images.forEach((image) => {
        subFormData.append("images", image);
      });
    }

    setFormData(subFormData);
  }, [data, images]);

  return (
    <section className="flex items-start gap-7.5 flex-wrap">
      <CreateOrEditProductInformation
        data={data}
        setData={setData}
        images={images}
        setImages={setImages}
      />
      <CreateOrEditProductCategories
        data={data}
        setData={setData}
        images={images}
        setImages={setImages}
      />
      <div className="basis-[100%] flex items-center gap-3 border-t-1 pt-6 border-0.5 border-t-[#ebebeb]">
        <Button type="tertiary" className="ml-auto">
          Cancel
        </Button>
        <Button
          onClick={handleCreateProduct}
          loading={createProductRequestState?.isLoading}
          disabled={
            !data?.name ||
            !data?.description ||
            !data?.category ||
            data?.price < 1
          }
        >
          Save
        </Button>
      </div>
    </section>
  );
};

export default CreateOrEditProductForm;
