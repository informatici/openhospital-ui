import { IApiResponse } from "../types";

export type ISurgicalRecordsState = {
  createSurgicalRecord: IApiResponse<any>;
  updateSurgicalRecord: IApiResponse<any>;
  surgicalRecordsByPatientId: IApiResponse<Array<any>>;
  currentSurgicalRecordByPatientId: IApiResponse<any>;
};
