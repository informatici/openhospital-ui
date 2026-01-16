import { diseasesDTO } from '../../src/mocks/fixtures/diseasesDTO';
import { badRequest, http, jsonResponse } from '../utils';

export const diseases = [
	http.get('/diseases/all', () => jsonResponse(diseasesDTO)),
	http.get('/diseases/opd', () =>
		jsonResponse(diseasesDTO.filter(({ opdInclude }) => opdInclude)),
	),
	http.get('/diseases/ipd/in', () =>
		jsonResponse(diseasesDTO.filter(({ ipdInInclude }) => ipdInInclude)),
	),
	http.get('/diseases/ipd/out', () =>
		jsonResponse(diseasesDTO.filter(({ ipdOutInclude }) => ipdOutInclude)),
	),
	http.post('/diseases', (req) => {
		const body = req.body;
		return body.code === 'FAIL'
			? badRequest({ message: 'Fail to create disease' })
			: jsonResponse(body, 201);
	}),
	http.put('/diseases', (req) => {
		const body = req.body;
		return body.description === 'FAIL'
			? badRequest({ message: 'Fail to update disease' })
			: jsonResponse(body);
	}),
];
