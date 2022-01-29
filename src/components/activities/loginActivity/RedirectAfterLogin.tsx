import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router";
import { TAPIResponseStatus } from "../../../state/types";
import { IState } from "../../../types";
import { IRedirectAfterLogin } from "./types";

export const RedirectAfterLogin: React.FC<IRedirectAfterLogin> = ({
  children,
  successRoute,
}) => {
  const history = useHistory();
  const location = useLocation<{ from: Location }>();
  const status = useSelector<IState, TAPIResponseStatus>(
    (state) => state.main.authentication.status || "IDLE"
  );

  useEffect(() => {
    if (status === "SUCCESS") {
      const from = location.state?.from || { pathname: successRoute };
      history.replace(from);
    }
  }, [status, location.state, history, successRoute]);

  return <>{children}</>;
};
