import useGetHook from "./useGetHook";

export const useStats = () => {
  return useGetHook("/stats");
};

export const useOrdersOverTime = () => {
  return useGetHook("/stats/orders-over-time");
};

export const useTransactions = () => {
  return useGetHook("/stats/transactions");
};

export const useTopProducts = () => {
  return useGetHook("/stats/top-products");
};
