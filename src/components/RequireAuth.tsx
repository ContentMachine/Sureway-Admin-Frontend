"use client";

import React, { useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/context/AuthContext";
import { ROUTES } from "../utils/routes";
import { LOCAL_STORAGE_AUTH_KEY } from "@/utils/constants";
import LoaderComponent from "./Loader";

type RequireAuthProps = {
  children: React.ReactNode;
};

const RequireAuth = ({ children }: RequireAuthProps) => {
  // Router
  const router = useRouter();

  // Context
  const { requestState } = useContext(AuthContext);

  // Local
  const accessToken =
    typeof window !== "undefined" &&
    localStorage.getItem(LOCAL_STORAGE_AUTH_KEY);

  // Effects
  useEffect(() => {
    if (!requestState?.isLoading && !accessToken) {
      router.replace(ROUTES.SIGN_IN);
    }
  }, [accessToken, requestState?.isLoading, router]);

  if (requestState.isLoading) {
    return <LoaderComponent />;
  }

  return <>{children}</>;
};

export default RequireAuth;
