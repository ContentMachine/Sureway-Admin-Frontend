export interface ProductType {
  name: string;
  category: string;
  invetory: number;
  color: string;
  price: string;
  rating: number;
  votes: number;
  image: string;
  isActive?: boolean;
}

export interface OrderType {
  id: string;
  date: string;
  customerName: string;
  paymentStatus: string;
  orderSttus: string;
  total: number;
  isActive?: boolean;
}

export interface objectGenericType {
  [key: string]: boolean;
}

export type requestType = {
  isLoading: boolean;
  data: any;
  error: any;
  id?: string;
};

export type userType = {
  email: string;
  firstName: string;
  lastName: string;
};

export type categoryType = {
  createdAt: string;
  image: string;
  name: string;
  productCount: number;
  subCategories: subCategoryType[];
  updatedAt: string;
  _id: string;
  isActive?: boolean;
};

export type subCategoryType = {
  name: string;
  _id: string;
  isActive?: boolean;
};

export type productType = {
  name: string;
  description: string;
  price: number;
  discount: number;
  hasTax: boolean;
  category: null | string;
  subCategory: null | string;
  coupons: string[];
};

export type queryObjectType = { [key: string]: string | number };
