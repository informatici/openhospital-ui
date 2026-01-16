import type { HospitalDTO } from '../../../../../generated';
import type { TFields } from '../../../../../libraries/formDataHandling/types';
import type { HospitalFormFieldName } from '.';

export const getInitialFields: (
	hospital: HospitalDTO | undefined,
) => TFields<HospitalFormFieldName> = (hospital) => ({
	description: { type: 'text', value: hospital?.description ?? '' },
	address: { type: 'text', value: hospital?.address ?? '' },
	city: { type: 'text', value: hospital?.city ?? '' },
	telephone: { type: 'text', value: hospital?.telephone ?? '' },
	fax: { type: 'text', value: hospital?.fax ?? '' },
	email: { type: 'text', value: hospital?.email ?? '' },
	currencyCod: { type: 'text', value: hospital?.currencyCod ?? '' },
});
