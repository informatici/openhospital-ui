import { IApiResponse } from "../types";

export type IAdmissionBookingsState = {
  createAdmissionBooking: IApiResponse<any>;
  updateAdmissionBooking: IApiResponse<any>;
  admissionBookingsByPatientId: IApiResponse<Array<any>>;
  currentAdmissionBookingByPatientId: IApiResponse<any>;
};
