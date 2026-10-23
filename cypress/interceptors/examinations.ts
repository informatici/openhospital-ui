import { patientExaminationDTO } from '../../src/mocks/fixtures/patientExaminationDTO';
import { badRequest, http, jsonResponse } from '../utils';

export const examinations = [
	http.post('/examinations', (req) => {
		const body = req.body;
		if (body.patientCode === 'fail') {
			return badRequest(null);
		}
		return jsonResponse(body, 201);
	}),
	http.put('/examinations/{code}', (req) => {
		const body = req.body;
		if (body.patientCode === 'fail') {
			return badRequest(null);
		}
		return jsonResponse(body);
	}),
	http.get('/examinations/defaultPatientExamination', () =>
		jsonResponse(patientExaminationDTO),
	),
	http.get('/examinations/lastByPatientId/{patId}', () =>
		jsonResponse(patientExaminationDTO),
	),
	http.get('/examinations/byPatientId/{patId}', () =>
		jsonResponse([
			patientExaminationDTO,
			patientExaminationDTO,
			patientExaminationDTO,
			patientExaminationDTO,
		]),
	),
];
