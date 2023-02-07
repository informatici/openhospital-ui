import { PriceDTO } from "../../generated/models/PriceDTO";
import { PriceListDTO } from "../../generated/models/PriceListDTO";
import { IApiResponse } from "../types";

export type IPricesState = {
  getPrices: IApiResponse<Array<PriceDTO>>;
  getPriceLists: IApiResponse<Array<PriceListDTO>>;
};
