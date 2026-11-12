import { medicalDTO } from '../../src/mocks/fixtures/medicalDTO';
import { http, jsonResponse } from '../utils';

export const medicals = [
	http.get('/medicals', () => jsonResponse([medicalDTO])),
];
