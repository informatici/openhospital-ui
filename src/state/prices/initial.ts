import { IPricesState } from "./types";
import { ApiResponse } from "../types";

export const initial: IPricesState = {
  getPrices: new ApiResponse({ status: "IDLE", data: [] }),
  getPriceLists: new ApiResponse({ status: "IDLE", data: [] }),
};
