import { generateQueryString } from "@/helpers/generateQueryString";
import { queryObjectType } from "@/utils/type";
import useGetHook from "./useGetHook";

export const useProducts = (params: queryObjectType) => {
  const url = "/product";
  const queryWithUrl = generateQueryString(url, params);
  return useGetHook(queryWithUrl);
};
