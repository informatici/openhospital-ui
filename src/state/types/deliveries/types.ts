import type { DeliveryTypeDTO } from '../../../generated';
import type { ApiResponse } from '../../types';

export type IDeliveryTypesState = {
	getAll: ApiResponse<Array<DeliveryTypeDTO>>;
	create: ApiResponse<DeliveryTypeDTO>;
	update: ApiResponse<DeliveryTypeDTO>;
	delete: ApiResponse<boolean>;
};
