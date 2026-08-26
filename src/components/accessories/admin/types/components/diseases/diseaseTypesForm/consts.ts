import type { DiseaseTypeDTO } from '../../../../../../../generated';
import type { TFields } from '../../../../../../../libraries/formDataHandling/types';
import type { DiseaseTypeFormFieldName } from '.';

export const getInitialFields: (
	diseaseType: DiseaseTypeDTO | undefined,
) => TFields<DiseaseTypeFormFieldName> = (diseaseType) => ({
	code: { type: 'text', value: diseaseType?.code ?? '' },
	description: { type: 'text', value: diseaseType?.description ?? '' },
});
