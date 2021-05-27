import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAuthenticationSuccess } from "../../state/main/actions";
import { IState } from "../../types";
import { getAuthenticationFromSession } from "./getAuthenticationFromSession";
import { saveAuthenticationDataToSession } from "./saveAuthenticationDataToSession";
import { savePermissionDataToSession } from "./savePermissionDataToSession";

export const useAuthentication = () => {
  const dispatch = useDispatch();
  const userCredentials = useSelector(
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
        const { displayName, token, permission } = userCredentials;
        saveAuthenticationDataToSession({
          displayName,
          token,
        });
        savePermissionDataToSession({ permission });
      }
    }
  }, [userCredentials, dispatch]);
};
