import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router";
import { TAPIResponseStatus } from "../../../state/types";
import { IState } from "../../../types";
import { IRedirectAfterLogin } from "./types";

export const RedirectAfterLogin: React.FC<IRedirectAfterLogin> = ({
  children,
  successRoute,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const status = useSelector<IState, TAPIResponseStatus>(
    (state) => state.main.authentication.status || "IDLE"
  );

  useEffect(() => {
    if (status === "SUCCESS") {
      const from = location.state ? location.pathname : { pathname: successRoute };
      navigate(from, { replace: true })
    }
  }, [status, location.state, navigate, successRoute]);

  return <>{children}</>;
};
