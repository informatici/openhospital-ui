import moment from 'moment';
import type { TFields } from '../../../libraries/formDataHandling/types';
import type { BillFilterFormFieldName } from '../../accessories/billTable/types';

import type { PaymentsFilterFormFieldName } from '../../accessories/paymentsTable/types';

export const FilterBillsInitialFields: TFields<BillFilterFormFieldName> = {
	patientCode: {
		value: '',
		type: 'text',
	},
	fromDate: {
		value: moment().add(-6, 'days').toISOString(),
		type: 'date',
	},
	toDate: {
		value: moment().toISOString(),
		type: 'date',
	},
	status: {
		value: 'ALL',
		type: 'text',
	},
	month: {
		value: moment().toISOString(),
		type: 'date',
	},
	year: {
		value: moment().toISOString(),
		type: 'date',
	},
};

export const paymentsFilterInitialFields: TFields<PaymentsFilterFormFieldName> =
	{
		patientCode: {
			value: '',
			type: 'text',
		},
		fromDate: {
			value: new Date().setDate(new Date().getDate() - 6).toString(),
			type: 'date',
		},
		toDate: {
			value: Date.now().toString(),
			type: 'date',
		},
	};
