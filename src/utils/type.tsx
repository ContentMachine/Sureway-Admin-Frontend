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
