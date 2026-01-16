import { ageTypeDTO } from '../fixtures/ageTypeDTO';
import { badRequest, http } from '../utils';

export const ageTypes = [
	http.get('/agetypes', async ({ response }) => {
		return response(200).json(ageTypeDTO);
	}),
	http.put('/agetypes', async ({ request, response }) => {
		const body = await request.json();
		if (body[0].to === 1) {
			return response.untyped(
				badRequest({ message: 'Fail to update age types' }),
			);
		}
		return response(200).json(body);
	}),
];
