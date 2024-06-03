import { IAdmissionTypeState } from "./types";
import { ApiResponse } from "../types";

export const initial: IAdmissionTypeState = {
  allAdmissionTypes: new ApiResponse({ status: "IDLE", data: [] }),
};
