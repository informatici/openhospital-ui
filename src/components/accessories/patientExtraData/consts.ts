import type { PatientDTO } from '../../../generated';
import type { TFields } from '../../../libraries/formDataHandling/types';
import type { TPatientExtraDataFormFieldName } from './types';

export const initialFields = (
	patient: PatientDTO | undefined,
): TFields<TPatientExtraDataFormFieldName> => {
	return {
		allergies: { value: patient?.allergies ?? '', type: 'text' },
		anamnesis: { value: patient?.anamnesis ?? '', type: 'text' },
	};
};
