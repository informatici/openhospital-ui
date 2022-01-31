import React, { FC } from "react";
import { useSelector } from "react-redux";
import { IState } from "../../../types";

const PatientAdmissionBooking: FC = () => {
  const status = useSelector<IState, any>((state: IState) => state.admissionBookings.admissionBookingsByPatientId.status);
  console.log("STATUS", status);
  return (
    <div className="patientBooking">
      Booking
    </div>
  );
};

export default PatientAdmissionBooking;
