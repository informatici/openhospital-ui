import { SupplierDTO } from "../../generated";
import { IApiResponse } from "../types";

export type ISupplierState = {
  supplierList: IApiResponse<Array<SupplierDTO>>;
};
