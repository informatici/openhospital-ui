import type { AdmissionDTO } from '~/generated';
import { admissionDTO } from '../fixtures/admissionDTO';
import { badRequest, http, noContent } from '../utils';

const dischargeProps = {
	disDate: '2021-08-27T10:19:44.000Z',
	disType: { code: 'F', description: 'FUGUE' },
};

const admissions = [
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

export const admissionsHandlers = [
	http.post('/admissions', async ({ request, response }) => {
		const body = await request.json();
		if (body.admDate === 'fail') {
			return response.untyped(badRequest({ message: 'Request failed' }));
		}
		return response(201).json(body);
	}),
	http.put('/admissions', async ({ request, response }) => {
		const body = await request.json();
		if (body.note === 'fail') {
			return response.untyped(badRequest({ message: 'Request failed' }));
		}
		return response(200).json(body);
	}),
	http.get('/admissions', async ({ response }) => {
		return response(200).json({
			data: admissions as AdmissionDTO[],
			pageInfo: {},
		});
	}),
	http.get(
		'/admissions/patient/{patientCode}',
		async ({ params, response }) => {
			const code = params.patientCode;
			if (code === '10000') {
				return response.untyped(badRequest({ message: 'Request failed' }));
			}
			if (code === '21266') {
				return response.untyped(noContent());
			}
			return response(200).json(admissions as AdmissionDTO[]);
		},
	),
	http.get('/admissions/current', async ({ query, response }) => {
		const code = query.get('patientCode');
		if (code === '50') {
			return response.untyped(badRequest({ message: 'Request failed' }));
		}
		if (code === '21266') {
			return response.untyped(noContent());
		}
		return response(200).json({ ...admissionDTO, id: 0 });
	}),
	http.post('/admissions/discharge', async ({ request, response }) => {
		const body = await request.json();
		if (body.note === 'fail') {
			return response.untyped(badRequest({ message: 'Request failed' }));
		}
		return response(200).json(true);
	}),
	http.get('/admissions/discharges', async ({ response }) => {
		// Note: original code has req.jsonBody() but it's a GET, so no body. Assuming no fail case for GET.
		return response(200).json({
			data: admissions as AdmissionDTO[],
			pageInfo: {},
		});
	}),
];
