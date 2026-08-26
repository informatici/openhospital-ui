import type { AdmissionTypeDTO } from '../../../../../../../generated';
import type { TFields } from '../../../../../../../libraries/formDataHandling/types';
import type { AdmissionTypeFormFieldName } from '.';

export const getInitialFields: (
	admissionType: AdmissionTypeDTO | undefined,
) => TFields<AdmissionTypeFormFieldName> = (admissionType) => ({
	code: { type: 'text', value: admissionType?.code ?? '' },
	description: { type: 'text', value: admissionType?.description ?? '' },
});
