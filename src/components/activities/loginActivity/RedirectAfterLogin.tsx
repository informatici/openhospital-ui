import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router";
import { useLandingPageRoute } from "../../../libraries/hooks/useLandingPageRoute";
import { TAPIResponseStatus } from "../../../state/types";
import { IState } from "../../../types";
import { IRedirectAfterLogin } from "./types";

export const RedirectAfterLogin: React.FC<IRedirectAfterLogin> = ({
  children,
  successRoute,
}) => {
  const location = useLocation();
  const landingPageRoute = useLandingPageRoute();
  const to = useMemo(
    () => location.state?.from || landingPageRoute || successRoute,
    [landingPageRoute, location, successRoute]
  );

  const status = useSelector<IState, TAPIResponseStatus>(
    (state) => state.main.authentication.status || "IDLE"
  );

  if (status === "SUCCESS") {
    return <Navigate to={to} />;
  }

  return <>{children}</>;
};
