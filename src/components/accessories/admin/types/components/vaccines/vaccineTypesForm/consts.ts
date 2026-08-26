import type { VaccineTypeDTO } from '../../../../../../../generated';
import type { TFields } from '../../../../../../../libraries/formDataHandling/types';
import type { VaccineTypeFormFieldName } from '.';

export const getInitialFields: (
	vaccineType: VaccineTypeDTO | undefined,
) => TFields<VaccineTypeFormFieldName> = (vaccineType) => ({
	code: { type: 'text', value: vaccineType?.code ?? '' },
	description: { type: 'text', value: vaccineType?.description ?? '' },
});
