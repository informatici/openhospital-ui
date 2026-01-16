import {
	type OperationDTO,
	OperationDTOOpeForEnum,
} from '../../../../../generated';
import type { TFields } from '../../../../../libraries/formDataHandling/types';
import type { OperationFormFieldName } from '.';

export const getInitialFields: (
	operation: OperationDTO | undefined,
) => TFields<OperationFormFieldName> = (operation) => ({
	code: { type: 'text', value: operation?.code ?? '' },
	description: { type: 'text', value: operation?.description ?? '' },
	type: { type: 'text', value: operation?.type?.code ?? '' },
	opeFor: {
		type: 'text',
		value: operation?.opeFor ?? OperationDTOOpeForEnum.OpdAdmission,
	},
	major: {
		type: 'number',
		value: `${operation?.major ?? 1}`,
	},
});
