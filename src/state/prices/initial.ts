import { IPricesState } from "./types";
import { ApiResponse } from "../types";

export const initial: IPricesState = {
  getPrices: new ApiResponse({ status: "IDLE", data: [] }),
  getPriceLists: new ApiResponse({ status: "IDLE", data: [] }),
  createPriceList: new ApiResponse({ status: "IDLE" }),
  updatePriceList: new ApiResponse({ status: "IDLE" }),
  deletePriceList: new ApiResponse({ status: "IDLE" }),
};
