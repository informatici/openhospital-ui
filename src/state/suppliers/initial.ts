import { SupplierDTO } from "../../generated";
import { ISupplierState } from "./types";

export const initial: ISupplierState = {
  supplierList: { status: "IDLE", data: new Array<SupplierDTO>() },
  create: { status: "IDLE" },
  update: { status: "IDLE" },
  delete: { status: "IDLE" },
};
