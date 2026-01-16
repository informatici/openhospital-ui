import type { DischargeTypeDTO } from '../../../../../../../generated';
import type { TFields } from '../../../../../../../libraries/formDataHandling/types';
import type { DischargeTypeFormFieldName } from '.';

export const getInitialFields: (
	dischargeType: DischargeTypeDTO | undefined,
) => TFields<DischargeTypeFormFieldName> = (dischargeType) => ({
	code: { type: 'text', value: dischargeType?.code ?? '' },
	description: { type: 'text', value: dischargeType?.description ?? '' },
});
