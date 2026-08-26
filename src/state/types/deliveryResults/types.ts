import type { DeliveryResultTypeDTO } from '../../../generated';
import type { ApiResponse } from '../../types';

export type IDeliveryResultTypeState = {
	getAll: ApiResponse<Array<DeliveryResultTypeDTO>>;
	create: ApiResponse<DeliveryResultTypeDTO>;
	update: ApiResponse<DeliveryResultTypeDTO>;
	delete: ApiResponse<boolean>;
};
