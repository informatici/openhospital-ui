import patientDTO, { patientDTO2 } from '../fixtures/patientDTO';
import patientDTOOut from '../fixtures/patientDTOOut';
import { badRequest, http, noContent } from '../utils';

export const patients = [
	http.post('/patients', async ({ request, response }) => {
		const body = await request.json();
		return body.firstName === 'fail'
			? response.untyped(badRequest({ message: 'Fail to create patient' }))
			: response(201).json({ ...body, code: 1 });
	}),
	http.get('/patients/search', async ({ query, response }) => {
		const firstName = query.get('firstName');
		switch (firstName) {
			case 'empty':
				return response(200).json([]);
			case 'unexpected':
				return response(200).json([]);
			case 'fail':
				return response.untyped(
					badRequest({ message: 'Fail to search patients' }),
				);
			default:
				return response(200).json([
					patientDTO,
					patientDTO,
					patientDTO,
					patientDTO,
					patientDTO,
					patientDTO2,
				]);
		}
	}),
	http.get('/patients/{code}', async ({ params, response }) => {
		const code = params.code;
		switch (code) {
			case '1234561':
				return response.untyped(badRequest({ message: 'Fail to get patient' }));
			case '1234562':
				return response.untyped(noContent());
			case '1234563':
				return response(200).json({ ...patientDTOOut, code: +code });
			default:
				return response(200).json({ ...patientDTO, code: +code });
		}
	}),
	http.put('/patients/{code}', async ({ params, response }) => {
		const code = params.code;
		switch (code) {
			case '1234561':
				return response.untyped(
					badRequest({ message: 'Fail to update patient' }),
				);
			case '1234562':
				return response.untyped(noContent());
			default:
				return response(200).json(patientDTO);
		}
	}),
];
