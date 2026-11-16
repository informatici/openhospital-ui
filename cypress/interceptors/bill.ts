import { billResults } from '../../src/mocks/fixtures/billDTO';
import { billItemDTOs } from '../../src/mocks/fixtures/billItemDTO';
import { billPaymentsDTOs } from '../../src/mocks/fixtures/billPaymentsDTO';
import { http, jsonResponse, lastPathSegment, queryParam } from '../utils';

export const bill = [
	http.post('/bills', (req) => {
		const body = req.body;
		if (body.id === 'fail') {
			return { statusCode: 400, body: null };
		}
		return jsonResponse(body, 201);
	}),
	http.get('/bills/pending', (req) => {
		const code = queryParam(req.url, 'patient_code');
		return jsonResponse(
			billResults.filter((item) => {
				return (
					(+(code ?? 0) === 1 ||
						item.id === 10 ||
						item.patient?.code === +(code ?? 0)) &&
					item.status === 'O'
				);
			}),
			201,
		);
	}),
	http.get('/bills', (req) => {
		const code = queryParam(req.url, 'patient_code');
		const datefrom = queryParam(req.url, 'datefrom');
		return jsonResponse(
			billResults.filter((item) => {
				return (
					(+(code ?? 0) === 0 || item.patient?.code === +(code ?? 0)) &&
					(!datefrom ||
						new Date(datefrom).getFullYear() ===
							new Date(item.date).getFullYear())
				);
			}),
			201,
		);
	}),
	http.get('/bills/payments/{bill_id}', () =>
		jsonResponse(billPaymentsDTOs, 201),
	),
	http.get('/bills/items/{bill_id}', () => jsonResponse(billItemDTOs, 201)),
	http.get('/bills/payments', (req) => {
		const code = queryParam(req.url, 'patient_code');
		return jsonResponse(
			billPaymentsDTOs.filter((item) => {
				const bill = billResults.find((bill) => bill.id === item.billId);
				return +(code ?? 0) === 0 || bill?.patient?.code === +(code ?? 0);
			}),
		);
	}),
	http.delete('/bills/{id}', (req) => {
		if (lastPathSegment(req.url) === '-1') {
			return { statusCode: 400, body: null };
		}
		return { statusCode: 200, body: null };
	}),
	http.put('/bills/{id}', (req) => {
		const code = lastPathSegment(req.url);
		const failsRandomly = Math.random() * +code > 0.5 * +code;
		if (failsRandomly) {
			return { statusCode: 400, body: null };
		}
		return jsonResponse(req.body);
	}),
];
