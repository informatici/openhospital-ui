import React, { FC } from "react";
import { useSelector } from "react-redux";
import { IState } from "../../../types";
import InfoBox from "../infoBox/InfoBox";

const PatientAdmissionBooking: FC = () => {
  const status = useSelector<IState, any>((state: IState) => state.admissionBookings.admissionBookingsByPatientId.status);

  return (
    <div className="patientBooking">
      {status === "FAIL" && <InfoBox type="error" message={"Something went wrong"} />}
    </div>
  );
};

export default PatientAdmissionBooking;
