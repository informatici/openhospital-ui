import type { VaccineDTO } from '../../../../../generated';
import type { TFields } from '../../../../../libraries/formDataHandling/types';
import type { VaccineFormFieldName } from '.';

export const getInitialFields: (
	vaccine: VaccineDTO | undefined,
) => TFields<VaccineFormFieldName> = (vaccine) => ({
	code: { type: 'text', value: vaccine?.code ?? '' },
	description: { type: 'text', value: vaccine?.description ?? '' },
	vaccineType: { type: 'text', value: vaccine?.vaccineType?.code ?? '' },
});
