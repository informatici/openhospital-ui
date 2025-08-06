import produce from "immer";
import { set } from "lodash";
import { AUTH_KEY } from "../../consts";
import { Middleware, RequestOpts } from "../../generated";
import { refreshTokenHasExpired } from "../authUtils/tokenHasExpired";
import { SessionStorage } from "../storage/storage";

export const applyTokenMiddleware: Middleware = {
  pre(request: RequestOpts): RequestOpts {
    const userCredentials = SessionStorage.read(AUTH_KEY);
    if (
      userCredentials?.refreshToken &&
      refreshTokenHasExpired(userCredentials.refreshToken)
    ) {
      SessionStorage.clear();
    }
    if (!userCredentials) {
      window.location.reload();
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
