import React, { Fragment, FunctionComponent } from "react";
import "./styles.scss";
import { IPatientEncounterContentProps } from "./types";

export const PatientEncounterActivityContent: FunctionComponent<
  IPatientEncounterContentProps
> = ({ title, content }) => {
  const Content = content;
  return (
    <Fragment>
      <div className="patientEncounter__content_header">
        <h3>{title}</h3>
      </div>
      <div className="patientEncounter__content_body">
        <Content />
      </div>
    </Fragment>
  );
};
