import React, { useMemo } from "react";
import { useSelector } from "@/libraries/hooks/redux";
import { Navigate, useLocation } from "react-router";
import { useLandingPageRoute } from "../../../libraries/hooks/useLandingPageRoute";
import { IState } from "../../../types";
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

  const state = useSelector<IState, IState>((state) => state);

  const status = useMemo(
    () =>
      ["SUCCESS", "FAIL"].includes(state.main.settings.status!)
        ? state.main.authentication.status!
        : state.main.settings.status!,
    [state.main.settings.status, state.main.authentication.status]
  );

  if (status === "SUCCESS") {
    return <Navigate to={to} />;
  }

  return <>{children}</>;
};
