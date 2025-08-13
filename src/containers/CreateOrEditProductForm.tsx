import Button from "@/components/Button";
import React from "react";
import CreateOrEditProductCategories from "./CreateOrEditProductCategories";
import CreateOrEditProductInformation from "./CreateOrEditProductInformation";

const CreateOrEditProductForm = () => {
  return (
    <section className="flex items-start gap-7.5 flex-wrap">
      <CreateOrEditProductInformation />
      <CreateOrEditProductCategories />
      <div className="basis-[100%] flex items-center gap-3 border-t-1 pt-6 border-0.5 border-t-[#ebebeb]">
        <Button type="tertiary" className="ml-auto">
          Cancel
        </Button>
        <Button>Save</Button>
      </div>
    </section>
  );
};

export default CreateOrEditProductForm;
