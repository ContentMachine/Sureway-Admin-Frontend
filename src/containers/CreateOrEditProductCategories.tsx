import Button from "@/components/Button";
import Checkbox from "@/components/Checkbox";
import { activeToggler, activeTogglerRestAll } from "@/helpers/activeHandlers";
import React, {
  useState,
  Dispatch,
  SetStateAction,
  useMemo,
  useEffect,
} from "react";
import { categoryType, productType, subCategoryType } from "@/utils/type";
import { useCategories, useCategoryById } from "@/hooks/useCategories";
import LoaderComponent from "@/components/Loader";
import NoData from "@/components/NoData";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/utils/routes";
import Input from "@/components/Input";
import { inputChangeHandler } from "@/helpers/inputChangeHandler";

interface Props {
  data: productType;
  setData: Dispatch<SetStateAction<productType>>;
  images: File[];
  setImages: Dispatch<SetStateAction<File[]>>;
}

const CreateOrEditProductCategories: React.FC<Props> = ({ data, setData }) => {
  // utils
  const [categories, setCategories] = useState<categoryType[]>([]);
  const [subCategories, setSubCategories] = useState<subCategoryType[]>([]);

  // Router
  const router = useRouter();

  // Memos
  const activeCategory = useMemo(() => {
    return categories?.find((category) => category?._id === data?.category);
  }, [categories, data]);

  const activeSubCategory = useMemo(() => {
    return subCategories?.find((data) => data?.isActive);
  }, [subCategories]);

  // Request
  const { isLoading, data: categoriesData } = useCategories();
  const { isLoading: singlyCategoryIsLoading, data: singlyCategoryData } =
    useCategoryById(activeCategory?._id as string);

  console.log(singlyCategoryData, "Test");

  // Effects
  useEffect(() => {
    if (categoriesData) {
      setCategories(
        (categoriesData?.data as categoryType[])?.map((data) => ({
          ...data,
          isActive: false,
        }))
      );
    }
  }, [categoriesData]);

  useEffect(() => {
    if (singlyCategoryData) {
      setSubCategories(
        (singlyCategoryData?.data?.subCategories as subCategoryType[])?.map(
          (data) => ({
            ...data,
            isActive: false,
          })
        )
      );
    }
  }, [singlyCategoryData]);

  useEffect(() => {
    if (activeCategory) {
      setData((prevState) => ({ ...prevState, category: activeCategory._id }));
    }

    if (activeSubCategory) {
      setData((prevState) => ({
        ...prevState,
        subCategory: activeSubCategory._id,
      }));
    }
  }, [categories, subCategories]);

  return (
    <section className="flex-1  font-sans flex flex-col gap-7.5">
      <div className="bg-white p-7 rounded-md">
        <h2 className="mb-6 text-black-600 text-xl font-bold ">Category</h2>
        <div>
          {isLoading ? (
            <LoaderComponent />
          ) : (
            categories?.map((category, i) => {
              return (
                <div className="flex items-center gap-3 mb-3">
                  <Checkbox
                    checked={category?._id === data?.category}
                    onChange={() => {
                      setData((prevState) => ({
                        ...prevState,
                        category: category?._id,
                      }));
                    }}
                  />
                  <span className="font-sans text-black text-main font-medium">
                    {category?.name}
                  </span>
                </div>
              );
            })
          )}

          <Button
            type="null"
            className="px-0"
            onClick={() => {
              router.push(ROUTES.CREATE_CATEGORY);
            }}
          >
            Create new
          </Button>
        </div>
      </div>

      <div className="bg-white p-7 rounded-md">
        <h2 className="mb-6 text-black-600 text-xl font-bold ">Sub-Category</h2>
        <div>
          {singlyCategoryIsLoading ? (
            <LoaderComponent />
          ) : subCategories?.length < 1 ? (
            <NoData>
              No sub-categories available for the selected category
            </NoData>
          ) : (
            subCategories?.map((subcategory) => {
              return (
                <div className="flex items-center gap-3 mb-3">
                  <Checkbox
                    checked={subcategory?._id === data?.subCategory}
                    onChange={() =>
                      setData((prevState) => ({
                        ...prevState,
                        subCategory: subcategory?._id,
                      }))
                    }
                  />
                  <span className="font-sans text-black text-main font-medium">
                    {subcategory?.name}
                  </span>
                </div>
              );
            })
          )}
        </div>
      </div>

      <div className="bg-white p-7 rounded-md">
        <h2 className="mb-6 text-black-600 text-xl font-bold ">
          Product Quantity
        </h2>
        <div>
          <Input
            label="Quantity"
            type="number"
            name="quantity"
            value={String(data?.quantity)}
            onChange={(e) => inputChangeHandler(e, setData)}
          />
        </div>
      </div>
    </section>
  );
};

export default CreateOrEditProductCategories;
