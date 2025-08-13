"uase client";

import CategoryProduct from "@/components/CategoryProduct";
import DeleteModalBody from "@/components/DeleteModalBody";
import Modal from "@/components/Modal";
import { setAllModalsFalse, setModalTrue } from "@/helpers/modalHandlers";
import { objectGenericType } from "@/utils/type";
import { useState } from "react";
import { tableData } from "./Products";

const SinglyCategoryProduct = () => {
  // States
  const [modals, setModals] = useState<objectGenericType>({
    delete: false,
  });
  const [prodictId, setProductId] = useState<null | string>(null);

  return (
    <>
      {modals.delete && (
        <Modal
          body={
            <DeleteModalBody
              title="Are you sure you want to delete this product?"
              caption="Once this item is deleted, it cannot be retrieved."
              onClose={() => setAllModalsFalse(setModals)}
            />
          }
          onClick={() => setAllModalsFalse(setModals)}
        />
      )}

      <section className="bg-white basis-[70%] p-7 rounded-md font-sans ">
        <h2 className="mb-6 text-black-600 text-xl font-bold ">Products</h2>

        <div className="flex flex-col gap-3">
          {tableData?.map((data, i) => {
            return (
              <CategoryProduct
                image={data?.image}
                name={data?.name}
                key={i}
                onDelete={() => {
                  setProductId(String(i));
                  setModalTrue(setModals, "delete");
                }}
              />
            );
          })}
        </div>
      </section>
    </>
  );
};

export default SinglyCategoryProduct;
