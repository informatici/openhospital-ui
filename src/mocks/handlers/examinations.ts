import { patientExaminationDTO } from '../fixtures/patientExaminationDTO';
import { badRequest, http, noContent } from '../utils';

export const examinations = [
	http.post('/examinations', async ({ request, response }) => {
		const body = await request.json();
		if ((body.patientCode as any) === 'fail') {
			return response.untyped(badRequest({}));
		}
		return response(201).json(body);
	}),
	http.put('/examinations/{id}', async ({ request, response }) => {
		const body = await request.json();
		if ((body.patientCode as any) === 'fail') {
			return response.untyped(badRequest({}));
		}
		return response(200).json(body);
	}),
	http.get('/examinations/defaultPatientExamination', async ({ response }) => {
		return response(200).json(patientExaminationDTO);
	}),
	http.get(
		'/examinations/lastByPatientId/{patId}',
		async ({ params, response }) => {
			const patId = params.patId;
			if (patId === '1') {
				return response.untyped(badRequest({}));
			}
			return response(200).json(patientExaminationDTO);
		},
	),
	http.get(
		'/examinations/byPatientId/{patId}',
		async ({ params, response }) => {
			const patId = params.patId;
			if (patId === '1') {
				return response.untyped(badRequest({}));
			}
			if (patId === '2') {
				return response.untyped(noContent());
			}
			return response(200).json([
				patientExaminationDTO,
				patientExaminationDTO,
				patientExaminationDTO,
				patientExaminationDTO,
			]);
		},
	),
];
