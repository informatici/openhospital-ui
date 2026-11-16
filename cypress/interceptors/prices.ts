import { priceDTO } from '../../src/mocks/fixtures/priceDTO';
import { http, jsonResponse } from '../utils';

export const prices = [
	http.get('/pricelists/prices', () => jsonResponse(priceDTO)),
];
