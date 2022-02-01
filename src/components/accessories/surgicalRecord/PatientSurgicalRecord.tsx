import React, { FC, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { IState } from "../../../types";
import InfoBox from "../infoBox/InfoBox";
import { getSurgicalRecords } from "../../../state/surgicalRecords/actions";

const PatientSurgicalRecord: FC = () => {
  const status = useSelector<IState, any>((state: IState) => state.surgicalRecords.surgicalRecordsByPatientId.status);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSurgicalRecords());
  }, [dispatch]);

  return (
    <div className="patientSurgicalRecord">
      {status === "FAIL" && <InfoBox type="error" message={"Something went wrong"} />}
    </div>
  );
};

export default PatientSurgicalRecord;
