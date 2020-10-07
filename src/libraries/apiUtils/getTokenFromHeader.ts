import { SESSION_ID_KEY } from "../../consts";
import { Middleware, ResponseArgs } from "../../generated";
import { LocalStorage } from "../storage/storage";

export const getTokenFromHeader: Middleware = {
  post(response: any): ResponseArgs {
    const authHeader = response.xhr.responseHeaders["set-cookie"];
    if (authHeader) {
      const token = authHeader.replace("JSESSIONID=", "").split(";")[0];
      LocalStorage.write(SESSION_ID_KEY, token);
    }
    return response;
  },
};
