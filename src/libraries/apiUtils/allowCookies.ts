import { Middleware, RequestArgs } from "../../generated";

export const allowCookies: Middleware = {
  pre(request: RequestArgs): RequestArgs {
    request.withCredentials = true;
    return request;
  },
};
