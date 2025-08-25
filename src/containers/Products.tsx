"use client";

import Button from "@/components/Button";
import Title from "@/components/Title";
import { FolderOutput, Plus } from "lucide-react";
import React, { useEffect, useState } from "react";
import ProductSearchAndFilter from "./ProductSearchAndFilter";
import ProductsTable from "./ProductsTable";
import { productResponseType, productType, requestType } from "@/utils/type";
import Paginator from "@/components/Paginator";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/utils/routes";
import { useProducts } from "@/hooks/useProducts";
import useUpdateSearchParams from "@/hooks/useUpdateSearchParams";
import useRequest from "@/hooks/useRequest";
import { mutate } from "swr";
import { generateQueryString } from "@/helpers/generateQueryString";

const Products = () => {
  // States
  const [productsState, setProductsState] = useState<productResponseType[]>([]);
  const [page, setPage] = useState(1);
  const [requestState, setRequestState] = useState<requestType>({
    isLoading: false,
    data: null,
    error: null,
  });

  // Custom Hooks
  const { updateSearchParams } = useUpdateSearchParams();
  const { requestHandler } = useRequest();

  const search = updateSearchParams("search", undefined, "get");
  const filter = updateSearchParams("filter", undefined, "get");

  // Router
  const router = useRouter();

  // Utils
  const params = {
    search: search as string,
    category: filter as string,
    page: page,
    limit: 10,
  };

  // Requests
  const { isLoading, data: productData } = useProducts(params);

  const deleteProducts = () => {
    const selectedProducts = productsState
      ?.filter((data) => data?.isActive)
      ?.map((data) => data?._id);

    requestHandler({
      url: "/product",
      method: "DELETE",
      data: { ids: [...selectedProducts] },
      state: requestState,
      setState: setRequestState,
      id: "delete-product",
      successMessage: "Items deleted successfully",
      successFunction() {
        const url = generateQueryString("/product", params);
        mutate(url);
      },
    });
  };

  // Effects
  useEffect(() => {
    if (productData) {
      setProductsState(
        productData?.data?.products?.map((data: productResponseType) => ({
          ...data,
          isActive: false,
        }))
      );
    }
  }, [productData]);

  return (
    <section className="flex flex-col gap-6">
      <div className="flex items-center gap-3">
        <Title>Products</Title>
        <Button className="ml-auto" type="tertiary">
          <FolderOutput size={16} />
          <span>Export </span>
        </Button>

        <Button
          onClick={() => {
            router.push(ROUTES.CREATE_PRODUCT);
          }}
        >
          <Plus size={16} />
          <span>Add Product</span>
        </Button>
      </div>

      <div className="bg-white p-6 rounded-lg flex flex-col gap-6">
        <ProductSearchAndFilter
          products={productsState as productResponseType[]}
          onDelete={deleteProducts}
          deleteIsLoading={
            requestState?.id === "delete-product" && requestState?.isLoading
          }
        />
        <ProductsTable
          products={productsState as productResponseType[]}
          setProducts={setProductsState}
          isLoading={isLoading}
        />
        <div className="mt-4 flex items-center justify-between">
          <Paginator
            data={productsState}
            maxLimit={10}
            isBackend
            pages={productData?.data?.totalPages}
            setActiveNumberState={setPage}
          />
          <p className="font-sans font-medium text-base text-gray-600">
            {productData?.data?.total || 0} results
          </p>
        </div>
      </div>
    </section>
  );
};

export default Products;
