import { diseasesDTO } from '../fixtures/diseasesDTO';
import { badRequest, http } from '../utils';

export const diseases = [
	http.get('/diseases/all', ({ response }) => {
		return response(200).json(diseasesDTO);
	}),
	http.get('/diseases/opd', ({ response }) => {
		return response(200).json(
			diseasesDTO.filter(({ opdInclude }) => opdInclude),
		);
	}),
	http.get('/diseases/ipd/in', ({ response }) => {
		return response(200).json(
			diseasesDTO.filter(({ ipdInInclude }) => ipdInInclude),
		);
	}),
	http.get('/diseases/ipd/out', ({ response }) => {
		return response(200).json(
			diseasesDTO.filter(({ ipdOutInclude }) => ipdOutInclude),
		);
	}),
	http.post('/diseases', async ({ request, response }) => {
		const body = await request.json();
		return body.code === 'FAIL'
			? response.untyped(badRequest({ message: 'Fail to create disease' }))
			: response(201).json(body);
	}),
	http.put('/diseases', async ({ request, response }) => {
		const body = await request.json();
		return body.description === 'FAIL'
			? response.untyped(badRequest({ message: 'Fail to update disease' }))
			: response(200).json(body);
	}),
];
