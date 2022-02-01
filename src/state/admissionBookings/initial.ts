import { IAdmissionBookingsState } from "./types";

export const initial: IAdmissionBookingsState = {
  createAdmissionBooking: { status: "IDLE" },
  updateAdmissionBooking: { status: "IDLE" },
  admissionBookingsByPatientId: { status: "IDLE", data: [] },
  currentAdmissionBookingByPatientId: { status: "IDLE", data: undefined },
};