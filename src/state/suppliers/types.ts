import type { SupplierDTO } from '../../generated';
import type { ApiResponse } from '../types';

export type ISupplierState = {
	supplierList: ApiResponse<Array<SupplierDTO>>;
	create: ApiResponse<SupplierDTO>;
	update: ApiResponse<SupplierDTO>;
	delete: ApiResponse<void>;
};
