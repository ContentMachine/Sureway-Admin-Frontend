import useGetHook from "./useGetHook";

export const useCoupons = () => {
  return useGetHook("/coupon");
};

export const useCouponById = (id: string) => {
  const url = id ? `/coupon/${id}` : null;

  return useGetHook(url);
};
