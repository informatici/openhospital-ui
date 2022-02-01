import React, { FC, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { IState } from "../../../types";
import InfoBox from "../infoBox/InfoBox";
import { getAdmissionBookings } from "../../../state/admissionBookings/actions";

const PatientAdmissionBooking: FC = () => {
  const status = useSelector<IState, any>((state: IState) => state.admissionBookings.admissionBookingsByPatientId.status);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAdmissionBookings());
  }, [dispatch]);

  return (
    <div className="patientBooking">
      {status === "FAIL" && <InfoBox type="error" message={"Something went wrong"} />}
    </div>
  );
};

export default PatientAdmissionBooking;
