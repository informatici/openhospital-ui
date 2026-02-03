import { useAppSelector } from "libraries/hooks/redux";
import React, { useMemo } from "react";
import { Navigate, useLocation } from "react-router";
import { useLandingPageRoute } from "../../../libraries/hooks/useLandingPageRoute";
import { IMainState } from "../../../state/main";
import { IRedirectAfterLogin } from "./types";

export const RedirectAfterLogin: React.FC<IRedirectAfterLogin> = ({
  children,
}) => {
  const location = useLocation();
  const landingPageRoute = useLandingPageRoute();
  const to = useMemo(
    () => location.state?.from || landingPageRoute,
    [landingPageRoute, location]
  );

  const state: IMainState = useAppSelector((state) => state.main);

  const status = useMemo(
    () =>
      ["SUCCESS", "FAIL"].includes(state.settings.status!)
        ? state.authentication.status!
        : state.settings.status!,
    [state.settings.status, state.authentication.status]
  );

  if (status === "SUCCESS") {
    return <Navigate to={to} />;
  }

  return <>{children}</>;
};
