import type { DeliveryTypeDTO } from '../../../../../../../generated';
import type { TFields } from '../../../../../../../libraries/formDataHandling/types';
import type { DeliveryTypeFormFieldName } from '.';

export const getInitialFields: (
	deliveryType: DeliveryTypeDTO | undefined,
) => TFields<DeliveryTypeFormFieldName> = (deliveryType) => ({
	code: { type: 'text', value: deliveryType?.code ?? '' },
	description: { type: 'text', value: deliveryType?.description ?? '' },
});
