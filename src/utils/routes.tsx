import { ChartBarStacked, House, Star, Tag, Ticket } from "lucide-react";

export const ROUTES = Object.freeze({
  BASE: "/",
  DASHBOARD: "/dashboard",
  SIGN_IN: "/sign-in",
  ORDER: "/orders",
  CATEGORIES: "/categories",
  COUPONS: "/coupons",
  TICKETS: "/tickets",
  PRODUCTS: "/products",
  CREATE_PRODUCT: "/products/create",
});

export const navRoutes = [
  {
    title: "Dashboard",
    route: ROUTES.DASHBOARD,
    properties: ["isSideNav"],
    icon: <House />,
  },
  {
    title: "Products",
    route: ROUTES.PRODUCTS,
    properties: ["isSideNav"],
    icon: <Tag />,
  },
  {
    title: "Categories",
    route: ROUTES.CATEGORIES,
    properties: ["isSideNav"],
    icon: <ChartBarStacked />,
  },
  {
    title: "Coupons",
    route: ROUTES.COUPONS,
    properties: ["isSideNav"],
    icon: <Star />,
  },
  {
    title: "Tickets",
    route: ROUTES.TICKETS,
    properties: ["isSideNav"],
    icon: <Ticket />,
  },
];
