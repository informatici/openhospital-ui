import type { PriceDTO } from 'generated/models/PriceDTO';
import type { PriceListDTO } from 'generated/models/PriceListDTO';
import type { ApiResponse } from '../types';

export type IPricesState = {
	getPrices: ApiResponse<Array<PriceDTO>>;
	getPriceLists: ApiResponse<Array<PriceListDTO>>;
	createPriceList: ApiResponse<PriceListDTO>;
	updatePriceList: ApiResponse<PriceListDTO>;
	deletePriceList: ApiResponse<void>;
};
