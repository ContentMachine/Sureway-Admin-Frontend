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
  quantity: number;
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
  createdAt: string;
  email: string;
  name: string;
  role: string;
  updatedAt: string;
  __v: number;
  _id: string;
};

export type categoryType = {
  createdAt: string;
  images: string[];
  name: string;
  productCount: number;
  subCategories: subCategoryType[];
  updatedAt: string;
  _id: string;
  isActive?: boolean;
  slug: string;
};

export type subCategoryType = {
  name: string;
  _id: string;
  isActive?: boolean;
  description: string;
  images: string[];
};

export type productType = {
  name: string;
  description: string;
  price: number;
  internationalPrice: number;
  discount: number;
  hasTax: boolean;
  category: null | string;
  subCategory: null | string;
  coupons: string[];
  quantity: number;
  isActive?: boolean;
};

export type productResponseType = {
  coupons: null | couponResponseType[];
  createdAt: string;
  description: string;
  discount: number;
  hasTax: boolean;
  images: string[];
  name: string;
  price: number;
  quantity: number;
  rating: number;
  subCategory: string;
  updatedAt: string;
  __v: number;
  _id: string;
  isActive?: boolean;
  category: categoryResponseType;
  slug: string;
};

export type categoryResponseType = {
  _id: string;
  description?: string;
  name: string;
  images: string[];
  subCategories: subcategoryResponseType[];
  createdAt: string;
  updatedAt: string;
};

export type subcategoryResponseType = {
  name: string;
  _id: string;
  description: string;
  images: string[];
};

export type queryObjectType = { [key: string]: string | number };

export type orderResponseType = {
  fullName: string;
  email: string;
  phone: string;
  customText: string;
  whatToAchieve: string;
  price: string;
  quantity: string;
  productId: string | productResponseType;
  deliveryAddress: string;
  paymentRef: string;
  paymentMethod: string;
  images: string[];
  isActive?: boolean;
  status: string;
  _id: string;
  createdAt: string;
  paymentStatus: string;
  subCategory: subcategoryResponseType;
};

export type statsType = {
  orders: number;
  revenue: number;
  users: number;
};

export type ordersOverTimeType = {
  month: string;
  totalOrders: number;
};

export type topProductsType = {
  name: string;
  orderCount: number;
  price: number;
  productId: string;
  totalUnits: number;
};

export type couponType = {
  name: string;
  code: string;
  discountType: string;
  discountValue: number;
  maxUses: number;
  validFrom: string;
  validUntil: string;
  isActive?: boolean;
  active?: boolean;
  deliveryDiscount?: number;
};

export type couponResponseType = {
  code: string;
  createdAt: string;
  discountType: string;
  discountValue: number;
  active: boolean;
  maxUses: number;
  name: string;
  updatedAt: string;
  usedCount: number;
  validFrom: string;
  validUntil: string;
  __v: number;
  _id: string;
  isActive?: boolean;
};

export type userLocationtype = {
  country: string;
  longitude: number;
  latitude: number;
  currency: string;
  currencySymbol: string;
  flag: string;
};

export type countryNameType = {
  common: string;
  official: string;
  nativeName: {
    eng: {
      official: string;
      common: string;
    };
  };
};

export type countryCurrencyType = {
  name: string;
  symbol: string;
};

export type countryFlagType = {
  alt: string;
  png: string;
  svg: string;
};

export type countryType = {
  name: countryNameType | string;
  currencies:
    | {
        [symbol: string]: countryCurrencyType;
      }
    | string;
  flag: string;
  cca3: string;
  latlng: number[];
  flags: countryFlagType;
  slug?: string;
};
