import { ageTypeDTO } from '../../src/mocks/fixtures/ageTypeDTO';
import { badRequest, http, jsonResponse } from '../utils';

export const ageTypes = [
	http.get('/agetypes', () => jsonResponse(ageTypeDTO)),
	http.put('/agetypes', (req) => {
		const body = req.body;
		if (body?.[0]?.to === 1) {
			return badRequest({ message: 'Fail to update age types' });
		}
		return jsonResponse(body);
	}),
];
