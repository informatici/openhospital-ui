import { billResults } from '../fixtures/billDTO';
import { billItemDTOs } from '../fixtures/billItemDTO';
import { billPaymentsDTOs } from '../fixtures/billPaymentsDTO';
import { badRequest, http } from '../utils';

export const bills = [
	http.post('/bills', async ({ request, response }) => {
		const body = await request.json();
		return body.id === 'fail'
			? response.untyped(badRequest({ message: 'Fail to create bill' }))
			: response(201).json(body);
	}),
	http.get('/bills/pending', async ({ request, response }) => {
		const url = new URL(request.url);
		const code = url.searchParams.get('patient_code');
		return response(201).json(
			billResults.filter((item) => {
				return (
					(+code === 1 || item.id === 10 || item.patientDTO.code === +code) &&
					item.status === 'O'
				);
			}),
		);
	}),
	http.get('/bills', async ({ request, response }) => {
		const url = new URL(request.url);
		const code = url.searchParams.get('patient_code');
		const datefrom = url.searchParams.get('datefrom');
		return response(201).json(
			billResults.filter((item) => {
				return (
					(+code === 0 || item.patientDTO.code === +code) &&
					(!datefrom ||
						new Date(datefrom).getFullYear() ===
							new Date(item.date).getFullYear())
				);
			}),
		);
	}),
	http.get('/bills/payments/:bill_id', ({ response }) => {
		return response(201).json(billPaymentsDTOs);
	}),
	http.get('/bills/items/:bill_id', ({ response }) => {
		return response(201).json(billItemDTOs);
	}),
	http.get('/bills/payments', async ({ request, response }) => {
		const url = new URL(request.url);
		const code = url.searchParams.get('patient_code');
		return response(200).json(
			billPaymentsDTOs.filter((item) => {
				const bill = billResults.find((bill) => bill.id === item.billId);
				return +code === 0 || bill.patientDTO.code === +code;
			}),
		);
	}),
	http.delete('/bills/:id', async ({ params, response }) => {
		const code = params.id;
		return code === '-1'
			? response.untyped(badRequest({ message: 'Fail to delete bill' }))
			: response(200);
	}),
	http.put('/bills/:id', async ({ params, request, response }) => {
		const code = params.id;
		const body = await request.json();
		const random = Math.random() * +code > 0.5 * +code;
		return random
			? response.untyped(badRequest({ message: 'Fail to update bill' }))
			: response(200).json(body);
	}),
];
