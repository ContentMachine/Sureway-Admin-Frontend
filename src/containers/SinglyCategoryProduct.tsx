"uase client";

import CategoryProduct from "@/components/CategoryProduct";
import DeleteModalBody from "@/components/DeleteModalBody";
import Modal from "@/components/Modal";
import { setAllModalsFalse, setModalTrue } from "@/helpers/modalHandlers";
import useUpdateSearchParams from "@/hooks/useUpdateSearchParams";
import {
  objectGenericType,
  productResponseType,
  productType,
  requestType,
} from "@/utils/type";
import { useParams, useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { useCategoryProducts } from "@/hooks/useCategories";
import LoaderComponent from "@/components/Loader";
import useRequest from "@/hooks/useRequest";
import { mutate } from "swr";
import NoData from "@/components/NoData";
import { ROUTES } from "@/utils/routes";

const SinglyCategoryProduct = () => {
  // States
  const [modals, setModals] = useState<objectGenericType>({
    delete: false,
  });
  const [prodictId, setProductId] = useState<null | string>(null);
  const [requestState, setRequestState] = useState<requestType>({
    isLoading: false,
    data: null,
    error: null,
  });

  // Hooks
  const router = useRouter();

  // Custom Hooks
  const { categoryId } = useParams();
  const { requestHandler } = useRequest();

  // Requests
  const { isLoading, data } = useCategoryProducts(categoryId as string);

  const deleteProduct = () => {
    requestHandler({
      url: "/product",
      method: "DELETE",
      data: { ids: [prodictId] },
      state: requestState,
      setState: setRequestState,
      id: "delete-product",
      successMessage: "Items deleted successfully",
      successFunction() {
        mutate(`/category/category/${categoryId}`);
        setProductId("");
        setAllModalsFalse(setModals);
      },
    });
  };

  // Memo
  const products: productResponseType[] = useMemo(
    () => data?.data?.products,
    [data]
  );

  return (
    <>
      {modals.delete && (
        <Modal
          body={
            <DeleteModalBody
              title="Are you sure you want to delete this product?"
              caption="Once this item is deleted, it cannot be retrieved."
              onClose={() => setAllModalsFalse(setModals)}
              onDelete={deleteProduct}
              loading={requestState?.isLoading}
            />
          }
          onClick={() => setAllModalsFalse(setModals)}
        />
      )}

      <section className="bg-white basis-[70%] p-7 rounded-md font-sans ">
        <h2 className="mb-6 text-black-600 text-xl font-bold ">Products</h2>

        <div className="flex flex-col gap-3">
          {isLoading ? (
            <LoaderComponent />
          ) : products?.length < 1 ? (
            <NoData>No products available for this category</NoData>
          ) : (
            products?.map((data, i) => {
              return (
                <CategoryProduct
                  image={data?.images?.[0]}
                  name={data?.name}
                  key={i}
                  onDelete={() => {
                    setProductId(data?._id);
                    setModalTrue(setModals, "delete");
                  }}
                  onEdit={() => {
                    router.push(`${ROUTES.PRODUCTS}/${data?._id}`);
                  }}
                />
              );
            })
          )}
        </div>
      </section>
    </>
  );
};

export default SinglyCategoryProduct;
