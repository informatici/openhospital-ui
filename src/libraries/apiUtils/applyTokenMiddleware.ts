import produce from "immer";
import set from "lodash.set";
import { AUTH_KEY } from "../../consts";
import { Middleware, RequestArgs } from "../../generated";
import { SessionStorage } from "../storage/storage";

export const applyTokenMiddleware: Middleware = {
  pre(request: RequestArgs): RequestArgs {
    return produce(request, (draft) => {
      const userCredentials = SessionStorage.read(AUTH_KEY);
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
