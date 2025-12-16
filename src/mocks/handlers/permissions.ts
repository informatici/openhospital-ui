import { permissionDTO } from '../fixtures/permissionDTO';
import { http } from '../utils';

export const permissions = [
	http.get('/permissions', async ({ response }) => {
		return response(200).json(permissionDTO);
	}),
];
