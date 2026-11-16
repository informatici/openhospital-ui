import { permissionDTO } from '../../src/mocks/fixtures/permissionDTO';
import { http, jsonResponse } from '../utils';

export const permission = [
	http.get('/permissions', () => jsonResponse(permissionDTO)),
	http.put('/permissions/{id}', () => jsonResponse(permissionDTO[0])),
];
