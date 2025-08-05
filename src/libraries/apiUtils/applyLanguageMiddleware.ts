import { LAGUAGE_KEY } from "consts";
import produce from "immer";
import { set } from "lodash";
import { Middleware, RequestOpts } from "../../generated";
import { LocalStorage } from "../storage/storage";

export const applyLanguageMiddleware: Middleware = {
  pre(request: RequestOpts): RequestOpts {
    let lang = LocalStorage.read(LAGUAGE_KEY);
    if (!lang) {
      lang = "en";
    }
    return produce(request, (draft) => {
      draft.headers = set(draft.headers || {}, "Accept-Language", lang);
    });
  },
};
