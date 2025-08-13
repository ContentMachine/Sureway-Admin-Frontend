import useGetHook from "./useGetHook";

export const useCategories = () => {
  const url = "/category";

  return useGetHook(url);
};

export const useCategoryById = (id: string) => {
  const url = id ? `/category/${id}` : null;

  return useGetHook(url);
};

export const useCategoryProducts = (id: string) => {
  const url = id ? `category/${id}` : null;

  return useGetHook(url);
};
