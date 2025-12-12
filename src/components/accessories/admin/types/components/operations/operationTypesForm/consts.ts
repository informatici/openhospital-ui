import type { OperationTypeDTO } from '../../../../../../../generated';
import type { TFields } from '../../../../../../../libraries/formDataHandling/types';
import type { OperationTypeFormFieldName } from '.';

export const getInitialFields: (
	operaationType: OperationTypeDTO | undefined,
) => TFields<OperationTypeFormFieldName> = (operaationType) => ({
	code: { type: 'text', value: operaationType?.code ?? '' },
	description: { type: 'text', value: operaationType?.description ?? '' },
});
