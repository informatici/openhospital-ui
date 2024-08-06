import React, { Fragment, FunctionComponent } from "react";
import "./styles.scss";
import { IProps } from "./types";

const PatientDetailsActivityContent: FunctionComponent<IProps> = ({
  title,
  content,
}) => {
  const Content = content;
  return (
    <Fragment>
      <div className="patientDetails__content_header">
        <h3>{title}</h3>
      </div>
      <div className="patientDetails__content_body">
        <Content />
      </div>
    </Fragment>
  );
};

export default PatientDetailsActivityContent;
