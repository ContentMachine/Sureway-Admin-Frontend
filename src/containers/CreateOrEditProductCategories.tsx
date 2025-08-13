import Button from "@/components/Button";
import Checkbox from "@/components/Checkbox";
import Dropdown from "@/components/Dropdown";
import { activeToggler } from "@/helpers/activeHandlers";
import React, { useState } from "react";

const CreateOrEditProductCategories = () => {
  // utils
  const [categories, setCategories] = useState([
    { title: "Women", isActive: false },
    { title: "Men", isActive: false },
    { title: "T-shirts", isActive: false },
    { title: "Hoodies", isActive: false },
    { title: "Dress", isActive: false },
  ]);

  return (
    <section className="flex-1  font-sans flex flex-col gap-7.5">
      <div className="bg-white p-7 rounded-md">
        <h2 className="mb-6 text-black-600 text-xl font-bold ">Category</h2>
        <div>
          {categories?.map((data, i) => {
            return (
              <div className="flex items-center gap-3 mb-3">
                <Checkbox
                  checked={data?.isActive}
                  onChange={() => activeToggler(i, categories, setCategories)}
                />
                <span className="font-sans text-black text-main font-medium">
                  {data?.title}
                </span>
              </div>
            );
          })}

          <Button type="null" className="px-0">
            Create new
          </Button>
        </div>
      </div>

      <div className="bg-white p-7 rounded-md">
        <h2 className="mb-6 text-black-600 text-xl font-bold ">Sub-Category</h2>
        <div>
          {categories?.map((data, i) => {
            return (
              <div className="flex items-center gap-3 mb-3">
                <Checkbox
                  checked={data?.isActive}
                  onChange={() => activeToggler(i, categories, setCategories)}
                />
                <span className="font-sans text-black text-main font-medium">
                  {data?.title}
                </span>
              </div>
            );
          })}

          <Button type="null" className="px-0">
            Create new
          </Button>
        </div>
      </div>

      <div className="bg-white p-7 rounded-md">
        <h2 className="mb-6 text-black-600 text-xl font-bold ">Coupons</h2>

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
      </div>
    </section>
  );
};

export default CreateOrEditProductCategories;
