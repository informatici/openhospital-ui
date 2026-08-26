import { medicalDTO } from '../fixtures/medicalDTO';
import { http } from '../utils';

export const medicals = [
	http.get('/medicals', async ({ response }) => {
		return response(200).json([medicalDTO]);
	}),
];
