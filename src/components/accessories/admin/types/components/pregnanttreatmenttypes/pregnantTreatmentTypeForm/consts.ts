import type { PregnantTreatmentTypeDTO } from '../../../../../../../generated';
import type { TFields } from '../../../../../../../libraries/formDataHandling/types';
import type { PregnantTreatmentTypeFormFieldName } from './types';

export const getInitialFields: (
	pregnantTreatmentType: PregnantTreatmentTypeDTO | undefined,
) => TFields<PregnantTreatmentTypeFormFieldName> = (pregnantTreatmentType) => ({
	code: { type: 'text', value: pregnantTreatmentType?.code ?? '' },
	description: {
		type: 'text',
		value: pregnantTreatmentType?.description ?? '',
	},
});
