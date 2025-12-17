import { billResults } from '../fixtures/billDTO';
import { billItemDTOs } from '../fixtures/billItemDTO';
import { billPaymentsDTOs } from '../fixtures/billPaymentsDTO';
import { badRequest, http } from '../utils';

export const bills = [
	http.post('/bills', async ({ request, response }) => {
		const body = await request.json();
		return body.bill.id === 0
			? response.untyped(badRequest({ message: 'Fail to create bill' }))
			: response(201).json(body);
	}),
	http.get('/bills/pending', async ({ query, response }) => {
		const code = query.get('patient_code');
		return response(200).json(
			billResults.filter((item) => {
				return (
					(+code === 1 || item.id === 10 || item.patient?.code === +code) &&
					item.status === 'O'
				);
			}),
		);
	}),
	http.get('/bills', async ({ query, response }) => {
		const code = query.get('patient_code') || '0';
		const datefrom = query.get('datefrom');
		return response(200).json(
			billResults.filter((item) => {
				return (
					(+code === 0 || item.patient?.code === +code) &&
					(!datefrom ||
						new Date(datefrom).getFullYear() ===
							new Date(item.date).getFullYear())
				);
			}),
		);
	}),
	http.get('/bills/payments', async ({ query, response }) => {
		const code = query.get('patient_code') || '0';
		return response(200).json(
			billPaymentsDTOs.filter((item) => {
				const bill = billResults.find((bill) => bill.id === item.billId);
				return +code === 0 || bill?.patient?.code === +code;
			}),
		);
	}),
	http.get('/bills/payments/{bill_id}', ({ response }) => {
		return response(200).json(billPaymentsDTOs);
	}),
	http.get('/bills/items/{bill_id}', ({ response }) => {
		return response(200).json(billItemDTOs);
	}),
	http.delete('/bills/{id}', async ({ params, response }) => {
		const code = params.id;
		return code === '-1'
			? response.untyped(badRequest({ message: 'Fail to delete bill' }))
			: response(200).json(true);
	}),
	http.put('/bills/{id}', async ({ params, request, response }) => {
		const code = params.id;
		const body = await request.json();
		const random = Math.random() * +code > 0.5 * +code;
		return random
			? response.untyped(badRequest({ message: 'Fail to update bill' }))
			: response(200).json(body);
	}),
];
