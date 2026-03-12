import { priceDTO } from '../fixtures/priceDTO';
import { http } from '../utils';

export const prices = [
	http.get('/pricelists/prices', async ({ response }) => {
		return response(200).json(priceDTO);
	}),
];
