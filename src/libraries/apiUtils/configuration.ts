import { BASE_PATH, Configuration } from "../../generated";
import { applyTokenMiddleware } from "./applyTokenMiddleware";

const basePath = process.env.REACT_APP_BASE_PATH || BASE_PATH;

export const customConfiguration = (authenticated = true) => {
  return authenticated
    ? new Configuration({
        basePath,
        middleware: [applyTokenMiddleware],
      })
    : new Configuration({ basePath });
};
