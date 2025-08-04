import Dashboard from "@/containers/Dashboard";
import { ROUTES } from "@/utils/routes";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export default function Home() {
  return <Suspense>{redirect(ROUTES.DASHBOARD)}</Suspense>;
}
