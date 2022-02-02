import React, { Fragment, FunctionComponent } from "react";
import { IProps } from "./types";
import "./styles.scss";

const PatientDetailsActivityContent: FunctionComponent<IProps> = ({
  title,
  content,
}) => {
  const Content = content;
  return (
    <Fragment>
      <div className="patientDetils__content_header">
        <h3>{title}</h3>
      </div>
      <div className="patientDetils__content_body">
        <Content />
      </div>
    </Fragment>
  );
};

export default PatientDetailsActivityContent;
