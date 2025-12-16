import { permissionDTO } from '../fixtures/permissionDTO';
import { http } from '../utils';

export const permission = [
	http.get('/permissions', async ({ response }) => {
		return response(200).json(permissionDTO);
	}),
	http.put('/permissions/{id}', async ({ response }) => {
		return response(200).json(permissionDTO[0]);
	}),
];
