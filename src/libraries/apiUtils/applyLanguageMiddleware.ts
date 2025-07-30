import { LAGUAGE_KEY } from "consts";
import produce from "immer";
import { set } from "lodash";
import { Middleware, RequestArgs } from "../../generated";
import { LocalStorage } from "../storage/storage";

export const applyLanguageMiddleware: Middleware = {
  pre(request: RequestArgs): RequestArgs {
    const lang = LocalStorage.read(LAGUAGE_KEY);
    return produce(request, (draft) => {
      draft.headers = set(draft.headers || {}, "Accept-Language", lang);
    });
  },
};
