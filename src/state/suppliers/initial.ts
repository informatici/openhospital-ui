import { ISupplierState } from "./types";
import { ApiResponse } from "../types";

export const initial: ISupplierState = {
  supplierList: new ApiResponse({
    status: "IDLE",
    data: [],
  }),
};
