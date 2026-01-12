import type { BillPaymentsDTO } from '../../generated/models';

export const billPaymentsDTO: BillPaymentsDTO = {
	id: 0,
	billId: 10,
	date: new Date().toISOString(),
	amount: 500,
	user: 'admin',
};

export const billPaymentsDTOs: BillPaymentsDTO[] = [
	{
		id: 10,
		billId: 10,
		date: new Date().toISOString(),
		amount: 50,
		user: 'admin',
	},
	{
		id: 4,
		billId: 10,
		date: new Date().toISOString(),
		amount: 100,
		user: 'admin',
	},
];

export default billPaymentsDTO;
