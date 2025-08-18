import {
  ChartBarStacked,
  House,
  ShoppingBag,
  Star,
  Tag,
  Ticket,
} from "lucide-react";

export const ROUTES = Object.freeze({
  BASE: "/",
  DASHBOARD: "/dashboard",
  SIGN_IN: "/sign-in",
  ORDERS: "/orders",
  CATEGORIES: "/categories",
  COUPONS: "/coupons",
  TICKETS: "/tickets",
  PRODUCTS: "/products",
  CREATE_PRODUCT: "/products/create",
  CREATE_CATEGORY: "/categories/create",
  CREATE_COUPONS: "/coupons/create",
});

export const navRoutes = [
  {
    title: "Dashboard",
    route: ROUTES.DASHBOARD,
    properties: ["isSideNav"],
    icon: <House />,
    isActive: true,
  },
  {
    title: "Orders",
    route: ROUTES.ORDERS,
    properties: ["isSideNav"],
    icon: <ShoppingBag />,
    isActive: true,
  },
  {
    title: "Products",
    route: ROUTES.PRODUCTS,
    properties: ["isSideNav"],
    icon: <Tag />,
    isActive: true,
  },
  {
    title: "Categories",
    route: ROUTES.CATEGORIES,
    properties: ["isSideNav"],
    icon: <ChartBarStacked />,
    isActive: true,
  },
  {
    title: "Coupons",
    route: ROUTES.COUPONS,
    properties: ["isSideNav"],
    icon: <Star />,
    isActive: true,
  },
  {
    title: "Tickets",
    route: ROUTES.TICKETS,
    properties: ["isSideNav"],
    icon: <Ticket />,
    isActive: false,
  },
];
