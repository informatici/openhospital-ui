import React, { Fragment, FunctionComponent } from "react";
import "./styles.scss";
import PatientDetailsContent from "../../../components/activities/patientDetailsActivityContent/PatientDetailsActivityContent";
import { PatientDTOStatusEnum } from "../../../generated/models/PatientDTO";
import { usePatient } from "../../activities/patientDetailsActivity/PatientDetailsActivity";
import PatientDischarge from "../../accessories/discharge/PatientDischarge";
import PatientSummary from "../../accessories/patientSummary/PatientSummary";

const DischargeDetailsActivityContent: FunctionComponent = () => {
  const status = usePatient();
  return (
    <Fragment>
      <div className="patientDetails__content_header">
      </div>
      <div className="patientDetails__content_body">
        {
          (status.toString()) === PatientDTOStatusEnum.O
            ? <PatientDetailsContent
                title="Summary"
                content={PatientSummary}
              />
            : <PatientDetailsContent
                title="Discharge"
                content={PatientDischarge}
              />
        }
      </div>
    </Fragment>
  );
};

export default DischargeDetailsActivityContent;
