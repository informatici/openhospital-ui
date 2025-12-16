import { pregnantTreatmentTypeDTO } from '../fixtures/pregnantTreatmentDTO';
import { badRequest, http } from '../utils';

export const pregnantTreatmentType = [
	http.get('/pregnanttreatmenttypes', async ({ response }) => {
		return response(200).json(pregnantTreatmentTypeDTO);
	}),
	http.post('/pregnanttreatmenttypes', async ({ request, response }) => {
		const body = await request.json();
		if (body.code === 'FAIL') {
			return response.untyped(
				badRequest({ message: 'Fail to create pregnant treatment type' }),
			);
		}
		return response(200).json(body);
	}),
	http.put('/pregnanttreatmenttypes/{code}', async ({ request, response }) => {
		const body = await request.json();
		if (body.code === 'FAIL') {
			return response.untyped(
				badRequest({ message: 'Fail to update pregnant treatment  type' }),
			);
		}
		return response(200).json(body);
	}),
	http.delete(
		'/pregnanttreatmenttypes/{code}',
		async ({ params, response }) => {
			const code = params.code;
			if (code === 'FAIL') {
				return response.untyped(
					badRequest({ message: 'Fail to delete pregnant treatment  type' }),
				);
			}
			return response(200).json(true);
		},
	),
];
