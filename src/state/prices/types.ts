import { PriceDTO } from "../../generated/models/PriceDTO";
import { PriceListDTO } from "../../generated/models/PriceListDTO";
import { ApiResponse } from "../types";

export type IPricesState = {
  getPrices: ApiResponse<Array<PriceDTO>>;
  getPriceLists: ApiResponse<Array<PriceListDTO>>;
};
