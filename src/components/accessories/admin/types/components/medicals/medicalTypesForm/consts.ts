import type { MedicalTypeDTO } from '../../../../../../../generated';
import type { TFields } from '../../../../../../../libraries/formDataHandling/types';
import type { MedicalTypeFormFieldName } from '.';

export const getInitialFields: (
	medicalType: MedicalTypeDTO | undefined,
) => TFields<MedicalTypeFormFieldName> = (medicalType) => ({
	code: { type: 'text', value: medicalType?.code ?? '' },
	description: { type: 'text', value: medicalType?.description ?? '' },
});
