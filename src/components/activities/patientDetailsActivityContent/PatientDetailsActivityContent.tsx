import React, { Fragment, FunctionComponent } from "react";
import { IProps } from "./types";
import "./styles.scss";
import { PermissionWrapper } from "../../accessories/permissionWrapper/PermissionWrapper";

const PatientDetailsActivityContent: FunctionComponent<IProps> = ({
  title,
  content,
  permission,
}) => {
  const Content = content;
  return (
    <Fragment>
      <div className="patientDetails__content_header">
        <h3>{title}</h3>
      </div>
      <div className="patientDetils__content_body">
        {permission ? (
          <PermissionWrapper permission={permission}>
            <Content />
          </PermissionWrapper>
        ) : (
          <Content />
        )}
      </div>
    </Fragment>
  );
};

export default PatientDetailsActivityContent;
