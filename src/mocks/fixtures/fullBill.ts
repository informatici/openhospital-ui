import type { FullBillDTO } from '../../generated';
import { billDTO } from './billDTO';
import { billItemDTO } from './billItemDTO';
import { billPaymentsDTO } from './billPaymentsDTO';

export const fullBill: FullBillDTO = {
	bill: billDTO,
	billItems: [billItemDTO],
	billPayments: [billPaymentsDTO],
};
