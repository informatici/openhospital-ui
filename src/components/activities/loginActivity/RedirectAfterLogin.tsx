import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { TAPIResponseStatus } from "../../../state/types";
import { IState } from "../../../types";
import { IRedirectAfterLogin } from "./types";

export const RedirectAfterLogin: React.FC<IRedirectAfterLogin> = ({
  children,
  successRoute,
}) => {
  const location = useLocation();
  const to = location.state?.from || successRoute;

  const status = useSelector<IState, TAPIResponseStatus>(
    (state) => state.main.authentication.status || "IDLE"
  );

  if (status === "SUCCESS") {
    return <Navigate to={to} />;
  }

  return <>{children}</>;
};
