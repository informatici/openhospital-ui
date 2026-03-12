import type { DeliveryResultTypeDTO } from '../../../../../../../generated';
import type { TFields } from '../../../../../../../libraries/formDataHandling/types';
import type { DeliveryResultTypeFormFieldName } from './types';

export const getInitialFields: (
	diseaseType: DeliveryResultTypeDTO | undefined,
) => TFields<DeliveryResultTypeFormFieldName> = (diseaseType) => ({
	code: { type: 'text', value: diseaseType?.code ?? '' },
	description: { type: 'text', value: diseaseType?.description ?? '' },
});
