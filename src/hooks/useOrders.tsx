import { generateQueryString } from "@/helpers/generateQueryString";
import { queryObjectType } from "@/utils/type";
import useGetHook from "./useGetHook";

export const useOrders = (params: queryObjectType) => {
  const baseUrl = "/order";
  const url = generateQueryString(baseUrl, params);

  return useGetHook(url);
};

export const useOrdersById = (id: string) => {
  const url = id ? `/order/${id}` : null;

  return useGetHook(url);
};
