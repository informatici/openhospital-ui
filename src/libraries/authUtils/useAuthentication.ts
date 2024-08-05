import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "libraries/hooks/redux";
import { setAuthenticationSuccess } from "../../state/main";
import { IState } from "../../types";
import { getAuthenticationFromSession } from "./getAuthenticationFromSession";
import { saveAuthenticationDataToSession } from "./saveAuthenticationDataToSession";
import { savePermissionDataToSession } from "./savePermissionDataToSession";

export const useAuthentication = () => {
  const dispatch = useAppDispatch();
  const userCredentials = useAppSelector(
    (state: IState) => state.main.authentication.data
  );

  useEffect(() => {
    try {
      const sessionData = getAuthenticationFromSession();
      if (!userCredentials && sessionData) {
        // hydrate redux from session
        dispatch(setAuthenticationSuccess(sessionData));
      }
    } catch (e) {
      if (userCredentials) {
        // hydrate session from redux
        const { username, token, permissions } = userCredentials;
        saveAuthenticationDataToSession({
          username,
          token,
        });
        savePermissionDataToSession({
          permissions,
          userName: username,
        });
      }
    }
  }, [userCredentials, dispatch]);
};
