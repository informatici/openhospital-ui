import produce from "immer";
import { set } from "lodash";
import { AUTH_KEY } from "../../consts";
import { Middleware, RequestArgs } from "../../generated";
import { SessionStorage } from "../storage/storage";
import { redirect } from "react-router";
import { tokenHasExpired } from "../authUtils/tokenHasExpired";

export const applyTokenMiddleware: Middleware = {
  pre(request: RequestArgs): RequestArgs {
    const userCredentials = SessionStorage.read(AUTH_KEY);
    if (userCredentials.token && tokenHasExpired(userCredentials.token)) {
      SessionStorage.clear();
      return redirect("/login");
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
