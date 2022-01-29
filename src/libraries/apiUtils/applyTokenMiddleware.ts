import produce from "immer";
import set from "lodash.set";
import { AUTH_KEY } from "../../consts";
import { Middleware, RequestArgs } from "../../generated";
import { SessionStorage } from "../storage/storage";
import history from "../../history";
import jwtDecode from "jwt-decode";

export interface JwtTokenModel {
  exp: number;
}
export const applyTokenMiddleware: Middleware = {
  pre(request: RequestArgs): RequestArgs {
    const userCredentials = SessionStorage.read(AUTH_KEY);

    const { exp } = jwtDecode<JwtTokenModel>(userCredentials.token);
    const expirationTime = exp * 1000 - 60000;
    if (Date.now() >= expirationTime) {
      SessionStorage.clear();
      history.replace("/login");
    }

    return produce(request, (draft) => {
      if (userCredentials.token) {
        draft.headers = set(
          draft.headers || {},
          "Authorization",
          `Bearer ${userCredentials.token}`
        );
      }
    });
  },
};
