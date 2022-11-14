import React, { Fragment, FunctionComponent } from "react";
import "./styles.scss";
import PatientOPD from "../../accessories/patientOPD/patientOPD";
import PatientDetailsContent from "../../../components/activities/patientDetailsActivityContent/PatientDetailsActivityContent";
import PatientVisit from "../../accessories/patientVisit/patientVisit";
import { PatientDTOStatusEnum } from "../../../generated/models/PatientDTO";
import { usePatient } from "../../activities/patientDetailsActivity/PatientDetailsActivity";


const VisitDetailsActivityContent: FunctionComponent = () => {
  const status = usePatient();
  return (
    <Fragment>
      <div className="patientDetails__content_header">
      </div>
      <div className="patientDetails__content_body">
        {
          (status.toString()) === PatientDTOStatusEnum.O
            ? <PatientDetailsContent
                title="Visits"
                content={PatientOPD}
              />
            : <PatientDetailsContent
                title="Visits"
                content={PatientVisit}
              />
        }
      </div>
    </Fragment>
  );
};

export default VisitDetailsActivityContent;
