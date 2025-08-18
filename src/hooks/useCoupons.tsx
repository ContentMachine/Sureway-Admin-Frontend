import { queryObjectType } from "@/utils/type";
import useGetHook from "./useGetHook";
import { generateQueryString } from "@/helpers/generateQueryString";

export const useCoupons = (params: queryObjectType) => {
  const baseUrl = "/coupon";
  const url = generateQueryString(baseUrl, params);

  return useGetHook(url);
};

export const useCouponById = (id: string) => {
  const url = id ? `/coupon/${id}` : null;

  return useGetHook(url);
};
