import { admissionDTO } from '../../src/mocks/fixtures/admissionDTO';
import {
	badRequest,
	http,
	jsonResponse,
	noContent,
	queryParam,
} from '../utils';

const dischargeProps = {
	disDate: '2021-08-27T10:19:44.000Z',
	disType: { code: 'F', description: 'FUGUE' },
};

const admissionList = [
	admissionDTO,
	admissionDTO,
	admissionDTO,
	{
		...admissionDTO,
		...dischargeProps,
		patient: { ...admissionDTO.patient, sex: 'F', agetype: 'd3' },
	},
	{ ...admissionDTO, ...dischargeProps },
	{
		...admissionDTO,
		patient: { ...admissionDTO.patient, sex: 'F', agetype: 'd2' },
		...dischargeProps,
	},
	{
		...admissionDTO,
		...dischargeProps,
		disType: { code: 'N', description: 'NORMALE' },
	},
];

export const admissions = [
	http.post('/admissions', (req) => {
		const body = req.body;
		if (body.admDate === 'fail') {
			return badRequest(null);
		}
		return jsonResponse(body, 201);
	}),
	http.put('/admissions', (req) => {
		const body = req.body;
		if (body.note === 'fail') {
			return badRequest(null);
		}
		return jsonResponse(body);
	}),
	http.get('/admissions', () =>
		jsonResponse({ data: admissionList, pageInfo: {} }),
	),
	http.get('/admissions/patient/{patientCode}', () =>
		jsonResponse(admissionList),
	),
	http.get('/admissions/current', (req) => {
		const code = queryParam(req.url, 'patientCode');
		switch (code) {
			case '50':
				return badRequest(null);
			case '21266':
				return noContent();
			default:
				return jsonResponse({ ...admissionDTO, id: 0 });
		}
	}),
	http.post('/admissions/discharge', (req) => {
		const body = req.body;
		if (body.note === 'fail') {
			return badRequest(null);
		}
		return jsonResponse(null);
	}),
	http.get('/admissions/discharges', () =>
		jsonResponse({
			data: admissionList.filter((admission) => admission.disDate != null),
			pageInfo: {},
		}),
	),
];
