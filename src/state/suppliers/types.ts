import { SupplierDTO } from "../../generated";
import { ApiResponse } from "../types";

export type ISupplierState = {
  supplierList: ApiResponse<Array<SupplierDTO>>;
};
