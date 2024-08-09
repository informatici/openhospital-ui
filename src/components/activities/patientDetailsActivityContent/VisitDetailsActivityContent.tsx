import React, { Fragment, FunctionComponent } from "react";
import { useTranslation } from "react-i18next";
import PatientDetailsContent from "../../../components/activities/patientDetailsActivityContent/PatientDetailsActivityContent";
import PatientOPD from "../../accessories/patientOPD/patientOPD";
import "./styles.scss";

const VisitDetailsActivityContent: FunctionComponent = () => {
  const { t } = useTranslation();
  return (
    <Fragment>
      <div className="patientDetails__content_header"></div>
      <div className="patientDetails__content_body">
        <PatientDetailsContent
          title={t("patient.visits")}
          content={PatientOPD}
        />
      </div>
    </Fragment>
  );
};

export default VisitDetailsActivityContent;
